import FloatLabel from './float-label'; // 3rd-party plugin
import DRCommerceApi from './commerce-api';
import CheckoutUtils from './checkout-utils';

const CheckoutModule = (($) => {
    const localizedText = drgc_params.translations;

    const moveToNextSection = ($section) => {
        const $nextSection = $section.next();

        $section.removeClass('active').addClass('closed');
        $nextSection.addClass('active').removeClass('closed');

        if ($nextSection.hasClass('small-closed-left')) {
            $nextSection.removeClass('small-closed-left');
            $nextSection.next().removeClass('small-closed-right');
        }

        if ($section.find('.dr-address-book').length) {
          $section.find('.dr-address-book-btn').removeClass('active');
          $section.find('.dr-address-book-btn, .dr-address-book').hide();
        }

        if ($nextSection.find('.dr-address-book').length) {
          if ($nextSection.hasClass('dr-checkout__billing') && $('#checkbox-billing').prop('checked')) {
            $nextSection.find('.dr-address-book-btn').hide();
          } else {
            $nextSection.find('.dr-address-book-btn').show();
          }
        }

        if ($section.hasClass('dr-checkout__billing') || $section.hasClass('dr-checkout__tax-id')) {
            $('.dr-accordion__edit').hide();
            $('.edit-link').show();
        }

        if ($nextSection.hasClass('dr-checkout__confirmation') || $section.hasClass('dr-checkout__delivery')) {
            $section.find('span.dr-accordion__edit').show();
        }

        if ($nextSection.hasClass('dr-checkout__tax-id') && sessionStorage.getItem('drgcTaxExempt') === 'true') {
            $('#checkout-tax-id-form').trigger('submit');
        }

        if ($section.hasClass('dr-checkout__tax-id') && sessionStorage.getItem('drgcTaxExempt') !== 'true') {
            $section.find('span.dr-accordion__edit').show();
        }

        adjustColumns($section);
        CheckoutUtils.updateSummaryLabels();

        $('html, body').animate({
            scrollTop: ($nextSection.first().offset().top - 80)
        }, 500);
    };

    const adjustColumns = ($section) => {
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

        if ($section && $section.hasClass('dr-checkout__payment')) {
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
        const email = $('#checkout-email-form > div.form-group > input[name=email]').val().trim();
        const payload = {shipping: {}, billing: {}};

        $.each($form.serializeArray(), (index, obj) => {
            const key = obj.name.split('-')[1];
            payload[addressType][key] = obj.value;
        });

        payload[addressType].emailAddress = email;

        if (payload[addressType].country !== 'US') {
            payload[addressType].countrySubdivision = 'NA';
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

                const res = await DRCommerceApi.applyShippingOption(option.id);
                const freeShipping = res.cart.pricing.shippingAndHandling.value === 0;

                CheckoutUtils.setShippingOption(option, freeShipping);
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

    return {
        moveToNextSection,
        adjustColumns,
        validateAddress,
        buildAddressPayload,
        displayAddressErrMsg,
        preselectShippingOption,
        applyPaymentAndSubmitCart,
        initShopperTypeRadio,
        isTaxExempt
    };
})(jQuery);

jQuery(document).ready(($) => {
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
        const currency = drgc_params.cart.cart.pricing.orderTotal.currency;
        const dropInConfig = JSON.parse(drgc_params.dropInConfig);
        let paymentResponse = null;
        // Section progress
        let finishedSectionIdx = -1;

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
            $section.find('.dr-panel-result__text').text(email);

            if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                finishedSectionIdx = $('.dr-checkout__el').index($section);
            }

            CheckoutModule.moveToNextSection($section);
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

            DRCommerceApi.updateCartShippingAddress({expand: 'all'}, cartRequest)
                .then(() => DRCommerceApi.getCart({expand: 'all'}))
                .then(data => CheckoutModule.preselectShippingOption(data))
                .then((data) => {
                    $button.removeClass('sending').blur();

                    const $section = $('.dr-checkout__shipping');
                    CheckoutUtils.updateAddressSection(data.cart.shippingAddress, $section.find('.dr-panel-result__text'));

                    if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                        finishedSectionIdx = $('.dr-checkout__el').index($section);
                    }

                    CheckoutModule.moveToNextSection($section);
                    CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
                })
                .catch((jqXHR) => {
                    $button.removeClass('sending').blur();
                    CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
                });
        });

        $('#checkbox-billing, #checkbox-business').on('change', (e) => {
            const id = $(e.target).attr('id');

            switch (id) {
                case 'checkbox-billing':
                    if (!$(e.target).is(':checked')) {
                        const billingMeta = {
                            cart: {
                                customAttributes: {
                                    attribute: [
                                        {
                                            name: 'SHIPPING_ADDRESS_SAME_AS_BILLING',
                                            value: false
                                        }
                                    ]
                                }
                            }
                        };

                        DRCommerceApi.updateCart({}, billingMeta);
                        $('.dr-address-book-btn.billing').show();
                        $('.billing-section').slideDown();
                    } else {
                        $('.billing-section').slideUp();
                        $('#checkbox-business').prop('checked', false).change();
                        $('.dr-address-book-btn.billing').hide();
                    }

                    break;
                case 'checkbox-business':
                    if (!$(e.target).is(':checked')) {
                        $('#billing-field-company-name, #billing-field-company-ein').val('');
                        $('.form-group-business').slideUp();
                    } else {
                        $('#checkbox-billing').prop('checked', false).change();
                        $('.form-group-business').slideDown();
                    }

                    break;
            }
        });

        $('#checkout-billing-form').on('submit', async (e) => {
            e.preventDefault();

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

            const updatedCart = await DRCommerceApi.updateCartBillingAddress({expand: 'all'}, cartRequest)
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
                    const $companyEin = $('#billing-field-company-ein');

                    if (!$companyEin.length) return new Promise(resolve => resolve());

                    const companyMeta = {
                        cart: {
                            customAttributes: {
                                attribute:[{
                                    name: 'companyEIN',
                                    value: $companyEin.val()
                                }]
                            }
                        }
                    };

                    return DRCommerceApi.updateCart({}, companyMeta);
                })
                .then(() => DRCommerceApi.getCart({expand: 'all'}))
                .then((data) => {
                    return requestShipping ?
                        CheckoutModule.preselectShippingOption(data) :
                        new Promise(resolve => resolve(data));
                })
                .catch((jqXHR) => {
                    $button.removeClass('sending').blur();
                    CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
                    console.error(jqXHR);
                });
            
            if ($('#checkout-tax-id-form').length) {
                const lineItems = updatedCart.cart.lineItems.lineItem;
                const isTaxExempt = CheckoutModule.isTaxExempt(lineItems);

                sessionStorage.setItem('drgcTaxExempt', isTaxExempt);

                if (!isTaxExempt) {
                    const address = requestShipping ? addressPayload.shipping : addressPayload.billing;
                    
                    try {
                        await CheckoutUtils.getTaxSchema(address);
                        FloatLabel.init();
                    } catch (error) {
                        console.error(error);
                    }

                    if (sessionStorage.getItem('drgcTaxRegs')) sessionStorage.removeItem('drgcTaxRegs');
                } else {
                    try {
                        const taxRegs = await CheckoutUtils.getTaxRegistration();

                        if (Object.keys(taxRegs).length) {
                            const taxIds = taxRegs.taxRegistrations;
                            const shopperType = taxRegs.customerType;

                            $('input[name="shopper-type"][value="' + shopperType + '"]').prop('checked', true);

                            for (const element of taxIds) {
                                const $field = $('#tax-id-field-' + element.key);

                                if (!$field.length) {
                                    break;
                                } else {
                                    $field.val(element.value).parent().addClass('active');
                                }
                            }

                            sessionStorage.setItem('drgcTaxRegs', JSON.stringify(taxRegs));
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            } else {
                if (sessionStorage.getItem('drgcTaxRegs')) sessionStorage.removeItem('drgcTaxRegs');
            }

            const billingAddress = CheckoutUtils.getDropinBillingAddress(addressPayload);
            const lang = drLocale.split('_')[0];

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
                sessionId: updatedCart.cart.paymentSession ? updatedCart.cart.paymentSession.id : '',
                billingAddress: billingAddress,
                paymentMethodConfiguration: dropInConfig,
                onSuccess: (res) => {
                    sessionStorage.setItem('drgcPaymentSource', JSON.stringify(res.source));
                    paymentResponse = res;
                    $('#checkout-payment-form').submit();
                },
                onError: (res) => {
                    console.error(res.errors);
                    paymentResponse = res;
                },
                onReady: (res) => {
                    $button.removeClass('sending').blur();

                    const $section = $('.dr-checkout__billing');

                    CheckoutUtils.updateAddressSection(updatedCart.cart.billingAddress, $section.find('.dr-panel-result__text'));

                    if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                        finishedSectionIdx = $('.dr-checkout__el').index($section);
                    }

                    CheckoutModule.moveToNextSection($section);
                    CheckoutUtils.updateSummaryPricing(updatedCart.cart, drgc_params.isTaxInclusive === 'true');
                    paymentResponse = res;

                    if (!res.paymentMethodTypes.length) {
                        $('#dr-payment-failed-msg').text(localizedText.payment_methods_error_msg).show();
                    }
                },
                onCancel: (res) => {
                    paymentResponse = res;
                }
            };

            try {
                digitalriverjs.createDropin(config).mount('dr-payment-info');
            } catch (error) {
                $button.removeClass('sending').blur();
                console.error(error.message);
            }
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

        $('#checkout-tax-id-form > .tax-id-field input[type="text"]').on('input', (e) => {
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

            if (isTaxExempt && Object.keys(taxRegs).length) {
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
                    await CheckoutUtils.applyTaxRegistration(shopperType, regs)
                        .then((data) => {
                            sessionStorage.setItem('drgcTaxRegs', JSON.stringify(data));
                            return DRCommerceApi.getCart({expand: 'all'});
                        })
                        .then((data) => {
                            const lineItems = data.cart.lineItems.lineItem;
                            const isTaxExempt = CheckoutModule.isTaxExempt(lineItems);

                            sessionStorage.setItem('drgcTaxExempt', isTaxExempt);
                            CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
                            $button.removeClass('sending').blur();
                            $error.text('').hide();
                        })
                        .catch((error) => {
                            $error.text(localizedText.invalid_tax_id_error_msg).show();
                            $button.removeClass('sending').blur();
                            console.error(error);
                        });
                }
            }

            $section.find('.dr-panel-result__text').html(`${typeText}${taxIds}`);

            if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                finishedSectionIdx = $('.dr-checkout__el').index($section);
            }

            CheckoutModule.moveToNextSection($section);
        });

        // Submit delivery form
        $('form#checkout-delivery-form').on('submit', function(e) {
            e.preventDefault();

            const $form = $(e.target);
            const $input = $(this).children().find('input:radio:checked').first();
            const $button = $(this).find('button[type="submit"]').toggleClass('sending').blur();
            const shippingOptionId = $input.data('id');

            $form.find('.dr-err-field').hide();

            DRCommerceApi.applyShippingOption(shippingOptionId)
                .then((data) => {
                    const $section = $('.dr-checkout__delivery');
                    const resultText = `${$input.data('desc')}`;

                    $button.removeClass('sending').blur();
                    $section.find('.dr-panel-result__text').text(resultText);

                    if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                        finishedSectionIdx = $('.dr-checkout__el').index($section);
                    }

                    CheckoutModule.moveToNextSection($section);
                    CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
                })
                .catch((jqXHR) => {
                    $button.removeClass('sending').blur();
                    CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
                });
        });

        $('form#checkout-delivery-form').on('change', 'input[type="radio"]', function() {
            const $form = $('form#checkout-delivery-form');
            const shippingOptionId = $form.children().find('input:radio:checked').first().data('id');

            $('.dr-summary').addClass('dr-loading');

            DRCommerceApi.applyShippingOption(shippingOptionId)
                .then((data) => {
                    CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
                })
                .catch((jqXHR) => {
                    CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
                    $('.dr-summary').removeClass('dr-loading');
                });
        });

        $('form#checkout-payment-form').on('submit', function(e) {
            e.preventDefault();
            const $form = $('form#checkout-payment-form');

            $form.addClass('was-validated');
            if ($form[0].checkValidity() === false) {
                return false;
            }

            const formdata = $(this).serializeArray();
            const paymentPayload = {};

            $(formdata).each(function(index, obj){
                paymentPayload[obj.name] = obj.value;
            });

            $('#dr-payment-failed-msg, #dr-checkout-err-field').text('').hide();

            if (paymentResponse.errors) {
                $('#dr-payment-failed-msg').text(paymentResponse.errors[0].message).show();
            } else {
                if (paymentResponse.source.state === 'chargeable' || paymentResponse.source.state === 'pending_funds') {
                    const $section = $('.dr-checkout__payment');
                    const label = (paymentResponse.source.type === 'creditCard') ? `${drgc_params.translations.credit_card_ending_label} ${paymentResponse.source.creditCard.lastFourDigits}` : paymentResponse.source.type;
                    paymentSourceId = paymentResponse.source.id;

                    $section.find('.dr-panel-result__text').text(label);

                    if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                        finishedSectionIdx = $('.dr-checkout__el').index($section);
                    }

                    CheckoutModule.moveToNextSection($section);
                }
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
  
            CheckoutModule.adjustColumns($section);
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

            $('#' + addressType + '-field-first-name').val($address.data('firstName')).focus();
            $('#' + addressType + '-field-last-name').val($address.data('lastName')).focus();
            $('#' + addressType + '-field-address1').val($address.data('lineOne')).focus();
            $('#' + addressType + '-field-address2').val($address.data('lineTwo')).focus();
            $('#' + addressType + '-field-city').val($address.data('city')).focus();
            $('#' + addressType + '-field-state').val($address.data('state')).change();
            $('#' + addressType + '-field-zip').val($address.data('postalCode')).focus();
            $('#' + addressType + '-field-country').val($address.data('country')).change();
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

        $('.edit-link > span').on('click', () => {
            location.reload();
        });

        if (isLoggedIn && requestShipping) {
            $('.dr-address-book.billing > .overflowContainer').clone().appendTo('.dr-address-book.shipping');
        }

        if (!$('#checkbox-billing').prop('checked')) $('#checkbox-billing').prop('checked', false).change();

        if ($('input[name=email]').val() && $('#checkout-email-form').length && $('#dr-panel-email-result').is(':empty')) {
            $('#checkout-email-form').submit();
        }

        if (cartData.totalItemsInCart) {
            CheckoutUtils.getCountryOptionsFromGC(requestShipping).then(() => {
                $('#shipping-field-country, #billing-field-country').trigger('change');
            });
        }

        //floating labels
        FloatLabel.init();
        CheckoutUtils.applyLegalLinks(digitalriverjs);
        $('#checkout-email-form button[type=submit]').prop('disabled', false);

        if ($('#checkout-tax-id-form').length) CheckoutModule.initShopperTypeRadio();
    }
});

export default CheckoutModule;
