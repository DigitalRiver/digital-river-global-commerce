import FloatLabel from './float-label'; // 3rd-party plugin
import DRCommerceApi from './commerce-api';
import CheckoutUtils from './checkout-utils';
import DRGooglePay from './payment-googlepay';
import DRApplePay from './payment-applepay';

const CheckoutModule = (($) => {
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
                $('#dr-preTAndC-err-msg').text(drgc_params.translations.required_tandc_msg).show();
            }
        });

        $('#dr-preTAndC').trigger('change');
    };

    const shouldDisplayVat = () => {
        const currency = $('.dr-currency-select').val();
        return (currency === 'GBP' || currency === 'EUR');
    };

    const updateSummaryLabels = () => {
        if ($('.dr-checkout__payment').hasClass('active') || $('.dr-checkout__confirmation').hasClass('active')) {
            $('.dr-summary__tax .item-label').text(shouldDisplayVat() ?
                drgc_params.translations.vat_label :
                drgc_params.translations.tax_label
            );
            $('.dr-summary__shipping .item-label').text(drgc_params.translations.shipping_label);
            $('.dr-summary__total .total-label').text(shouldDisplayVat() ?
                drgc_params.translations.order_total_vat_label :
                drgc_params.translations.order_total_label
            );
        } else {
            $('.dr-summary__tax .item-label').text(shouldDisplayVat() ?
                drgc_params.translations.estimated_vat_label :
                drgc_params.translations.estimated_tax_label
            );
            $('.dr-summary__shipping .item-label').text(drgc_params.translations.estimated_shipping_label);
        }
    };

    const getCountryOptionsFromGC = () => {
        const selectedLocale = $('.dr-currency-select option:selected').data('locale') || drgc_params.drLocale;
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: `https://drh-fonts.img.digitalrivercontent.net/store/${drgc_params.siteID}/${selectedLocale}/DisplayPage/id.SimpleRegistrationPage`,
                success: (response) => {
                    const addressTypes = drgc_params.cart.cart.hasPhysicalProduct ? ['shipping', 'billing'] : ['billing'];
                    addressTypes.forEach((type) => {
                        const savedCountryCode = $(`#${type}-field-country`).val();
                        const $options = $(response).find(`select[name=${type.toUpperCase()}country] option`).not(':first');
                        const optionArr = $.map($options, (option) => { return option.value; });
                        $(`#${type}-field-country option`).not(':first').remove();
                        $(`#${type}-field-country`)
                            .append($options)
                            .val(savedCountryCode.indexOf(optionArr) > -1 ? savedCountryCode : '');
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
            payload[addressType].countrySubdivision = '';
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
            if (jqXHR.status === 409) {
                const errorCode = jqXHR.responseJSON.errors.error[0].code;

                if (errorCode === 'restricted-bill-to-country') {
                    $target.text(drgc_params.translations.address_error_msg).show();
                } else if (errorCode === 'restricted-ship-to-country') {
                    $target.text(drgc_params.translations.address_error_msg).show();
                } else {
                    $target.text(drgc_params.translations.undefined_error_msg).show();
                }
            } else {
                $target.text(jqXHR.responseJSON.errors.error[0].description).show();
            }
        } else {
            $target.text(drgc_params.translations.shipping_options_error_msg).show();
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

    const setShippingOptions = (cart) => {
        const freeShipping = cart.pricing.shippingAndHandling.value === 0;
        const shippingOptionId = cart.shippingMethod.code;
        const shippingOptions = cart.shippingOptions.shippingOption || [];

        if (shippingOptions.length) {
            $.each(shippingOptions, (index, option) => {
                if ($('#shipping-option-' + option.id).length) return;

                const html = `
                    <div class="field-radio">
                        <input type="radio"
                            name="selector"
                            id="shipping-option-${option.id}"
                            data-cost="${option.formattedCost}"
                            data-id="${option.id}"
                            data-desc="${option.description}"
                            >
                        <label for="shipping-option-${option.id}">
                            <span>
                                ${option.description}
                            </span>
                            <span class="black">
                                ${freeShipping ? drgc_params.translations.free_label : option.formattedCost}
                            </span>
                        </label>
                    </div>
                `;

                $('form#checkout-delivery-form .dr-panel-edit__el').append(html);
            });

            $('form#checkout-delivery-form').children().find('input:radio[data-id="' + shippingOptionId + '"]').prop("checked", true);
        } else {
            $('form#checkout-delivery-form .dr-panel-edit__el').empty();
        }
    };

    const preselectShippingOption = async (data) => {
        const $errorMsgElem = $('#checkout-delivery-form > div.dr-err-field');
        const defaultShippingOption = data.cart.shippingMethod.code;
        let shippingOptions = data.cart.shippingOptions.shippingOption || [];

        $('#checkout-delivery-form > button[type="submit"]').prop('disabled', (shippingOptions.length === 0));

        if (shippingOptions.length) {
            $errorMsgElem.text('').hide();

            shippingOptions = shippingOptions.map((option) => {
                return option.id;
            });

            // If default shipping option is not in the list, then pre-select the 1st one
            if (shippingOptions.indexOf(defaultShippingOption) === -1) {
                const res = await DRCommerceApi.applyShippingOption(shippingOptions[0]);
                CheckoutUtils.updateSummaryPricing(res.cart);
                return res;
            } else {
                return new Promise(resolve => resolve(data));
            }
        } else {
            displayAddressErrMsg({}, $errorMsgElem);
            return new Promise(resolve => resolve(data));
        }
    };

    const applyPaymentAndSubmitCart = (sourceId) => {
        const $form = $('#checkout-confirmation-form');
        const $errorMsgElem = $('#dr-checkout-err-field');

        DRCommerceApi.applyPaymentMethod(sourceId)
        .then(() => DRCommerceApi.submitCart({ ipAddress: drgc_params.client_ip }))
        .then((data) => {
            $('#checkout-confirmation-form > input[name="order_id"]').val(data.submitCart.order.id);
            $form.submit();
        }).catch((jqXHR) => {
            CheckoutUtils.resetFormSubmitButton($form);
            CheckoutUtils.resetBodyOpacity();
            $errorMsgElem.text(CheckoutUtils.getAjaxErrorMessage(jqXHR)).show();
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
        setShippingOptions,
        preselectShippingOption,
        applyPaymentAndSubmitCart
    };
})(jQuery);

jQuery(document).ready(($) => {
    if ($('#checkout-payment-form').length) {
        // Globals
        const domain = drgc_params.domain;
        const isLogin = drgc_params.isLogin;
        const drLocale = drgc_params.drLocale || 'en_US';
        let cartData = drgc_params.cart.cart;
        const requestShipping = (cartData.shippingOptions.shippingOption) ? true : false;
        const isGooglePayEnabled = drgc_params.isGooglePayEnabled === 'true';
        const isApplePayEnabled = drgc_params.isApplePayEnabled === 'true';
        const digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey);
        const addressPayload = {shipping: {}, billing: {}};
        let paymentSourceId = null;
        // Section progress
        let finishedSectionIdx = -1;

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
            var cardExpiration = digitalriverjs.createElement('cardexpiration', Object.assign({}, options, { placeholderText: 'MM/YY' }));
            var cardCVV = digitalriverjs.createElement('cardcvv', Object.assign({}, options, { placeholderText: 'CVV' }));

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

            if (isLogin === 'true') {
                const address = CheckoutModule.getAddress('shipping', true);

                DRCommerceApi.updateShopperAddress(address).catch((jqXHR) => {
                    CheckoutUtils.apiErrorHandler(jqXHR);
                });
            }

            DRCommerceApi.updateCartShippingAddress({expand: 'all'}, cartRequest).then(() => DRCommerceApi.getCart({expand: 'all'})).then((data) => {
                return CheckoutModule.preselectShippingOption(data);
            }).then((data) => {
                $button.removeClass('sending').blur();
                CheckoutModule.setShippingOptions(data.cart);

                const $section = $('.dr-checkout__shipping');
                CheckoutModule.displayCartAddress(data.cart.shippingAddress, $section.find('.dr-panel-result__text'));

                if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                    finishedSectionIdx = $('.dr-checkout__el').index($section);
                }

                CheckoutModule.moveToNextSection($section);
                CheckoutUtils.updateSummaryPricing(data.cart);
            }).catch((jqXHR) => {
                $button.removeClass('sending').blur();
                CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
            });
        });

        $('#checkout-billing-form').on('submit', function(e) {
            e.preventDefault();

            const $form = $(e.target);
            const $button = $form.find('button[type="submit"]');
            const billingSameAsShipping = $('[name="checkbox-billing"]').is(':visible:checked');
            const isFormValid = CheckoutModule.validateAddress($form);

            if (!isFormValid) return;

            addressPayload.billing = (billingSameAsShipping) ? Object.assign({}, addressPayload.shipping) : CheckoutModule.buildAddressPayload($form);
            const cartRequest = {
                address: addressPayload.billing
            };

            $button.addClass('sending').blur();

            if (isLogin === 'true') {
                if ((requestShipping && !billingSameAsShipping) || !requestShipping) {
                    const address = CheckoutModule.getAddress('billing', false);

                    DRCommerceApi.updateShopperAddress(address).catch((jqXHR) => {
                        CheckoutUtils.apiErrorHandler(jqXHR);
                    });
                }
            }

            DRCommerceApi.updateCartBillingAddress({expand: 'all'}, cartRequest).then(() => DRCommerceApi.getCart({expand: 'all'})).then((data) => {
                // Still needs to apply shipping option once again or the value will be rolled back after updateCart (API's bug)
                return drgc_params.cart.cart.hasPhysicalProduct ?
                    CheckoutModule.preselectShippingOption(data) :
                    new Promise(resolve => resolve(data));
            }).then((data) => {
                $button.removeClass('sending').blur();
                CheckoutModule.setShippingOptions(data.cart);

                const $section = $('.dr-checkout__billing');

                CheckoutModule.displayCartAddress(data.cart.billingAddress, $section.find('.dr-panel-result__text'));

                if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                    finishedSectionIdx = $('.dr-checkout__el').index($section);
                }

                CheckoutModule.moveToNextSection($section);
                CheckoutUtils.updateSummaryPricing(data.cart);
            }).catch((jqXHR) => {
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

            DRCommerceApi.applyShippingOption(shippingOptionId).then((data) => {
                const $section = $('.dr-checkout__delivery');
                const freeShipping = data.cart.pricing.shippingAndHandling.value === 0;
                const resultText = `${$input.data('desc')} ${freeShipping ? drgc_params.translations.free_label : $input.data('cost')}`;

                $button.removeClass('sending').blur();
                $section.find('.dr-panel-result__text').text(resultText);

                if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                    finishedSectionIdx = $('.dr-checkout__el').index($section);
                }

                CheckoutModule.moveToNextSection($section);
                CheckoutUtils.updateSummaryPricing(data.cart);
            }).catch((jqXHR) => {
                $button.removeClass('sending').blur();
                CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
            });
        });

        $('form#checkout-delivery-form').on('change', 'input[type="radio"]', function() {
            const $form = $('form#checkout-delivery-form');
            const shippingOptionId = $form.children().find('input:radio:checked').first().data('id');

            DRCommerceApi.applyShippingOption(shippingOptionId).then((data) => {
                CheckoutUtils.updateSummaryPricing(data.cart);
            }).catch((jqXHR) => {
                CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
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
                            $('#dr-payment-failed-msg').text(drgc_params.translations.credit_card_error_msg).show();
                        }
                        if (result.error.errors) {
                            $('#dr-payment-failed-msg').text(result.error.errors[0].message).show();
                        }
                    } else {
                        if (result.source.state === 'chargeable') {
                            paymentSourceId = result.source.id;
                            $section.find('.dr-panel-result__text').text(
                                `${drgc_params.translations.credit_card_ending_label} ${result.source.creditCard.lastFourDigits}`
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
                $('#dr-checkout-err-field').text(drgc_params.translations.required_tandc_msg).show();
            } else {
                $('#dr-checkout-err-field').text('').hide();
                $(e.target).toggleClass('sending').blur();
                $('#dr-payment-failed-msg').hide();
                CheckoutModule.applyPaymentAndSubmitCart(paymentSourceId);
            }
        });

        // check billing info
        $('[name="checkbox-billing"]').on('click', function (ev) {
            const $this = $(this);

            if (!$this.is(':checked')) {
                $('.billing-section').css('display', 'block');
            } else {
                $('.billing-section').css('display', 'none');
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

            CheckoutModule.adjustColumns($section);
            CheckoutModule.updateSummaryLabels();
        });

        $('input:radio[name="selector"]').on('change', function() {
            switch ($(this).val()) {
                case 'credit-card':
                    $('#dr-paypal-button').hide();
                    $('.credit-card-info').show();
                    $('#dr-submit-payment').text(drgc_params.translations.pay_with_card_label.toUpperCase()).show();

                    break;
                case 'paypal':
                    $('#dr-submit-payment').hide();
                    $('.credit-card-info').hide();
                    $('#dr-paypal-button').show();
                    $('#dr-submit-payment').text(drgc_params.translations.pay_with_paypal_label.toUpperCase());

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

        //floating labels
        FloatLabel.init();

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
                        'currency': 'USD',
                        'payPal': {
                            'returnUrl': window.location.href + '?ppsuccess=true',
                            'cancelUrl': window.location.href + '?ppcancel=true',
                            'items': payPalItems,
                            'taxAmount': cart.pricing.tax.value,
                            'requestShipping': requestShipping
                        }
                    };

                    if (requestShipping) {
                        payPalPayload['shipping'] = {
                            'recipient':  `${cart.shippingAddress.firstName} ${cart.shippingAddress.lastName} `,
                            'phoneNumber':  cart.shippingAddress.phoneNumber,
                            'address': {
                                'line1': cart.shippingAddress.line1,
                                'line2': cart.shippingAddress.line2,
                                'city': cart.shippingAddress.city,
                                'state': cart.shippingAddress.countrySubdivision,
                                'country':  cart.shippingAddress.country,
                                'postalCode': cart.shippingAddress.postalCode
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
                onAuthorize: function() {
                    const sourceId = sessionStorage.getItem('paymentSourceId');

                    $('body').css({'pointer-events': 'none', 'opacity': 0.5});
                    CheckoutModule.applyPaymentAndSubmitCart(sourceId);
                }
            }, '#dr-paypal-button');
        }

        const buttonStyle = {
            buttonType: 'long',
            buttonColor: 'dark',
            buttonLanguage: drLocale.split('_')[0]
        };
        const baseRequest = CheckoutUtils.getBaseRequestData(cartData, requestShipping, buttonStyle);
        const paymentDataRequest = digitalriverjs.paymentRequest(baseRequest);

        if ($('#dr-googlepay-button').length && isGooglePayEnabled) {
            DRGooglePay.init({
                digitalriverJs: digitalriverjs,
                paymentDataRequest: paymentDataRequest,
                requestShipping: requestShipping
            });
        }

        if ($('#dr-applepay-button').length && isApplePayEnabled) {
            DRApplePay.init({
                digitalriverJs: digitalriverjs,
                paymentDataRequest: paymentDataRequest,
                requestShipping: requestShipping
            });
        }
    }
});

export default CheckoutModule;
