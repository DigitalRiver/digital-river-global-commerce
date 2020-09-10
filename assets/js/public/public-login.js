/* global drgc_params, iFrameResize */
/* eslint-disable no-alert, no-console */

const LoginModule = (($) => {
    const validatePassword = (e) => {
        const elem = e.target;
        const customMsgArr = [];
        let customMsg = '';

        if (elem.value.length < 8 || elem.value.length > 32) {
            customMsgArr.push(drgc_params.translations.password_length_error_msg);
        }
        if (!/[A-Z]/.test(elem.value)) {
            customMsgArr.push(drgc_params.translations.password_uppercase_error_msg);
        }
        if (!/[a-z]/.test(elem.value)) {
            customMsgArr.push(drgc_params.translations.password_lowercase_error_msg);
        }
        if (!/[0-9]/.test(elem.value)) {
            customMsgArr.push(drgc_params.translations.password_number_error_msg);
        }
        if (!/[!_@]/.test(elem.value)) {
            customMsgArr.push(drgc_params.translations.password_char_error_msg);
        }
        if (!/^[a-zA-Z0-9!_@]+$/.test(elem.value)) {
            customMsgArr.push(drgc_params.translations.password_banned_char_error_msg);
        }

        customMsg = customMsgArr.join(' ');
        elem.setCustomValidity(customMsg);

        if (elem.validity.valueMissing) {
            $(elem).next('.invalid-feedback').text(drgc_params.translations.required_field_msg);
        } else if (elem.validity.customError) {
            $(elem).next('.invalid-feedback').text(elem.validationMessage);
        } else {
            $(elem).next('.invalid-feedback').text('');
        }
    };

    const checkoutAsGuest = (e) => {
        e.preventDefault();

        const $btn = $(e.target);
        if ($btn.hasClass('sending')) return;
        $btn.toggleClass('sending').blur();

        const data = {
            action: 'drgc_checkout_as_guest',
            nonce: drgc_params.ajaxNonce,
        };
        $.ajax({
            type: 'POST',
            url: drgc_params.ajaxUrl,
            data,
            success: () => {
                LoginModule.redirectAfterAuth(false);
            }
        });
    };

    const logout = (e) => {
        e.preventDefault();

        if ($(e.target).data('processing')) return;

        $(e.target).toggleClass('sending').data('processing', true).blur();

        const data = {
            action: 'drgc_logout',
            nonce: drgc_params.ajaxNonce
        };
        $('body').addClass('dr-loading');
        $.post(drgc_params.ajaxUrl, data, function(response) {
            location.reload();
        });
    };

    const redirectAfterAuth = (isLoggedIn, locale) => {
        const cartUrl = new URL(drgc_params.cartUrl);
        const checkoutUrl = new URL(drgc_params.checkoutUrl);
        let targetHref = '';

        if (document.referrer.indexOf(cartUrl.pathname) > -1 || document.referrer.indexOf(checkoutUrl.pathname) > -1) {
            targetHref = drgc_params.checkoutUrl;
        } else if (isLoggedIn) {
            targetHref = drgc_params.accountUrl;
        } else if (!document.referrer) {
            targetHref = drgc_params.homeUrl;
        } else {
            targetHref = document.referrer;
        }

        const targetUrl = new URL(targetHref);
        if (locale) targetUrl.searchParams.set('locale', locale);
        window.location.href = targetUrl.toString();
    };

    const autoLogout = (url) => {
        const data = {
            action: 'drgc_logout',
            nonce: drgc_params.ajaxNonce
        };

        $('body').addClass('dr-loading');
        $.post(drgc_params.ajaxUrl, data, () => {
            window.location.href = url;
        });
    };

    const resetCookie = () => {
        const data = {
            action: 'drgc_reset_cookie',
            nonce: drgc_params.ajaxNonce
        };

        $.post(drgc_params.ajaxUrl, data, (res) => {
            if (!res.success) throw new Error('Cookie reset failed.');
        });
    };

    return {
        validatePassword,
        checkoutAsGuest,
        logout,
        redirectAfterAuth,
        autoLogout,
        resetCookie
    };
})(jQuery);

jQuery(document).ready(($) => {
    const ajaxUrl = drgc_params.ajaxUrl;

    $('#dr_login_form').on('submit', (e) => {
        e.preventDefault();

        let $form = $('#dr_login_form');

        $form.addClass('was-validated');

        if ($form.data('processing')) {
            return false;
        }

        if ($form[0].checkValidity() === false) {
            return false;
        }

        let but = $form.find('[type="submit"]').toggleClass('sending').blur();
        $form.data('processing', true);
        $('.dr-form-error-msg').text('');

        const params = (new URL(window.location)).searchParams;
        const locale = params.get('locale');
        const data = {
            action  : 'drgc_login',
            nonce   : drgc_params.ajaxNonce,
            username: $('.dr-login-form input[name=username]').val(),
            password: $('.dr-login-form input[name=password]').val(),
            locale: locale
        };

        $.post(ajaxUrl, data, function(response) {
            if ( response.success ) {
                LoginModule.redirectAfterAuth(true, response.data.locale);
            } else {
                $form.data('processing', false);
                but.removeClass('sending').blur();

                if ( response.data.hasOwnProperty('error_description') ) {
                    $('.dr-form-error-msg').text(response.data.error_description);
                }

                if ( Object.prototype.toString.call(response.data) == '[object String]' ) {
                    $('.dr-form-error-msg').text(response.data);
                }

                $('.dr-form-error-msg').css('color', 'red');
            }
        });

    });

    $('.drgc-wrapper').on('click', '.dr-logout', function(e) {
        LoginModule.logout(e);
    });

    $('#menu-item-logout a').on('click', function(e) {
        LoginModule.logout(e);
    });

    $('#dr_login_form, #dr-signup-form, #dr-pass-reset-form, #checkout-email-form').find('input[type=email]').on('input', (e) => {
        const elem = e.target;
        if (elem.validity.valueMissing) {
            $(elem).next('.invalid-feedback').text(drgc_params.translations.required_field_msg);
        } else if (elem.validity.typeMismatch) {
            $(elem).next('.invalid-feedback').text(drgc_params.translations.invalid_email_msg);
        }
    });

    $('#dr-signup-form input[name=upw], #dr-confirm-password-reset-form input[name=password]').on('input', (e) => {
        LoginModule.validatePassword(e);
    });

    $('#dr-signup-form input[type=password], #dr-confirm-password-reset-form input[type=password]').on('input', (e) => {
        const $form = $(e.target).closest('form');
        const pw = $form.find('input[type=password]')[0];
        const cpw = $form.find('input[type=password]')[1];

        cpw.setCustomValidity(pw.value !== cpw.value ? drgc_params.translations.password_confirm_error_msg : '');
        if (cpw.validity.valueMissing) {
            $(cpw).next('.invalid-feedback').text(drgc_params.translations.required_field_msg);
        } else if (cpw.validity.customError) {
            $(cpw).next('.invalid-feedback').text(cpw.validationMessage);
        } else {
            $(cpw).next('.invalid-feedback').text('');
        }
    });

    $('.dr-signup-form').on('submit', function(e) {
        e.preventDefault();

        const $form = $(e.target);

        $form.addClass('was-validated');

        if ($form.data('processing')) {
            return false;
        }

        if ($form[0].checkValidity() === false) {
            return false;
        }

        const $button = $form.find('button[type=submit]').toggleClass('sending').blur();
        $form.data('processing', true);

        $('.dr-signin-form-error').text('');

        const data = {
            action    : 'drgc_signup',
            nonce     : drgc_params.ajaxNonce,
            first_name: $('.dr-signup-form input[name=first_name]').val(),
            last_name : $('.dr-signup-form input[name=last_name]').val(),
            username  : $('.dr-signup-form input[name=uemail]').val(),
            password  : $('.dr-signup-form input[name=upw]').val(),
            confirm_password: $('.dr-signup-form input[name=upw2]').val()
        };

        $.post(ajaxUrl, data, function(response) {
            if (response.success) {
                LoginModule.redirectAfterAuth(true);
            } else {
                $form.data('processing', false);
                $button.removeClass('sending').blur();

                if (response.data && response.data.errors && response.data.errors.error[0].hasOwnProperty('description') ) {
                    $('.dr-signin-form-error').text( response.data.errors.error[0].description );
                } else if (Object.prototype.toString.call(response.data) == '[object String]') {
                    $('.dr-signin-form-error').text(response.data);
                } else {
                    $('.dr-signin-form-error').text(drgc_params.translations.undefined_error_msg);
                }

                $('.dr-signin-form-error').css('color', 'red');
            }
        });

    });

    $('#dr-guest-btn').click((e) => {
        LoginModule.checkoutAsGuest(e);
    });

    $('#dr-pass-reset-form').on('submit', function(e) {
        e.preventDefault();
        const $form = $(e.target);
        const $errMsg = $('#dr-reset-pass-error').text('').hide();

        $form.addClass('was-validated');
        if ($form[0].checkValidity() === false) {
            return false;
        }

        const $button = $form.find('button[type=submit]').addClass('sending').blur();

        const data = {
            action: 'drgc_pass_reset_request',
            nonce: drgc_params.ajaxNonce
        };

        $.each($form.serializeArray(), function( index, obj ) {
            data[obj.name] = obj.value;
        });

        if (data['email'] !== data['email-confirm']) {
           $errMsg.text(drgc_params.translations.email_confirm_error_msg).show();
           $button.removeClass('sending').blur();
           return;
        }

        $.post(ajaxUrl, data, function(response) {
            if (!response.success) {
               $errMsg.text(response.data[0].message).show();
            } else {
                $('#drResetPasswordModalBody').html('').html(`
                    <h3>${drgc_params.translations.password_reset_title}</h3>
                    <p>${drgc_params.translations.password_reset_msg}</p>
                `);

                $button.hide();
            }

            $button.removeClass('sending').blur();
        });
    });

    $('form.dr-confirm-password-reset-form').on('submit', function(e) {
        e.preventDefault();
        const $form = $(this);
        const $errMsg = $form.find('.dr-form-error-msg').text('').hide();

        $form.addClass('was-validated');
        if ($form[0].checkValidity() === false) {
            return false;
        }

        const searchParams = new URLSearchParams(window.location.search)
        if ( !searchParams.get('key') || !searchParams.get('login') ) {
            $errMsg.text(drgc_params.translations.undefined_error_msg).show();
            return;
        }

        const data = {
            action: 'drgc_reset_password',
            nonce: drgc_params.ajaxNonce,
            key: searchParams.get('key'),
            login: searchParams.get('login')
        };

        $.each($form.serializeArray(), function(index, obj) {
            data[obj.name] = obj.value;
        });

        const $button = $form.find('button[type=submit]').addClass('sending').blur();
        $.post(ajaxUrl, data, function(response) {
            if (!response.success) {
               if (response.data) $errMsg.text(response.data).show();
            } else {
                $('section.reset-password').html('').html(`
                    <h3>${drgc_params.translations.password_saved_title}</h3>
                    <p>${drgc_params.translations.password_saved_msg}</p>
                `).css('color', 'green');

                setTimeout(() => location.replace(`${location.origin}${location.pathname}`), 2000);
            }

            $button.removeClass('sending').blur();
        });
    });

    if ( $('section.logged-in').length) {
        toggleCartBtns();
    }

    function toggleCartBtns() {
        if ($('section.dr-login-sections__section.logged-in').length && !drgc_params.cart.cart.lineItems.hasOwnProperty('lineItem')) {
            $('section.dr-login-sections__section.logged-in > div').hide();
        }
    }
});

export default LoginModule;
