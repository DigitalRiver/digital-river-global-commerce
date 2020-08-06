import CheckoutUtils from './checkout-utils';
import DRCommerceApi from './commerce-api';

const DRGooglePay = (($, translations) => {
  const isConnectionSecure = async () => {
    let canPay = false;
    const details = {
      total: {
        label: 'Total',
        amount: {
          currency: 'USD',
          value: '0.00'
        }
      }
    };

    if (window.PaymentRequest) {
      canPay = await new PaymentRequest([{supportedMethods: 'basic-card'}], details).canMakePayment();
    };

    return canPay;
  };

  const initGooglePayEvents = (googlepay, requestShipping) => {
    googlepay.on('ready', () => {
      drgc_params.googlePayBtnStatus = 'READY';
      CheckoutUtils.displayPreTAndC();
    });

    googlepay.on('click', () => {
      $('#dr-preTAndC-err-msg').text('').hide();
    });

    googlepay.on('shippingaddresschange', (event) => {
      const shippingAddress = event.shippingAddress;
      const supportedCountries = CheckoutUtils.getSupportedCountries('shipping');

      if (supportedCountries.indexOf(shippingAddress.address.country) > -1) {
        const cartRequest = {
          shippingAddress: {
            id: 'shippingAddress',
            city: shippingAddress.address.city,
            countrySubdivision: shippingAddress.address.state || 'NA',
            postalCode: shippingAddress.address.postalCode,
            country: shippingAddress.address.country
          }
        };

        DRCommerceApi.updateCart({expand: 'all'}, cartRequest).then((data) => {
          const displayItems = CheckoutUtils.createDisplayItems(data.cart);
          const shippingOptions = CheckoutUtils.createShippingOptions(data.cart);

          CheckoutUtils.updateShippingOptions(shippingOptions, data.cart.shippingMethod.code);

          const requestUpdateObject = {
            total: {
              label: translations.order_total_label,
              amount: data.cart.pricing.orderTotal.value
            },
            displayItems: displayItems,
            shippingOptions: shippingOptions
          };

          requestUpdateObject.status = 'success';
          event.updateWith(requestUpdateObject);
        }).catch((jqXHR) => {
          event.updateWith({
            status: 'failure',
            error: {
              message: CheckoutUtils.getAjaxErrorMessage(jqXHR)
            }
          });
        });
      } else {
        event.updateWith({
          status: 'failure',
          error: {
            message: translations.shipping_country_error_msg
          }
        });
      }
    });

    googlepay.on('shippingoptionchange', (event) => {
      const shippingOption = event.shippingOption;

      DRCommerceApi.applyShippingOption(shippingOption.id).then((data) => {
        const displayItems = CheckoutUtils.createDisplayItems(data.cart);
        const shippingOptions = CheckoutUtils.createShippingOptions(data.cart);

        CheckoutUtils.updateShippingOptions(shippingOptions, shippingOption.id);

        const requestUpdateObject = {
          status: 'success',
          total: {
            label: ranslations.order_total_label,
            amount: data.cart.pricing.orderTotal.value
          },
          displayItems: displayItems,
          shippingOptions: shippingOptions
        };

        event.updateWith(requestUpdateObject);
        CheckoutUtils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
      }).catch((jqXHR) => {
        event.updateWith({
          status: 'failure',
          error: {
            message: CheckoutUtils.getAjaxErrorMessage(jqXHR)
          }
        });
      });
    });

    googlepay.on('source', (event) => {
      const $errorMsg = $('#dr-preTAndC-err-msg');
      let shippingNotSupported = false;
      let billingNotSupported = false;
      const billingCountries = CheckoutUtils.getSupportedCountries('billing');

      billingNotSupported = (billingCountries.indexOf(event.billingAddress.address.country) === -1) ? true : false;

      if (requestShipping) {
        const shippingCountries = CheckoutUtils.getSupportedCountries('shipping');
        shippingNotSupported = (shippingCountries.indexOf(event.shippingAddress.address.country) === -1) ? true : false;
      }

      if (shippingNotSupported) {
        $errorMsg.text(translations.shipping_country_error_msg).show();
        event.complete('fail');
      } else if (billingNotSupported) {
        $errorMsg.text(translations.billing_country_error_msg).show();
        event.complete('fail');
      } else {
        $errorMsg.text('').hide();

        const sourceId = event.source.id;
        const cartRequest = CheckoutUtils.createCartRequest(event, requestShipping);

        sessionStorage.setItem('paymentSourceId', sourceId);
        $('body').addClass('dr-loading');

        DRCommerceApi.updateCart({expand: 'all'}, cartRequest)
          .then(() => DRCommerceApi.applyPaymentMethod(sourceId))
          .then(() => DRCommerceApi.submitCart({ipAddress: drgc_params.client_ip}))
          .then((data) => {
            $('#checkout-confirmation-form > input[name="order_id"]').val(data.submitCart.order.id);
            $('#checkout-confirmation-form').submit();
          })
          .catch((jqXHR) => {
            CheckoutUtils.displayAlertMessage(CheckoutUtils.getAjaxErrorMessage(jqXHR));
            $('body').removeClass('dr-loading');
          });

        event.complete('success');
      }
    });
  };

  const init = (params) => {
    const {digitalriverJs, paymentDataRequest, requestShipping = false} = params || {};

    if (typeof digitalriverJs !== 'object') {
      throw new Error('Please pass an instance of the DigitalRiver object.');
    }

    if (typeof paymentDataRequest !== 'object') {
      throw new Error('Please pass a PaymentDataRequest object.');
    }

    const googlepay = digitalriverJs.createElement('googlepay', paymentDataRequest);

    if (googlepay.canMakePayment() && isConnectionSecure()) {
      drgc_params.googlePayBtnStatus = 'LOADING';
      initGooglePayEvents(googlepay, requestShipping);
      googlepay.mount('dr-googlepay-button');
      document.getElementById('dr-googlepay-button').style.border = 'none';

      return googlepay;
    } else {
      drgc_params.googlePayBtnStatus = 'UNAVAILABLE';
      $('.dr-checkout__googlepay').hide();
      return false;
    }
  };

  return {
    init: init
  };
})(jQuery, drgc_params.translations);

export default DRGooglePay;
