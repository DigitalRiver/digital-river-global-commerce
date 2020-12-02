import FloatLabel from './float-label'; // 3rd-party plugin
import DRCommerceApi from './commerce-api';
import CheckoutUtils from './checkout-utils';

const CheckoutModule = (($) => {
    const localizedText = drgc_params.translations;

    const moveToNextSection = (prevIndex, $section, dropInParams, addressObj) => {
        let $nextSection = $section.next();

        if (!$nextSection.find('div.dr-panel-result > p.dr-panel-result__text').is(':empty') && 
            !$section.hasClass('dr-checkout__tax-exempt') && !$section.hasClass('dr-checkout__shipping')) {
            $nextSection = $('.dr-checkout__el').eq(prevIndex - 1);
        }

        $('.dr-accordion__edit').removeClass('d-none');

        if ($nextSection.hasClass('dr-checkout__payment')) {
            $('span.dr-accordion__edit:not(.tax-id):not(.delivery)').addClass('d-none');
            $('#edit-info-link').removeClass('d-none');

            if ($('#dr-payment-info').is(':empty')) createDropin(dropInParams, addressObj);
        } else if ($nextSection.hasClass('dr-checkout__confirmation')) {
            $('span.dr-accordion__edit:not(.tax-id):not(.delivery):not(.payment)').addClass('d-none');
        }

        $section.removeClass('active').addClass('closed');

        if ($section.find('.dr-address-book').length) {
            $section.find('.dr-address-book-btn').removeClass('active');
            $section.find('.dr-address-book-btn, .dr-address-book').hide();
        }

        $nextSection.addClass('active').removeClass('closed');

        if ($nextSection.hasClass('small-closed-left')) {
            $nextSection.removeClass('small-closed-left');
            $nextSection.next().removeClass('small-closed-right');
        }

        if ($nextSection.find('.dr-address-book').length) {
          if ($nextSection.hasClass('dr-checkout__billing') && $('#checkbox-billing').prop('checked')) {
            $nextSection.find('.dr-address-book-btn').hide();
          } else {
            $nextSection.find('.dr-address-book-btn').show();
          }
        }

        if (sessionStorage.getItem('drgcTaxExempt') === 'true' && sessionStorage.getItem('drgcTaxRegs')) {
            if ($nextSection.hasClass('dr-checkout__tax-id')) {
                $nextSection.find('span.dr-accordion__edit').addClass('d-none');
                $('#checkout-tax-id-form').trigger('submit');
            } else if ($section.hasClass('dr-checkout__tax-id')) {
                $section.find('span.dr-accordion__edit').addClass('d-none');
            }
        }

        adjustColumns($nextSection);
        CheckoutUtils.updateSummaryLabels();

        $('html, body').animate({
            scrollTop: ($nextSection.first().offset().top - 80)
        }, 500);
    };

    const adjustColumns = ($nextSection, editClicked = false) => {
        const $shippingSection = $('.dr-checkout__shipping');
        const $billingSection = $('.dr-checkout__billing');
        const $paymentSection = $('.dr-checkout__payment');
        const $confirmSection = $('.dr-checkout__confirmation');

        if ($shippingSection.is(':visible') && $shippingSection.hasClass('closed') && $billingSection.hasClass('closed')) {
            $shippingSection.addClass('small-closed-left');
            $billingSection.addClass('small-closed-right');
        } else {
            $shippingSection.removeClass('small-closed-left');
            $billingSection.removeClass('small-closed-right');
        }

        if ($nextSection && $nextSection.hasClass('dr-checkout__confirmation') && !editClicked) {
            $paymentSection.addClass('small-closed-left');
            $confirmSection.addClass('small-closed-right').removeClass('d-none');
        } else {
            $paymentSection.removeClass('small-closed-left');
            $confirmSection.removeClass('small-closed-right').addClass('d-none');
        }
    };

    const validateAddress = ($form) => {
        const addressType = ($form.attr('id') === 'checkout-shipping-form') ? 'shipping' : 'billing';
        const validateItems = document.querySelectorAll(`[name^=${addressType}-]`);

        // Validate form
        $form.addClass('was-validated');
        $form.find('.dr-err-field').hide();

        for (let i = 0, len = validateItems.length; i < len; i++) {
            if ($(validateItems[i]).is(':visible') && validateItems[i].checkValidity() === false) {
                return false;
            }
        }

        return true;
    };

    const buildAddressPayload = ($form) => {
        const addressType = ($form.attr('id') === 'checkout-shipping-form') ? 'shipping' : 'billing';
        const email = $('#customer-email').val().trim();
        const payload = {shipping: {}, billing: {}};

        $.each($form.serializeArray(), (index, obj) => {
            const key = obj.name.split('-')[1];
            payload[addressType][key] = obj.value;
        });

        payload[addressType].emailAddress = email;

        if (payload[addressType].country && payload[addressType].country !== 'US') {
          payload[addressType].countrySubdivision = '';
        }

        if (addressType === 'billing') {
            delete payload[addressType].business;
            delete payload[addressType].companyEIN;
            delete payload[addressType].no;
        }

        return payload[addressType];
    };

    const displayAddressErrMsg = (jqXHR = {}, $target) => {
        if (Object.keys(jqXHR).length) {
            $target.text(CheckoutUtils.getAjaxErrorMessage(jqXHR)).show();
        } else {
            $target.text(localizedText.shipping_options_error_msg).show();
        }
    };

    const preselectShippingOption = async (data) => {
        const $errorMsgElem = $('#checkout-delivery-form > div.dr-err-field');
        let defaultShippingOption = data.cart.shippingMethod.code;
        let shippingOptions = data.cart.shippingOptions.shippingOption || [];
        let defaultExists = false;

        $('#checkout-delivery-form > button[type="submit"]').prop('disabled', (shippingOptions.length === 0));

        if (shippingOptions.length) {
            $errorMsgElem.text('').hide();

            for (let index = 0; index < shippingOptions.length; index++) {
                const option = shippingOptions[index];

                if (option.id === defaultShippingOption) {
                    defaultExists = true;
                }

                if ($('#shipping-option-' + option.id).length) continue;

                CheckoutUtils.setShippingOption(option);
            }

            // If default shipping option is not in the list, then pre-select the 1st one
            if (!defaultExists) {
                defaultShippingOption = shippingOptions[0].id;
            }

            $('#checkout-delivery-form').children().find('input:radio[data-id="' + defaultShippingOption + '"]').prop("checked", true);

            return DRCommerceApi.applyShippingOption(defaultShippingOption);
        } else {
            $('#checkout-delivery-form .dr-panel-edit__el').empty();
            displayAddressErrMsg({}, $errorMsgElem);
            return new Promise(resolve => resolve(data));
        }
    };

    const applyPaymentAndSubmitCart = (sourceId, isPaymentButton = false) => {
        const $form = $('#checkout-confirmation-form');

        $('body').addClass('dr-loading');
        DRCommerceApi.applyPaymentMethod(sourceId)
        .then(() => DRCommerceApi.submitCart({ ipAddress: drgc_params.client_ip }))
        .then((data) => {
            $('#checkout-confirmation-form > input[name="order_id"]').val(data.submitCart.order.id);
            $form.submit();
        }).catch((jqXHR) => {
            const $errorMsgElem = isPaymentButton ? $('#dr-payment-failed-msg') : $('#dr-checkout-err-field');

            CheckoutUtils.resetFormSubmitButton($form);
            $errorMsgElem.text(CheckoutUtils.getAjaxErrorMessage(jqXHR)).show();
            $('body').removeClass('dr-loading');
        });
    };

    const initTaxIdentifier = async (cart, address, selectedCountry) => {
        const lineItems = cart.lineItems.lineItem;
        const tax = cart.pricing.tax.value;
        const isTaxExempt = CheckoutModule.isTaxExempt(lineItems) && (tax === 0);

        sessionStorage.setItem('drgcTaxExempt', isTaxExempt);

        if (!isTaxExempt || (address.country !== selectedCountry) || ($.trim($('#tax-id-error-msg').html()) !== '') || !$('.tax-id-field').length) {
            try {
                await CheckoutUtils.getTaxSchema(address);
                FloatLabel.init();
            } catch (error) {
                throw new Error(error);
            }
        }

        try {
            const taxRegs = await CheckoutUtils.getTaxRegistration();

            if (taxRegs.customerType) {
                const shopperType = taxRegs.customerType;
                const taxIds = taxRegs.taxRegistrations;

                $('input[name="shopper-type"][value="' + shopperType + '"]').prop('checked', true);

                for (const element of taxIds) {
                    const $field = $('#tax-id-field-' + element.key);

                    if (!$field.length) {
                        taxRegs['country'] = 'NOT_SUPPORTED';
                        break;
                    } else {
                        $field.val(element.value).parent().addClass('active').parent().removeClass('d-none');
                    }
                }

                sessionStorage.setItem('drgcTaxRegs', JSON.stringify(taxRegs));
            } else {
                if (sessionStorage.getItem('drgcTaxRegs')) sessionStorage.removeItem('drgcTaxRegs');
            }

            return taxRegs;
        } catch (error) {
            throw new Error(error);
        }
    };

    const initShopperTypeRadio = () => {
        $('.shopper-type-radio').appendTo('.tax-id-shopper-type');

        if (sessionStorage.getItem('drgcTaxRegs')) {
            const taxRegs = JSON.parse(sessionStorage.getItem('drgcTaxRegs'));
            const shopperType = taxRegs.customerType;
            const $checkedRadio = $('input[name="shopper-type"][value="' + shopperType + '"]');

            if ($checkedRadio.length) {
                $checkedRadio.prop('checked', true).trigger('click');
            } else {
                $('input[name="shopper-type"]:first').prop('checked', true).trigger('click');
            }
        } else {
            $('input[name="shopper-type"]:first').prop('checked', true).trigger('click');
        }
    };

    const isTaxExempt = (lineItems) => {
        const lineItemCustomAttrs = lineItems[0].customAttributes.attribute;
        const attr = lineItemCustomAttrs.find(item => item.name === 'isTaxExempt');

        if (attr !== undefined) {
            return (attr.value === 'true');
        } else {
            return false;
        }
    }

    const displayTemsUsResult = (tax, status) => {
        switch (status) {
            case 'ELIGIBLE_EXEMPTED':
                $('.dr-checkout__tax-exempt > .dr-panel-result > p.uploaded').addClass('d-none');

                if (tax === 0) {
                    $('#tems-us-result > p.taxable').hide();
                    $('#tems-us-result > p.tax-exempt').fadeIn();
                } else {
                    $('#tems-us-result > p.tax-exempt').hide();
                    $('#tems-us-result > p.taxable').fadeIn();
                }

                break;
            case 'ELIGIBLE_NOT_EXEMPTED':
            case 'NOT_ELIGIBLE':
                $('#tems-us-result > p.alert').hide();
                break;
        }
    }

    const createDropin = (dropInParams, addressObj) => {
        const {digitalriverJs = {}, sessionId = '', currency = '', dropInConfig = {}} = dropInParams || {};
        const billingAddress = CheckoutUtils.getDropinBillingAddress(addressObj);
        const lang = drgc_params.drLocale.split('_')[0];

        if ('onlineBanking' in dropInConfig) {
            dropInConfig.onlineBanking.onlineBanking = {
                currency: currency,
                country: billingAddress.address.country
            }
        }

        if ('googlePay' in dropInConfig) {
            dropInConfig.googlePay.style.buttonLanguage = lang;
        }

        if ('applePay' in dropInConfig) {
            dropInConfig.applePay.style.buttonLanguage = lang;
        }

        const config = {
            sessionId: sessionId,
            billingAddress: billingAddress,
            paymentMethodConfiguration: dropInConfig,
            onSuccess: (res) => {
                sessionStorage.setItem('drgcPaymentSource', JSON.stringify(res.source));
                $('#dr-payment-failed-msg, #dr-checkout-err-field').text('').hide();
                $('#checkout-payment-form').trigger('submit');
            },
            onError: (res) => {
                console.error(res.errors);
                $('#dr-payment-failed-msg').text(res.errors[0].message).show();
                $('#checkout-payment-form').removeClass('dr-loading');
            },
            onReady: (res) => {
                $('#checkout-payment-form').removeClass('dr-loading');

                if (!res.paymentMethodTypes.length) {
                    $('#dr-payment-failed-msg').text(localizedText.payment_methods_error_msg);
                }
            },
            onCancel: (res) => {
            }
        };

        $('#checkout-payment-form').addClass('dr-loading');

        try {
            digitalriverJs.createDropin(config).mount('dr-payment-info');
        } catch (error) {
            console.error(error.message);
        }
    };

    return {
        moveToNextSection,
        adjustColumns,
        validateAddress,
        buildAddressPayload,
        displayAddressErrMsg,
        preselectShippingOption,
        applyPaymentAndSubmitCart,
        initShopperTypeRadio,
        isTaxExempt,
        initTaxIdentifier,
        displayTemsUsResult,
        createDropin
    };
})(jQuery);

jQuery(document).ready(async ($) => {
    if ($('#checkout-payment-form').length) {
        // Globals
        const localizedText = drgc_params.translations;
        const isLoggedIn = drgc_params.isLogin === 'true';
        const drLocale = drgc_params.drLocale || 'en_US';
        const selectedCountry = drLocale.split('_')[1];
        const cartData = drgc_params.cart.cart;
        const requestShipping = (cartData.shippingOptions.shippingOption) ? true : false;
        const digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey, {
            'locale': drLocale.split('_').join('-')
        });
        const addressPayload = {shipping: {}, billing: {}};
        let paymentSourceId = null;
        const currency = cartData.pricing.orderTotal.currency;
        const dropInConfig = JSON.parse(drgc_params.dropInConfig);
        const sessionId = cartData.paymentSession ? cartData.paymentSession.id : '';
        const dropInParams = {
            digitalriverJs: digitalriverjs,
            sessionId: sessionId,
            currency: currency,
            dropInConfig: dropInConfig
        }
        // Section progress
        let finishedSectionIdx = -1;
        let activeSectionIdx = -1;

        // Break down tax and update summary on page load
        CheckoutUtils.updateSummaryPricing(cartData, drgc_params.isTaxInclusive === 'true');

        $('#checkout-email-form').on('submit', function(e) {
            e.preventDefault();

            // If no items are in cart, do not even continue, maybe give feedback
            if (! drgc_params.cart.cart.lineItems.hasOwnProperty('lineItem')) return;

            const $form = $('#checkout-email-form');
            const email = $form.find('input[name=email]').val().trim();

            $form.addClass('was-validated');

            if ($form[0].checkValidity() === false) {
                return false;
            }

            const $section = $('.dr-checkout__email');
            $('#dr-panel-email-result').text(email);

            if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                finishedSectionIdx = $('.dr-checkout__el').index($section);
            }

            CheckoutModule.moveToNextSection(activeSectionIdx, $section);
        });

        // Submit shipping info form
        $('#checkout-shipping-form').on('submit', function(e) {
            e.preventDefault();

            const $form = $(e.target);
            const $button = $form.find('button[type="submit"]');
            const isFormValid = CheckoutModule.validateAddress($form);

            if (!isFormValid) return;

            addressPayload.shipping = CheckoutModule.buildAddressPayload($form);
            const cartRequest = {
                address: addressPayload.shipping
            };

            $button.addClass('sending').blur();

            if (isLoggedIn && $('#checkbox-save-shipping').prop('checked')) {
                const setAsDefault = $('input:hidden[name="addresses-no-default"]').val() === 'true';
                const address = CheckoutUtils.getAddress('shipping', setAsDefault);

                DRCommerceApi.saveShopperAddress(address).catch((jqXHR) => {
                    CheckoutUtils.apiErrorHandler(jqXHR);
                });
            }

            $('.dr-summary__pricing').addClass('dr-loading');
            DRCommerceApi.updateCartShippingAddress({expand: 'all'}, cartRequest)
                .then(() => DRCommerceApi.getCart({expand: 'all'}))
                .then(data => CheckoutModule.preselectShippingOption(data))
                .then((data) => {
                    const $section = $('.dr-checkout__shipping');
                    CheckoutUtils.updateAddressSection(data.cart.shippingAddress, $section.find('.dr-panel-result__text'));

                    if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                        finishedSectionIdx = $('.dr-checkout__el').index($section);
                    }

                    CheckoutModule.moveToNextSection(activeSectionIdx, $section);
                    CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');

                    if ($('#tems-us-result').length) CheckoutModule.displayTemsUsResult(data.cart.pricing.tax.value, $('#tems-us-status').val());
                })
                .catch((jqXHR) => {
                    CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
                })
                .finally(() => {
                    $button.removeClass('sending').blur();
                    $('.dr-summary__pricing').removeClass('dr-loading');
                });
        });

        $('#checkbox-billing').on('change', (e) => {
            if ($(e.target).prop('checked')) {
                $('.billing-section').slideUp();
                $('.dr-address-book-btn.billing').removeClass('active').hide();
                $('.dr-address-book.billing').hide();
            } else {
                $('.dr-address-book-btn.billing').show();
                $('.billing-section').slideDown();
            }
        });

        $('#checkout-billing-form').on('submit', (e) => {
            e.preventDefault();

            const $section = $('.dr-checkout__billing');
            const $form = $(e.target);
            const $button = $form.find('button[type="submit"]');
            const billingSameAsShipping = $('[name="checkbox-billing"]').is(':visible:checked');
            const isFormValid = CheckoutModule.validateAddress($form);

            if (!isFormValid) return;

            addressPayload.billing = (billingSameAsShipping) ? Object.assign({}, addressPayload.shipping) : CheckoutModule.buildAddressPayload($form);

            if ($('#billing-field-company-name').length) addressPayload.billing.companyName = $('#billing-field-company-name').val();

            const cartRequest = {
                address: addressPayload.billing
            };

            $button.addClass('sending').blur();

            if (isLoggedIn && $('#checkbox-save-billing').prop('checked')) {
                if ((requestShipping && !billingSameAsShipping) || !requestShipping) {
                    const setAsDefault = ($('input:hidden[name="addresses-no-default"]').val() === 'true') && !requestShipping;
                    const address = CheckoutUtils.getAddress('billing', setAsDefault);

                    DRCommerceApi.saveShopperAddress(address).catch((jqXHR) => {
                        CheckoutUtils.apiErrorHandler(jqXHR);
                    });
                }
            }

            $('.dr-summary__pricing').addClass('dr-loading');
            DRCommerceApi.updateCartBillingAddress({expand: 'all'}, cartRequest)
                .then(() => {
                    // Digital product still need to update some of shippingAddress attributes for tax calculating
                    if (requestShipping) return new Promise(resolve => resolve());
                    const patchCartRequest = {
                        address: {
                            country: cartRequest.address.country,
                            countrySubdivision: cartRequest.address.countrySubdivision,
                            postalCode: cartRequest.address.postalCode
                        }
                    };
                    return DRCommerceApi.updateCartShippingAddress({expand: 'all'}, patchCartRequest);
                })
                .then(() => {
                    const billingMeta = {
                        cart: {
                            customAttributes: {
                                attribute: [
                                    {
                                        name: 'SHIPPING_ADDRESS_SAME_AS_BILLING',
                                        value: billingSameAsShipping
                                    }
                                ]
                            }
                        }
                    };
        
                    return DRCommerceApi.updateCart({}, billingMeta);
                })
                .then(() => DRCommerceApi.getCart({expand: 'all'}))
                .then(async (data) => {
                    if ($('#checkout-tax-id-form').length) {
                        const address = requestShipping ? addressPayload.shipping : addressPayload.billing;
                        const taxRegs = await CheckoutModule.initTaxIdentifier(data.cart, address, selectedCountry);

                        if (taxRegs.country && taxRegs.country === 'NOT_SUPPORTED') {
                            CheckoutUtils.updateAddressSection(data.cart.billingAddress, $section.find('.dr-panel-result__text'));
                            throw new Error(localizedText.unsupport_country_error_msg);
                        }
                    } else {
                        if (sessionStorage.getItem('drgcTaxRegs')) sessionStorage.removeItem('drgcTaxRegs');
                    }

                    return new Promise(resolve => resolve(data));
                })
                .then((data) => {
                    if ($('#tems-us-result').length && !requestShipping) CheckoutModule.displayTemsUsResult(data.cart.pricing.tax.value, $('#tems-us-status').val());
                    CheckoutUtils.updateAddressSection(data.cart.billingAddress, $section.find('.dr-panel-result__text'));
                    CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
                    $('#tax-id-error-msg').text('').hide();

                    if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                        finishedSectionIdx = $('.dr-checkout__el').index($section);
                    }

                    CheckoutModule.moveToNextSection(activeSectionIdx, $section, dropInParams, addressPayload.billing);
                })
                .catch((error) => {
                    console.error(error);

                    if (error.message === localizedText.unsupport_country_error_msg) {
                        $('#tax-id-error-msg').text(error.message).show();
        
                        if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                            finishedSectionIdx = $('.dr-checkout__el').index($section);
                        }
    
                        CheckoutModule.moveToNextSection(activeSectionIdx, $section);
                    } else {
                        CheckoutModule.displayAddressErrMsg(error, $form.find('.dr-err-field'));
                    }
                })
                .finally(() => {
                    $button.removeClass('sending').blur();
                    $('.dr-summary__pricing').removeClass('dr-loading');
                });       
        });

        $(document).on('click', 'input[name="shopper-type"]', () => {
            const $taxIdFields = $('#checkout-tax-id-form .tax-id-field');

            $taxIdFields.each((index, element) => {
                const $element = $(element);

                if ($('input[name="shopper-type"]:checked').val() === 'B') {
                    if ($element.hasClass('Individual')) $element.addClass('d-none');
                    if ($element.hasClass('Business')) $element.removeClass('d-none');
                } else {
                    if ($element.hasClass('Individual')) $element.removeClass('d-none');
                    if ($element.hasClass('Business')) $element.addClass('d-none');
                }
            });
        });

        $(document).on('input', '#checkout-tax-id-form > .tax-id-field input[type="text"]', (e) => {
            CheckoutUtils.validateVatNumber(e);
        });

        $('#checkout-tax-id-form').on('submit', async (e) => {
            e.preventDefault();

            const $button = $(e.target).find('button[type="submit"]');
            const $section = $('.dr-checkout__tax-id');
            const $error = $section.find('.dr-err-field');
            const isTaxExempt = sessionStorage.getItem('drgcTaxExempt') === 'true';
            const taxRegs = (sessionStorage.getItem('drgcTaxRegs')) ? JSON.parse(sessionStorage.getItem('drgcTaxRegs')) : {};
            let typeText = '';
            let taxIds = '';

            if (taxRegs.country && taxRegs.country === 'NOT_SUPPORTED') {
                $('#checkout-tax-id-form').hide();
                return;
            }

            if (isTaxExempt && Object.keys(taxRegs).length && taxRegs.customerType) {
                const regs = taxRegs.taxRegistrations;

                regs.forEach((element) => {
                    taxIds = `${taxIds}<br>${element.value}`;;
                });

                typeText = (taxRegs.customerType === 'I') ? localizedText.personal_shopper_type : localizedText.business_shopper_type;
                $error.text('').hide();
            } else {
                $button.addClass('sending').blur();

                const shopperType = $('input[name="shopper-type"]:checked').val();
                const $taxFields = (shopperType === 'I') ? $('.tax-id-field.Individual input[type="text"]') : $('.tax-id-field.Business input[type="text"]');
                const regs = [];

                if ($taxFields.length) {
                    $taxFields.each((index, element) => {
                        const $element = $(element);

                        if (!$element.hasClass('d-none')) {
                            const key = $element.data('key');
                            const value = $element.val();
                            const taxRegObj = {};

                            if (value) {
                                taxRegObj['key'] = key;
                                taxRegObj['value'] = value;
                                regs.push(taxRegObj);
                            }

                            taxIds = `${taxIds}<br>${value}`;
                        }
                    });
                }

                typeText = ($('input[name="shopper-type"]:checked').val() === 'I') ? localizedText.personal_shopper_type : localizedText.business_shopper_type;

                if (regs.length) {
                    $('.dr-summary__pricing').addClass('dr-loading');
                    await CheckoutUtils.applyTaxRegistration(shopperType, regs)
                        .then((data) => {
                            sessionStorage.setItem('drgcTaxRegs', JSON.stringify(data));
                            return DRCommerceApi.getCart({expand: 'all'});
                        })
                        .then((data) => {
                            const lineItems = data.cart.lineItems.lineItem;
                            const tax = data.cart.pricing.tax.value;
                            const isTaxExempt = CheckoutModule.isTaxExempt(lineItems) && (tax === 0);

                            sessionStorage.setItem('drgcTaxExempt', isTaxExempt);
                            CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');

                            if (tax > 0) {
                                $error.text(localizedText.invalid_tax_id_error_msg).show();
                            } else {
                                $error.text('').hide();
                            }
                        })
                        .catch((error) => {
                            $error.text(localizedText.invalid_tax_id_error_msg).show();
                            console.error(error);

                            if (sessionStorage.getItem('drgcTaxRegs')) sessionStorage.removeItem('drgcTaxRegs');
                        })
                        .finally(() => {
                            $button.removeClass('sending').blur();
                            $('.dr-summary__pricing').removeClass('dr-loading');
                        });
                } else {
                    $button.removeClass('sending').blur();
                    $error.text('').hide();
                }
            }

            $section.find('.dr-panel-result__text').html(`${typeText}${taxIds}`);

            if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                finishedSectionIdx = $('.dr-checkout__el').index($section);
            }

            CheckoutModule.moveToNextSection(activeSectionIdx, $section, dropInParams, addressPayload.billing);
        });

        // Submit delivery form
        $('#checkout-delivery-form').on('submit', function(e) {
            e.preventDefault();

            const $form = $(e.target);
            const $input = $(this).children().find('input:radio:checked').first();
            const $button = $(this).find('button[type="submit"]').toggleClass('sending').blur();
            const shippingOptionId = $input.data('id');

            $form.find('.dr-err-field').hide();

            $('.dr-summary__pricing').addClass('dr-loading');
            DRCommerceApi.applyShippingOption(shippingOptionId)
                .then((data) => {
                    const $section = $('.dr-checkout__delivery');
                    const resultText = `${$input.data('desc')}`;

                    $section.find('.dr-panel-result__text').text(resultText);

                    if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                        finishedSectionIdx = $('.dr-checkout__el').index($section);
                    }

                    CheckoutModule.moveToNextSection(activeSectionIdx, $section, dropInParams, addressPayload.billing);
                    CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
                })
                .catch((jqXHR) => {
                    CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
                })
                .finally(() => {
                    $button.removeClass('sending').blur();
                    $('.dr-summary__pricing').removeClass('dr-loading');
                });
        });

        $('#checkout-delivery-form').on('change', 'input[type="radio"]', function() {
            const $form = $('form#checkout-delivery-form');
            const shippingOptionId = $form.children().find('input:radio:checked').first().data('id');

            $('.dr-summary__pricing').addClass('dr-loading');
            DRCommerceApi.applyShippingOption(shippingOptionId)
                .then((data) => {
                    CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
                })
                .catch((jqXHR) => {
                    CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
                })
                .finally(() => $('.dr-summary__pricing').removeClass('dr-loading'));
        });

        $('#checkout-payment-form').on('submit', (e) => {
            e.preventDefault();
            const paymentSource = JSON.parse(sessionStorage.getItem('drgcPaymentSource'));

            if (paymentSource.state === 'chargeable' || paymentSource.state === 'pending_funds') {
                const $section = $('.dr-checkout__payment');
                const label = (paymentSource.type === 'creditCard') ? `${drgc_params.translations.credit_card_ending_label} ${paymentSource.creditCard.lastFourDigits}` : paymentSource.type;
                paymentSourceId = paymentSource.id;

                $section.find('.dr-panel-result__text').text(label);

                if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                    finishedSectionIdx = $('.dr-checkout__el').index($section);
                }

                CheckoutModule.moveToNextSection(activeSectionIdx, $section);
            }
        });

        $('#checkout-confirmation-form button[type="submit"]').on('click', (e) => {
            e.preventDefault();
            if (!$('#dr-tAndC').prop('checked')) {
                $('#dr-checkout-err-field').text(localizedText.required_tandc_msg).show();
            } else {
                $('#dr-checkout-err-field').text('').hide();
                $('#dr-payment-failed-msg').hide();
                CheckoutModule.applyPaymentAndSubmitCart(paymentSourceId);
            }
        });

        // show and hide sections
        $('.dr-accordion__edit').on('click', function(e) {
            e.preventDefault();

            const $section = $(e.target).parent().parent();
            const $allSections = $section.siblings().andSelf();
            const $finishedSections = $allSections.eq(finishedSectionIdx).prevAll().andSelf();
            const $activeSection = $allSections.filter($('.active'));
            activeSectionIdx = $allSections.index($activeSection);
            const $nextSection = $('.dr-checkout__el').eq(activeSectionIdx - 1);

            $allSections.find('.dr-accordion__edit').addClass('d-none');

            if ($allSections.index($section) > $allSections.index($activeSection)) {
                return;
            }

            $finishedSections.addClass('closed');
            $activeSection.removeClass('active');
            $section.removeClass('closed').addClass('active');

            if ($section.find('.dr-address-book').length) {
                if ($section.hasClass('dr-checkout__billing') && $('#checkbox-billing').prop('checked')) {
                    $section.find('.dr-address-book-btn').hide();
                } else {
                    $section.find('.dr-address-book-btn').show();
                }
            }

            if ($('.dr-address-book').length) {
                $('.dr-address-book-btn').removeClass('active');
                $('.dr-address-book').hide();
            }
  
            CheckoutModule.adjustColumns($nextSection, true);
            CheckoutUtils.updateSummaryLabels();
        });

        $('#shipping-field-country').on('change', function() {
            if ( this.value === 'US' ) {
                $('#shipping-field-state').parent('.form-group').removeClass('d-none');
            } else {
                $('#shipping-field-state').parent('.form-group').addClass('d-none');
            }
        });

        $('#billing-field-country').on('change', function() {
            if ( this.value === 'US' ) {
                $('#billing-field-state').parent('.form-group').removeClass('d-none');
            } else {
                $('#billing-field-state').parent('.form-group').addClass('d-none');
            }
        });

        $('.dr-address-book-btn').on('click', (e) => {
            const addressType = $(e.target).hasClass('shipping') ? 'shipping' : 'billing';
            const $addressBook = $('.dr-address-book.' + addressType);

            if ($addressBook.is(':hidden')) {
                $(e.target).addClass('active');
                $addressBook.slideDown();
            } else {
                $(e.target).removeClass('active');
                $addressBook.slideUp();
            }
        });

        $(document).on('click', '.address', (e) => {
            const addressType = $('.dr-address-book-btn.shipping').hasClass('active') ? 'shipping' : 'billing';
            const $address = $(e.target).closest('.address');
            const countryOptions = CheckoutUtils.getFetchedCountryOptions(addressType);
            const savedCountryCode = $address.data('country');

            $('#' + addressType + '-field-first-name').val($address.data('firstName')).focus();
            $('#' + addressType + '-field-last-name').val($address.data('lastName')).focus();
            $('#' + addressType + '-field-address1').val($address.data('lineOne')).focus();
            $('#' + addressType + '-field-address2').val($address.data('lineTwo')).focus();
            $('#' + addressType + '-field-city').val($address.data('city')).focus();
            $('#' + addressType + '-field-state').val($address.data('state')).change();
            $('#' + addressType + '-field-zip').val($address.data('postalCode')).focus();
            $('#' + addressType + '-field-country').val(countryOptions.indexOf(savedCountryCode) > -1 ? savedCountryCode : '').change();
            $('#' + addressType + '-field-phone').val($address.data('phoneNumber')).focus().blur();

            $('.dr-address-book-btn.' + addressType).removeClass('active');
            $('.dr-address-book.' + addressType).slideUp();
            $('#checkbox-save-' + addressType).prop('checked', false);
        });

        $('.back-link a').click(() => {
            const loginUrl = new URL(drgc_params.loginUrl);
            const checkoutUrl = new URL(drgc_params.checkoutUrl);

            if (document.referrer && (document.referrer.indexOf(loginUrl.pathname) === -1) && (document.referrer.indexOf(checkoutUrl.pathname) === -1)) {
                window.location.href = document.referrer;
            } else {
                window.location.href = drgc_params.cartUrl;
            }
        });

        $('#tems-us-start-date, #tems-us-end-date').on('blur', (e) => {
            const date = $(e.target).val();

            if (date) {
                const dateArr = date.split('-').reverse();
                [dateArr[0], dateArr[1]] = [dateArr[1], dateArr[0]];
                $(e.target).val(dateArr.join('/'));
            }
        });

        $('#checkout-tax-exempt-form').on('submit', async (e) => {
            e.preventDefault();

            const $form = $(e.target);
            const $button = $form.find('button[type="submit"]');
            const $section = $('.dr-checkout__tax-exempt');
            const companyName = $('#business-company-name').val();
            const companyEin = $('#business-ein').val();
            const isGood = $('#tax-certificate-status > p').hasClass('cert-good') || ($('#tems-us-status').val() === 'ELIGIBLE_EXEMPTED');
            let status = 'NOT_ELIGIBLE';
            let adminSabrixCall = false;

            $button.addClass('sending').blur();
            $('#tems-us-result > p.alert').hide();
            $('#billing-field-company-name').val(companyName);

            if ($('#tax-exempt-checkbox').prop('checked')) {
                const customerId = drgc_params.customerId;

                $form.addClass('was-validated');

                if ($form[0].checkValidity() === false) {
                    $button.removeClass('sending').blur();
                    return false;
                }

                if ($('#checkout-tax-exempt-app').length) {
                    try {
                        const res = JSON.parse(await CheckoutUtils.createTaxProfile(customerId));
    
                        if (res.companyName) {
                            status = 'ELIGIBLE_EXEMPTED';
                            adminSabrixCall = true;
                            $('#billing-field-company-name').val(res.companyName);
                            $('#tax-certificate-status > p.alert-danger, #tax-certificate-status > p.alert-info').remove();
                            $('#tems-us-error-msg').text('').hide(); 
                            $('.dr-checkout__tax-exempt > .dr-accordion > .dr-accordion__edit').addClass('d-none');
                            $('.dr-checkout__tax-exempt > .dr-panel-result > p.uploaded').removeClass('d-none');
                        } else {
                            $('#tems-us-error-msg').text(CheckoutUtils.getAjaxErrorMessage()).show();
                        }
                    } catch (error) {
                        console.error(error);
                        $('#tems-us-error-msg').text(CheckoutUtils.getAjaxErrorMessage(JSON.parse(error.responseText))).show();
                    }
                } else {
                    if (isGood) status = 'ELIGIBLE_EXEMPTED';
                }

                $('.dr-checkout__tax-exempt > .dr-panel-result > p.taxable').addClass('d-none');
                $('.dr-checkout__tax-exempt > .dr-panel-result > p.tax-exempt').removeClass('d-none');
            } else {
                if (isGood) status = 'ELIGIBLE_NOT_EXEMPTED';
                $('.dr-checkout__tax-exempt > .dr-panel-result > p.tax-exempt').addClass('d-none');
                $('.dr-checkout__tax-exempt > .dr-panel-result > p.taxable').removeClass('d-none');
            }

            const companyMeta = {
                cart: {
                    customAttributes: {
                        attribute:[
                            {
                                name: 'companyEIN',
                                value: companyEin
                            }
                        ]
                    }
                }
            };

            try {
                await DRCommerceApi.updateCart({}, companyMeta);
            } catch (error) {
                console.error(error);
            }

            $('#tems-us-status').val(status);
            await CheckoutUtils.updateTemsUsStatus(status, adminSabrixCall);

            if (!$('#tems-us-error-msg:visible').length) {
                if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                    finishedSectionIdx = $('.dr-checkout__el').index($section);
                }

                CheckoutModule.moveToNextSection(activeSectionIdx, $section);
            }

            $button.removeClass('sending').blur();
        });

        $('#tax-exempt-note > span > a.cert-details').on('click', (e) => {
            e.preventDefault();
            $('#certificate-modal').modal('show');
        });

        $('#tax-exempt-checkbox').on('change', (e) => {
            const isChecked = $(e.target).prop('checked');

            $('#business-company-name').prop('readonly', isChecked);

            if (isChecked) {
                const $certStatus = $('#tax-certificate-status > p');
                const temsUsStauts = $('#tems-us-status').val();
                const companyName = $('#billing-field-company-name').val();

                if (companyName) $('#business-company-name').val(companyName).trigger('focus').trigger('blur');

                if ($certStatus.hasClass('cert-good')) {
                    $('#tax-exempt-note').removeClass('d-none');
                } else {
                    $('#tax-exempt-note').addClass('d-none');
                    $('#tax-certificate-status').slideDown();
                }

                if (temsUsStauts === 'NOT_ELIGIBLE') {
                    $('#checkout-tax-exempt-form > .form-group-business.company-name').addClass('d-none');
                    $('#checkout-tax-exempt-app').slideDown();
                }
            } else {
                $('#checkout-tax-exempt-form > .form-group-business.company-name').removeClass('d-none');
                $('#tax-certificate-status, #checkout-tax-exempt-app').slideUp();
                $('#checkout-tax-exempt-form').removeClass('was-validated');
                $('#tems-us-error-msg').text('').hide();
                $('#tax-exempt-note').addClass('d-none');
            }
        });

        $('#edit-info-link > span').on('click', (e) => {
            e.preventDefault();
            $('body').addClass('dr-loading');
            location.reload();
        });

        if (!$('#checkout-email-form').length) {
            const $section = $('.dr-checkout__email');

            if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                finishedSectionIdx = $('.dr-checkout__el').index($section);
            }

            CheckoutModule.moveToNextSection(activeSectionIdx, $section);
        } else {
            $('#checkout-email-form button[type=submit]').prop('disabled', false);
        }

        if (isLoggedIn && requestShipping) {
            $('.dr-address-book.billing > .overflowContainer').clone().appendTo('.dr-address-book.shipping');
        }

        if (cartData.totalItemsInCart) {
            CheckoutUtils.getCountryOptionsFromGC(requestShipping).then(() => {
                $('#shipping-field-country, #billing-field-country').trigger('change');
            });
        }

        //floating labels
        FloatLabel.init();
        CheckoutUtils.applyLegalLinks(digitalriverjs);

        if ($('#checkout-tax-id-form').length) CheckoutModule.initShopperTypeRadio();
        if ($('#certificate-modal').length) $('body').append($('#certificate-modal'));
        if (!$('#checkbox-billing').prop('checked')) $('#checkbox-billing').prop('checked', false).change();
        if ($('#tems-us-status').length && $('#tems-us-status').val() === 'ELIGIBLE_EXEMPTED') $('#tax-exempt-checkbox').prop('checked', true).trigger('change');
    }
});

export default CheckoutModule;
