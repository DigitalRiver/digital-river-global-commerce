import FloatLabel from './float-label'; // 3rd-party plugin
import DRCommerceApi from './commerce-api';
import CheckoutUtils from './checkout-utils';
import DRGooglePay from './payment-googlepay';
import DRApplePay from './payment-applepay';

const CheckoutModule = (($) => {
    const localizedText = drgc_params.translations;
    const requestShipping = (drgc_params.cart.cart.shippingOptions.shippingOption) ? true : false;
    const initPreTAndC = () => {
        $('#dr-preTAndC').change((e) => {
            if ($(e.target).is(':checked')) {
                $('#dr-preTAndC-err-msg').text('').hide();
                $('.dr-cloudpay-btn').css({ 'pointer-events': 'auto' });
            } else {
                $('.dr-cloudpay-btn').css({ 'pointer-events': 'none' });
            }
        });

        $('.dr-cloudpay-btn-wrapper').click(() => {
            if (!$('#dr-preTAndC').is(':checked')) {
                $('#dr-preTAndC-err-msg').text(localizedText.required_tandc_msg).show();
            }
        });

        $('#dr-preTAndC').trigger('change');
    };

    const updateSummaryLabels = () => {
        const isTaxInclusive = drgc_params.isTaxInclusive === 'true';
        const forceExclTax = drgc_params.forceExclTax === 'true';
        const shouldDisplayVat = drgc_params.shouldDisplayVat === 'true';

        const taxSuffixLabel = isTaxInclusive ?
            forceExclTax ? ' ' + localizedText.excl_vat_label : ' ' + localizedText.incl_vat_label :
            '';
        if ($('.dr-checkout__payment').hasClass('active') || $('.dr-checkout__confirmation').hasClass('active')) {
            $('.dr-summary__tax .item-label').text(shouldDisplayVat ?
                localizedText.vat_label :
                localizedText.tax_label
            );
            $('.dr-summary__shipping .item-label').text(localizedText.shipping_label + taxSuffixLabel);
            $('.dr-summary__shipping-tax .item-label').text(shouldDisplayVat ?
                localizedText.shipping_vat_label :
                localizedText.shipping_tax_label
            );
        } else {
            $('.dr-summary__tax .item-label').text(shouldDisplayVat ?
                localizedText.estimated_vat_label :
                localizedText.estimated_tax_label
            );
            $('.dr-summary__shipping .item-label').text(localizedText.estimated_shipping_label + taxSuffixLabel);
            $('.dr-summary__shipping-tax .item-label').text(shouldDisplayVat ?
                localizedText.estimated_shipping_vat_label :
                localizedText.estimated_shipping_tax_label
            );
        }
    };

    const getCountryOptionsFromGC = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: `https://drh-fonts.img.digitalrivercontent.net/store/${drgc_params.siteID}/${drgc_params.drLocale}/DisplayPage/id.SimpleRegistrationPage`,
                cache: false,
                success: (response) => {
                    const addressTypes = requestShipping ? ['shipping', 'billing'] : ['billing'];
                    addressTypes.forEach((type) => {
                        const savedCountryCode = $(`#${type}-field-country`).val();
                        const $options = $(response).find(`select[name=${type.toUpperCase()}country] option`).not(':first');
                        const optionArr = $.map($options, (option) => { return option.value; });
                        $(`#${type}-field-country option`).not(':first').remove();
                        $(`#${type}-field-country`)
                            .append($options)
                            .val(optionArr.indexOf(savedCountryCode) > -1 ? savedCountryCode : '');
                    });
                    resolve();
                },
                error: (jqXHR) => {
                    reject(jqXHR);
                }
            });
        });
    };

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

        adjustColumns($section);
        updateSummaryLabels();

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

    const getAddress = (addressType, isDefault) => {
        return {
            address: {
                nickName: $('#'+ addressType +'-field-address1').val(),
                isDefault: isDefault,
                firstName: $('#'+ addressType +'-field-first-name').val(),
                lastName: $('#'+ addressType +'-field-last-name').val(),
                line1: $('#'+ addressType +'-field-address1').val(),
                line2: $('#'+ addressType +'-field-address2').val(),
                city: $('#'+ addressType +'-field-city').val(),
                countrySubdivision: $('#'+ addressType +'-field-state').val(),
                postalCode: $('#'+ addressType +'-field-zip').val(),
                countryName: $('#'+ addressType +'-field-country :selected').text(),
                country: $('#'+ addressType +'-field-country :selected').val(),
                phoneNumber: $('#'+ addressType +'-field-phone').val()
            }
        };
    };

    const displayAddressErrMsg = (jqXHR = {}, $target) => {
        if (Object.keys(jqXHR).length) {
            $target.text(CheckoutUtils.getAjaxErrorMessage(jqXHR)).show();
        } else {
            $target.text(localizedText.shipping_options_error_msg).show();
        }
    };

    const displayCartAddress = (addressObj, $target) => {
        const addressArr = [
            `${addressObj.firstName} ${addressObj.lastName}`,
            addressObj.line1,
            addressObj.city,
            addressObj.country
        ];

        $target.text(addressArr.join(', '));
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

    return {
        initPreTAndC,
        updateSummaryLabels,
        getCountryOptionsFromGC,
        moveToNextSection,
        adjustColumns,
        validateAddress,
        buildAddressPayload,
        getAddress,
        displayAddressErrMsg,
        displayCartAddress,
        preselectShippingOption,
        applyPaymentAndSubmitCart
    };
})(jQuery);

jQuery(document).ready(($) => {
    if ($('#checkout-payment-form').length) {
        // Globals
        const localizedText = drgc_params.translations;
        const domain = drgc_params.domain;
        const isLoggedIn = drgc_params.isLogin === 'true';
        const drLocale = drgc_params.drLocale || 'en_US';
        const cartData = drgc_params.cart.cart;
        const requestShipping = (cartData.shippingOptions.shippingOption) ? true : false;
        const isGooglePayEnabled = drgc_params.isGooglePayEnabled === 'true';
        const isApplePayEnabled = drgc_params.isApplePayEnabled === 'true';
        const digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey, {
            'locale': drLocale.split('_').join('-')
        });
        const addressPayload = {shipping: {}, billing: {}};
        let paymentSourceId = null;
        // Section progress
        let finishedSectionIdx = -1;

        // Break down tax and update summary on page load
        CheckoutUtils.updateSummaryPricing(cartData, drgc_params.isTaxInclusive === 'true');

        // Create elements through DR.js
        if ($('.credit-card-section').length) {
            const options = {
                classes: {
                    base: 'DRElement',
                    complete: 'DRElement--complete',
                    empty: 'DRElement--empty',
                    invalid: 'DRElement--invalid'
                },
                style: {
                    base: getStyleOptionsFromClass('DRElement'),
                    complete: getStyleOptionsFromClass('DRElement--complete'),
                    empty: getStyleOptionsFromClass('DRElement--empty'),
                    invalid: getStyleOptionsFromClass('DRElement--invalid')
                }
            };

            var cardNumber = digitalriverjs.createElement('cardnumber', options);
            var cardExpiration = digitalriverjs.createElement('cardexpiration', Object.assign({}, options, { placeholderText: localizedText.card_expiration_placeholder }));
            var cardCVV = digitalriverjs.createElement('cardcvv', Object.assign({}, options, { placeholderText: localizedText.card_cvv_placeholder }));

            cardNumber.mount('card-number');
            cardExpiration.mount('card-expiration');
            cardCVV.mount('card-cvv');

            cardNumber.on('change', function(evt) {
                activeCardLogo(evt);
                displayDRElementError(evt, $('#card-number-error'));
            });
            cardExpiration.on('change', function(evt) {
                displayDRElementError(evt, $('#card-expiration-error'));
            });
            cardCVV.on('change', function(evt) {
                displayDRElementError(evt, $('#card-cvv-error'));
            });

            function getStyleOptionsFromClass(className) {
                const tempDiv = document.createElement('div');
                tempDiv.setAttribute('id', 'tempDiv' + className);
                tempDiv.className = className;
                document.body.appendChild(tempDiv);
                const tempDivEl = document.getElementById('tempDiv' + className);
                const tempStyle = window.getComputedStyle(tempDivEl);

                const styles = {
                    color: tempStyle.color,
                    fontFamily: tempStyle.fontFamily.replace(new RegExp('"', 'g'), ''),
                    fontSize: tempStyle.fontSize,
                    height: tempStyle.height
                };
                document.body.removeChild(tempDivEl);

                return styles;
            }

            function activeCardLogo(evt) {
                $('.cards .active').removeClass('active');
                if (evt.brand && evt.brand !== 'unknown') {
                    $(`.cards .${evt.brand}-icon`).addClass('active');
                }
            }

            function displayDRElementError(evt, $target) {
                if (evt.error) {
                    $target.text(evt.error.message).show();
                } else {
                    $target.text('').hide();
                }
            }
        }

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
                const address = CheckoutModule.getAddress('shipping', setAsDefault);

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
                    CheckoutModule.displayCartAddress(data.cart.shippingAddress, $section.find('.dr-panel-result__text'));

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

        $('#checkout-billing-form').on('submit', function(e) {
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
                    const address = CheckoutModule.getAddress('billing', setAsDefault);

                    DRCommerceApi.saveShopperAddress(address).catch((jqXHR) => {
                        CheckoutUtils.apiErrorHandler(jqXHR);
                    });
                }
            }

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
                // Still needs to apply shipping option once again or the value will be rolled back after updateCart (API's bug)
                .then((data) => {
                    return requestShipping ?
                        CheckoutModule.preselectShippingOption(data) :
                        new Promise(resolve => resolve(data));
                })
                .then((data) => {
                    $button.removeClass('sending').blur();

                    const $section = $('.dr-checkout__billing');

                    CheckoutModule.displayCartAddress(data.cart.billingAddress, $section.find('.dr-panel-result__text'));

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
                    const freeShipping = data.cart.pricing.shippingAndHandling.value === 0;
                    const resultText = `${$input.data('desc')} ${freeShipping ? localizedText.free_label : $input.data('cost')}`;

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
            const $button = $form.find('button[type="submit"]');

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

            const $section = $('.dr-checkout__payment');

            if (paymentPayload.selector === 'credit-card') {
                const cart = drgc_params.cart.cart;
                const creditCardPayload = {
                    type: 'creditCard',
                    owner: {
                        firstName: addressPayload.billing.firstName,
                        lastName: addressPayload.billing.lastName,
                        email: addressPayload.billing.emailAddress,
                        address: {
                            line1: addressPayload.billing.line1,
                            line2: addressPayload.billing.line2,
                            city: addressPayload.billing.city,
                            state: addressPayload.billing.countrySubdivision,
                            country: addressPayload.billing.country,
                            postalCode: addressPayload.billing.postalCode
                        }
                    },
                    amount: cart.pricing.orderTotal.value,
                    currency: cart.pricing.orderTotal.currency
                };

                $button.addClass('sending').blur();
                digitalriverjs.createSource(cardNumber, creditCardPayload).then(function(result) {
                    $button.removeClass('sending').blur();
                    if (result.error) {
                        if (result.error.state === 'failed') {
                            $('#dr-payment-failed-msg').text(localizedText.credit_card_error_msg).show();
                        }
                        if (result.error.errors) {
                            $('#dr-payment-failed-msg').text(result.error.errors[0].message).show();
                        }
                    } else {
                        if (result.source.state === 'chargeable') {
                            paymentSourceId = result.source.id;
                            $section.find('.dr-panel-result__text').text(
                                `${localizedText.credit_card_ending_label} ${result.source.creditCard.lastFourDigits}`
                            );

                            if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                                finishedSectionIdx = $('.dr-checkout__el').index($section);
                            }

                            CheckoutModule.moveToNextSection($section);
                        }
                    }
                });
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
            CheckoutModule.updateSummaryLabels();
        });

        $('input:radio[name="selector"]').on('change', function() {
            switch ($(this).val()) {
                case 'credit-card':
                    $('#dr-paypal-button').hide();
                    $('.credit-card-info').show();
                    $('#dr-submit-payment').text(localizedText.pay_with_card_label.toUpperCase()).show();

                    break;
                case 'paypal':
                    $('#dr-submit-payment').hide();
                    $('.credit-card-info').hide();
                    $('#dr-paypal-button').show();
                    $('#dr-submit-payment').text(localizedText.pay_with_paypal_label.toUpperCase());

                    break;
            }
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

        //floating labels
        FloatLabel.init();

        if (isLoggedIn && requestShipping) {
            $('.dr-address-book.billing > .overflowContainer').clone().appendTo('.dr-address-book.shipping');
        }

        if (!$('#checkbox-billing').prop('checked')) $('#checkbox-billing').prop('checked', false).change();

        $('#checkout-email-form button[type=submit]').prop('disabled', false);

        if ($('input[name=email]').val() && $('#checkout-email-form').length && $('#dr-panel-email-result').is(':empty')) {
            $('#checkout-email-form').submit();
        }

        if (cartData.totalItemsInCart) {
            CheckoutModule.getCountryOptionsFromGC().then(() => {
                $('#shipping-field-country, #billing-field-country').trigger('change');
            });
        }
        CheckoutUtils.applyLegalLinks(digitalriverjs);
        CheckoutModule.initPreTAndC();

        if ($('#radio-credit-card').is(':checked')) {
            $('.credit-card-info').show();
        }

        // Initial state for payPal
        if (drgc_params.payPal.sourceId) {
            $('.dr-checkout').children().addClass('closed');
            $('.dr-checkout').children().removeClass('active');
            $('.dr-checkout__payment').removeClass('closed').addClass('active');

            if (drgc_params.payPal.failure == 'true') {
                // TODO: Display Error on paypal form maybe
            }

            if (drgc_params.payPal.success == 'true') {
                CheckoutModule.applyPaymentAndSubmitCart(drgc_params.payPal.sourceId);
            }
        }

        if ($('#dr-paypal-button').length) {
            // need to get the actual height of the wrapper for rendering the PayPal button
            $('#checkout-payment-form').removeClass('dr-panel-edit').css('visibility', 'hidden');

            paypal.Button.render({
                env: (domain.indexOf('test') === -1) ? 'production' : 'sandbox',
                locale: drLocale,
                style: {
                    label: 'checkout',
                    size: 'responsive',
                    height: 40,
                    color: 'gold',
                    shape: 'rect',
                    layout: 'horizontal',
                    fundingicons: 'false',
                    tagline: 'false'
                },
                onEnter: function() {
                    $('#checkout-payment-form').addClass('dr-panel-edit').css('visibility', 'visible');
                    $('#dr-paypal-button').hide();
                },
                payment: function() {
                    const cart = drgc_params.cart.cart;
                    const url = window.location.href;
                    let payPalItems = [];

                    $.each(cart.lineItems.lineItem, function( index, item ) {
                        payPalItems.push({
                            'name': item.product.name,
                            'quantity': item.quantity,
                            'unitAmount': item.pricing.listPrice.value
                        })
                    });

                    let payPalPayload = {
                        'type': 'payPal',
                        'amount': cart.pricing.orderTotal.value,
                        'currency': cart.pricing.orderTotal.currency,
                        'payPal': {
                            'returnUrl': url + (url.indexOf('?') >= 0 ? '&' : '?') + 'ppsuccess=true',
                            'cancelUrl': url + (url.indexOf('?') >= 0 ? '&' : '?') + 'ppcancel=true',
                            'items': payPalItems,
                            'taxAmount': cart.pricing.tax.value,
                            'shippingAmount': cart.pricing.shippingAndHandling.value,
                            'amountsEstimated': true,
                            'requestShipping': requestShipping
                        }
                    };

                    if (requestShipping) {
                        payPalPayload['shipping'] = {
                            'recipient':  `${addressPayload.shipping.firstName} ${addressPayload.shipping.lastName}`,
                            'phoneNumber':  addressPayload.shipping.phoneNumber,
                            'address': {
                                'line1': addressPayload.shipping.line1,
                                'line2': addressPayload.shipping.line2,
                                'city': addressPayload.shipping.city,
                                'state': addressPayload.shipping.countrySubdivision,
                                'country':  addressPayload.shipping.country,
                                'postalCode': addressPayload.shipping.postalCode
                            }
                        }
                    }

                    return digitalriverjs.createSource(payPalPayload).then(function(result) {
                        if (result.error) {
                            $('#dr-payment-failed-msg').text(result.error.errors[0].message).show();
                        } else {
                            sessionStorage.setItem('paymentSourceId', result.source.id);

                            return result.source.payPal.token;
                        }
                    });
                },
                onShippingChange: function(data, actions) {
                    const supportedCountries = CheckoutUtils.getSupportedCountries('shipping');

                    if (supportedCountries.indexOf(data.shipping_address.country_code) === -1) {
                        return actions.reject();
                    }
            
                    return actions.resolve();
                },
                onAuthorize: function() {
                    const sourceId = sessionStorage.getItem('paymentSourceId');
                    CheckoutModule.applyPaymentAndSubmitCart(sourceId, true);
                }
            }, '#dr-paypal-button');
        }

        if ($('#dr-googlepay-button').length && isGooglePayEnabled) {
            const googlePaybuttonStyle = {
                buttonType: drgc_params.googlePayButtonType,
                buttonColor: drgc_params.googlePayButtonColor,
                buttonLanguage: drLocale.split('_')[0]
            };
            const googlePayBaseRequest = CheckoutUtils.getBaseRequestData(cartData, requestShipping, googlePaybuttonStyle);
            const googlePayPaymentDataRequest = digitalriverjs.paymentRequest(googlePayBaseRequest);

            DRGooglePay.init({
                digitalriverJs: digitalriverjs,
                paymentDataRequest: googlePayPaymentDataRequest,
                requestShipping: requestShipping
            });
        }

        if ($('#dr-applepay-button').length && isApplePayEnabled) {
            const applePaybuttonStyle = {
                buttonType: drgc_params.applePayButtonType,
                buttonColor: drgc_params.applePayButtonColor,
                buttonLanguage: drLocale.split('_')[0]
            };
            const applePayBaseRequest = CheckoutUtils.getBaseRequestData(cartData, requestShipping, applePaybuttonStyle);
            const applePayPaymentDataRequest = digitalriverjs.paymentRequest(applePayBaseRequest);

            DRApplePay.init({
                digitalriverJs: digitalriverjs,
                paymentDataRequest: applePayPaymentDataRequest,
                requestShipping: requestShipping
            });
        }

        $('.back-link a').click(() => {
            if (document.referrer && document.referrer !== drgc_params.loginUrl) {
                window.location.href = document.referrer;
            } else {
                window.location.href = drgc_params.cartUrl;
            }
        });
    }
});

export default CheckoutModule;
