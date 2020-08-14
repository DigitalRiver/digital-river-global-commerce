import CheckoutUtils from './checkout-utils';
import DRCommerceApi from './commerce-api';

const DRApplePay = (($, translations) => {
  const initApplePayEvents = (applepay, requestShipping) => {
    applepay.on('ready', () => {
      drgc_params.applePayBtnStatus = 'READY';
      CheckoutUtils.displayPreTAndC();
    });

    applepay.on('click', () => {
      $('#dr-preTAndC-err-msg').text('').hide();
    });

    applepay.on('shippingaddresschange', (event) => {
      const shippingAddress = event.shippingAddress;
      const supportedCountries = CheckoutUtils.getSupportedCountries('shipping');

      if (shippingAddress.address.postalCode === '') {
        event.updateWith({
          status: 'failure',
          error: {
            fields: {
              postalCode: translations.invalid_postal_code_msg
            }
          }
        });
      } else if (shippingAddress.address.city === '') {
        event.updateWith({
          status: 'failure',
          error: {
            fields: {
              city: translations.invalid_city_msg
            }
          }
        });
      } else if ((shippingAddress.address.country === 'US') && (shippingAddress.address.state === '')) {
        event.updateWith({
          status: 'failure',
          error: {
            fields: {
              region: translations.invalid_region_msg
            }
          }
        });
      } else if (supportedCountries.indexOf(shippingAddress.address.country) === -1) {
        event.updateWith({
          status: 'failure',
          error: {
            message: translations.shipping_country_error_msg
          }
        });
      } else {
        if (requestShipping) {
          const cartRequest = {
            cart: {
              shippingAddress: {
                id: 'shippingAddress',
                city: shippingAddress.address.city,
                countrySubdivision: shippingAddress.address.state || 'NA',
                postalCode: shippingAddress.address.postalCode,
                country: shippingAddress.address.country
              }
            }
          };

          DRCommerceApi.updateCart({ expand: 'all' }, cartRequest).then((data) => {
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
          DRCommerceApi.getCart({expand: 'all'}).then((data) => {
            const displayItems = CheckoutUtils.createDisplayItems(data.cart);

            const requestUpdateObject = {
              total: {
                label: translations.order_total_label,
                amount: data.cart.pricing.orderTotal.value
              },
              displayItems: displayItems
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
        }
      }
    });

    applepay.on('shippingoptionchange', (event) => {
      const shippingOption = event.shippingOption;

      DRCommerceApi.applyShippingOption(shippingOption.id).then((data) => {
        const displayItems = CheckoutUtils.createDisplayItems(data.cart);
        const shippingOptions = CheckoutUtils.createShippingOptions(data.cart);

        CheckoutUtils.updateShippingOptions(shippingOptions, shippingOption.id);

        const requestUpdateObject = {
          status: 'success',
          total: {
            label: translations.order_total_label,
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

    applepay.on('source', (event) => {
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

    const applepay = digitalriverJs.createElement('applepay', paymentDataRequest);

    if (applepay.canMakePayment()) {
      drgc_params.applePayBtnStatus = 'LOADING';
      initApplePayEvents(applepay, requestShipping);
      applepay.mount('dr-applepay-button');
      document.getElementById('dr-applepay-button').style.border = 'none';

      return applepay;
    } else {
      drgc_params.applePayBtnStatus = 'UNAVAILABLE';
      $('.dr-checkout__applepay').hide();
      return false;
    }
  };

  return {
    init: init
  };
})(jQuery, drgc_params.translations);

export default DRApplePay;
