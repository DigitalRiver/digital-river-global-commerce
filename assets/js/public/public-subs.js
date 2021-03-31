import CheckoutUtils from './checkout-utils';
import DRCommerceApi from './commerce-api';

const SubsModule = (() => {
  const createRenewalRequestData = (subsId, productId, qty) => {
    return {
      cart: {
        lineItems: {
          lineItem: [
            {
              quantity: qty,
              product: {
                id: productId
              },
              customAttributes: {
                attribute: [
                  {
                    name: 'RenewingSubscriptionID',
                    value: subsId
                  }
                ]
              }
            }
          ]
        }
      }
    };
  };

  return {
    createRenewalRequestData
  };
})();

jQuery(document).ready(($) => {
  const ajaxUrl = drgc_params.ajaxUrl;
  
  if ($('#dr-my-subs-page-wrapper').length) {
    $(document).on('click', '.subs-name', (event) => {
      $('#subscription-details-form input[name="subscription_id"]').val(event.target.dataset.id);
      $('#subscription-details-form').submit();
    });

    $(document).on('click', '.renew-cancalled', (event) => {
      const subsId = event.target.dataset.id;
      const productId = event.target.dataset.productId;
      const cartRequest = SubsModule.createRenewalRequestData(subsId, productId, 1);

      $('body').css({'pointer-events': 'none', 'opacity': 0.5});

      DRCommerceApi.updateCart({expand: 'all'}, cartRequest).then(() => {
        window.location.href = drgc_params.cartUrl;
      }).catch((jqXHR) => {
        CheckoutUtils.displayAlertMessage(CheckoutUtils.getAjaxErrorMessage(jqXHR));
        CheckoutUtils.resetBodyOpacity();
      });
    });
  }

  if ($('#dr-subs-details-page-wrapper').length) {
    $(document).on('click', '#subs-cancel-link', () => {
      if (confirm(drgc_params.translations.cancel_subs_confirm)) {
        $('body').css({'pointer-events': 'none', 'opacity': 0.5});

        const subsId = $('#subs-cancel-link').attr('data-id');
        const data = {
          action: 'drgc_cancel_subscription',
          nonce: drgc_params.ajaxNonce,
          subscriptionId: subsId
        };

        $.post(ajaxUrl, data, (response) => {
          if (response.success) {
            console.log('The subscription has been unsubscribed.');
          } else {
            if (typeof response.data === 'string') {
              alert(response.data);
            } else {
              alert(response.data[0]);
            }
          }

          window.location.href = drgc_params.mySubsUrl;
        });
      }
    });

    $(document).on('change', '#auto-renewal-switch', () => {
      $('body').css({'pointer-events': 'none', 'opacity': 0.5});

      const $switch = $('#auto-renewal-switch');
      const subsId = $switch.attr('data-id');
      const type = $switch.prop('checked') ? 'Auto' : 'Manual';
      const data = {
        action: 'drgc_switch_renewal_type',
        nonce: drgc_params.ajaxNonce,
        subscriptionId: subsId,
        renewalType: type
      };

      $.post(ajaxUrl, data, (response) => {
        if (response.success) {
          console.log('The renewal type has been updated.');
        } else {
          if (typeof response.data === 'string') {
            alert(response.data);
          } else {
            alert(response.data[0]);
          }
        }

        location.reload();
      });
    });

    $(document).on('click', '#subs-change-qty-btn', () => {
      const qtyInput = prompt(drgc_params.translations.change_renewal_qty_prompt, '');

      if (isNaN(Number(qtyInput)) || qtyInput === '') {
        alert('Please enter a number!');
      } else if (qtyInput === null) {
        return;
      } else {
        $('body').css({'pointer-events': 'none', 'opacity': 0.5});
        
        const subsId = $('#subs-change-qty-btn').attr('data-id');
        const data = {
          action: 'drgc_change_renewal_qty',
          nonce: drgc_params.ajaxNonce,
          subscriptionId: subsId,
          renewalQty: qtyInput
        };

        $.post(ajaxUrl, data, (response) => {
          if (response.success) {
            console.log('The next renewal quantity has been updated.');
          } else {
            if (typeof response.data === 'string') {
              alert(response.data);
            } else {
              alert(response.data[0]);
            }
          }

          location.reload();
        });
      }
    });

    $(document).on('click', '#subs-renew-btn', (event) => {
      const subsId = event.target.dataset.id;
      const productId = event.target.dataset.productId;
      const qty = event.target.dataset.qty;
      const cartRequest = SubsModule.createRenewalRequestData(subsId, productId, qty);

      $('body').css({'pointer-events': 'none', 'opacity': 0.5});

      DRCommerceApi.updateCart({expand: 'all'}, cartRequest).then(() => {
        window.location.href = drgc_params.cartUrl;
      }).catch((jqXHR) => {
        CheckoutUtils.displayAlertMessage(CheckoutUtils.getAjaxErrorMessage(jqXHR));
        CheckoutUtils.resetBodyOpacity();
      });
    });

    $(document).on('click', '#view-order-history-link', (event) => {
      const content = event.target.nextElementSibling;

      event.target.classList.toggle('active');

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      } 
    });
  }
});

export default SubsModule;
