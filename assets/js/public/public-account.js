import FloatLabel from './float-label';
import $ from 'jquery';
import DRCommerceApi from './commerce-api';
import CheckoutUtils from './checkout-utils';
import LoginModule from './public-login';

const AccountModule = (($) => {
    const localizedText = drgc_params.translations;

    const appendAutoRenewalTerms = (digitalriverjs, entityCode, locale) => {
        const terms = CheckoutUtils.getLocalizedAutoRenewalTerms(digitalriverjs, entityCode, locale);

        if (terms) {
            $('#dr-autoRenewalPlanTerms').find('.dr-modal-body > p').append(terms);
        }
    };

    const getRightOfWithdrawalLink = (locale) => {
        const gcFontsDomain = 'drh-fonts.img.digitalrivercontent.net';

        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: `https://${gcFontsDomain}/store/${drgc_params.siteID}/${locale}/DisplayHelpPage`,
                success: (response) => {
                    const $rightOfWithdrawal = $(response).find('#dr_rightOfWithdrawalFAQ');
                    let url = '';

                    if ($rightOfWithdrawal.length) {
                        url = $rightOfWithdrawal.find('a.dr_rightOfWithdrawal').prop('href').split('?')[1];
                        url = `https://gc.digitalriver.com/store?${url}`;
                    }

                    resolve(url);
                },
                error: (jqXHR) => {
                    reject(jqXHR);
                }
            });
        });
    };

    const initRightOfWithdrawalLink = async () => {
        try {
            const rightOfWithdrawalLink = await AccountModule.getRightOfWithdrawalLink(drgc_params.drLocale);

            if (rightOfWithdrawalLink) {
                $('a.right-of-withdrawal-link').prop('href', rightOfWithdrawalLink);
                $('.dr-right-of-withdrawal').show();
            } else {
                $('.dr-right-of-withdrawal').hide();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const createOrderList = (orders) => {
        let listHtml = '';

        orders.forEach((element) => {
            const submissionDate = new Date(element.submissionDate).toLocaleDateString();
            const status = element.orderState.toLowerCase().split(' ').join('');

            listHtml = `
                ${listHtml}
                <div class="order">
                    <div class="order-id" data-heading="${localizedText.order_id_label}">${element.id}</div>
                    <div class="order-date" data-heading="${localizedText.date_label}">${submissionDate}</div>
                    <div class="order-amount" data-heading="${localizedText.amount_label}">${element.pricing.formattedTotal}</div>
                    <div class="order-status ${status}" data-heading="${localizedText.status_label}">${element.orderState}</div>
                    <div class="order-details">
                        <button type="button" class="btn btn-transparent" data-order="${element.id}">${localizedText.order_details_label}</button>
                    </div>
                </div>
            `;
        });

        return listHtml;
    };

    const updateListAndPagination = (list, $selectedNum, orders) => {
        $('#list-orders > .overflowContainer > .order:not(.order-headings)').remove();
        $('#list-orders > .overflowContainer > .order-headings').after(list);
        $('#list-orders > .overflowContainer > .dr-pagination > .page-link').not($selectedNum).removeClass('active');
        $selectedNum.addClass('active');
        $('#list-orders > .overflowContainer > .dr-pagination > .next > .btn').prop('disabled', !orders.hasOwnProperty('nextPage'));
        $('#list-orders > .overflowContainer > .dr-pagination > .prev > .btn').prop('disabled', !orders.hasOwnProperty('previousPage'));
    };

    const submitTaxCertificate = async ($form, customerId) => {
        $form.addClass('dr-loading');

        try {
            const res = JSON.parse(await CheckoutUtils.createTaxProfile(customerId));

            if (res.companyName) {
                location.reload();
            } else {
                $('#tems-us-error-msg').text(CheckoutUtils.getAjaxErrorMessage()).show();
            }
        } catch (error) {
            console.error(error);
            $form.removeClass('dr-loading');
            $('#tems-us-error-msg').text(CheckoutUtils.getAjaxErrorMessage(JSON.parse(error.responseText))).show();
        }
    };

    return {
        appendAutoRenewalTerms,
        getRightOfWithdrawalLink,
        initRightOfWithdrawalLink,
        createOrderList,
        updateListAndPagination,
        submitTaxCertificate
    };
})(jQuery);

$(() => {
    if ($('#dr-account-page-wrapper').length < 1) return;

    window.drActiveOrderId = '';
    const localizedText = drgc_params.translations;
    const $body = $('body');
    const $ordersModal = $('#ordersModal');
    const $orderIdModal = $('#order-id-modal');

    $body.append($ordersModal).append($orderIdModal);

    // Order detail click
    async function fillOrderModal(e) {
        const orderId = $(this).attr('data-order');

        $('a.right-of-withdrawal-link').data('orderId', orderId);

        if (orderId === drActiveOrderId) {
            $ordersModal.drModal('show');
        } else {
            let selectedOrder = '';

            try {
                const orderDetails = await DRCommerceApi.getOrderDetails(orderId, {expand: 'all'});
                selectedOrder = orderDetails.order;
            } catch (error) {
                console.error(error);
                return false;
            }

            if (!selectedOrder) {
                drToast.displayMessage(localizedText.undefined_error_msg, 'error');
                return false;
            }

            const requestShipping = 'code' in selectedOrder.shippingMethod;

            // orderID
            $('.dr-modal-orderNumber').text(orderId);
            // Order Pricing
            $('.dr-modal-subtotal').text(selectedOrder.pricing.formattedSubtotal);
            $('.dr-modal-tax').text(selectedOrder.pricing.formattedTax);
            $('.dr-modal-shipping').text(selectedOrder.pricing.formattedShipping);
            var isDiscount = parseInt(selectedOrder.pricing.formattedIncentive.replace(/\D/g, ''));
            if (isDiscount) {
                $('.dr-modal-discount').text(selectedOrder.pricing.formattedIncentive);
                $('.dr-summary__discount').show();
            } else {
                $('.dr-summary__discount').hide();
            }
            $('.dr-modal-total').text(selectedOrder.pricing.formattedTotal);
            // Billing
            $('.dr-modal-billingName').text(selectedOrder.billingAddress.firstName + ' ' + selectedOrder.billingAddress.lastName);
            var billingAddress1 = selectedOrder.billingAddress.line1;
            billingAddress1 += (selectedOrder.billingAddress.line2) ? '<br>' + selectedOrder.billingAddress.line2 : '';
            $('.dr-modal-billingAddress1').html(billingAddress1);
            var billingAddress2 = (selectedOrder.billingAddress.city) ? selectedOrder.billingAddress.city : '';
            billingAddress2 += (selectedOrder.billingAddress.countrySubdivision) ? ', ' + selectedOrder.billingAddress.countrySubdivision : '';
            billingAddress2 += (selectedOrder.billingAddress.postalCode) ? ' ' + selectedOrder.billingAddress.postalCode : '';
            $('.dr-modal-billingAddress2').text(billingAddress2);
            $('.dr-modal-billingCountry').text(selectedOrder.billingAddress.country);
            // Shipping
            $('.dr-modal-shippingName').text(selectedOrder.shippingAddress.firstName + ' ' + selectedOrder.shippingAddress.lastName);
            var shippingAddress1 = selectedOrder.shippingAddress.line1;
            shippingAddress1 += (selectedOrder.shippingAddress.line2) ? '<br>' + selectedOrder.shippingAddress.line2 : '';
            $('.dr-modal-shippingAddress1').html(shippingAddress1);
            var shippingAddress2 = (selectedOrder.shippingAddress.city) ? selectedOrder.shippingAddress.city : '';
            shippingAddress2 += (selectedOrder.shippingAddress.countrySubdivision) ? ', ' + selectedOrder.shippingAddress.countrySubdivision : '';
            shippingAddress2 += (selectedOrder.shippingAddress.postalCode) ? ' ' + selectedOrder.shippingAddress.postalCode : '';
            $('.dr-modal-shippingAddress2').text(shippingAddress2);
            $('.dr-modal-shippingCountry').text(selectedOrder.shippingAddress.country);

            // Summary Labels
            const orderCurrency = selectedOrder.pricing.total.currency;
            const shouldDisplayVat = (orderCurrency === 'GBP' || orderCurrency === 'EUR');
            const orderLocaleOption = drgc_params.localeOptions.find(elem => elem.dr_locale === selectedOrder.locale);
            const displayIncl = orderLocaleOption ? (orderLocaleOption.tax_display === 'INCL') : false;

            $('.dr-summary__subtotal .subtotal-label').text(localizedText.subtotal_label + CheckoutUtils.getTaxSuffixLabel(displayIncl));
            $('.dr-summary__tax .item-label').text(shouldDisplayVat ?
                localizedText.vat_label :
                localizedText.tax_label
            );
            $('.dr-summary__shipping .item-label').text(localizedText.shipping_label + CheckoutUtils.getTaxSuffixLabel(displayIncl));
            $('.dr-summary__shipping-tax .item-label').text(shouldDisplayVat ?
                localizedText.shipping_vat_label :
                localizedText.shipping_tax_label
            );
            if (displayIncl) {
              $('.dr-summary__tax, .dr-summary__shipping-tax').addClass('tree-sub-item');
            } else {
              $('.dr-summary__tax, .dr-summary__shipping-tax').removeClass('tree-sub-item');
            }

            // Products
            var html = '';
            const count = selectedOrder.lineItems.lineItem.length;

            for (var i = 0; i < count; i++) {
                const lineItem = selectedOrder.lineItems.lineItem[i];

                html += `<div class="dr-product">
                <div class="dr-product-content">
                    <div class="dr-product__img dr-modal-productImgBG" style="background-image:url(${lineItem.product.thumbnailImage});"></div>
                    <div class="dr-product__info">
                        <a class="product-name dr-modal-productName">${lineItem.product.displayName}</a>
                        <div class="product-sku">
                            <span>Product </span>
                            <span class="dr-modal-productSku">${lineItem.product.sku}</span>
                        </div>
                        <div class="product-qty">
                            <span class="qty-text">Qty <span class="dr-modal-productQty">${lineItem.quantity}</span></span>
                            <span class="dr-pd-cart-qty-minus value-button-decrease"></span>
                            <input
                                type="number"
                                class="product-qty-number"
                                step="1"
                                min="1"
                                max="999"
                                value="${lineItem.quantity}"
                                maxlength="5"
                                size="2"
                                pattern="[0-9]*"
                                inputmode="numeric"
                                readonly="true"/>
                            <span class="dr-pd-cart-qty-plus value-button-increase"></span>
                        </div>
                    </div>
                </div>
                <div class="dr-product__price">
                    <span class="sale-price dr-modal-salePrice">${lineItem.pricing.formattedSalePriceWithQuantity}</span>
                    <span class="regular-price dr-modal-strikePrice" ${lineItem.pricing.formattedSalePriceWithQuantity === lineItem.pricing.formattedListPriceWithQuantity ? 'style="display:none"' : ''}>${lineItem.pricing.formattedListPriceWithQuantity}</span>
                </div>
            </div>`;
            }

            $('.dr-summary__products').html(html);

            CheckoutUtils.updateSummaryPricing(selectedOrder, displayIncl);

            if (!requestShipping) {
                $('.dr-order-address__shipping, .dr-summary__shipping, .dr-summary__shipping-tax').hide();
            } else {
                $('.dr-order-address__shipping, .dr-summary__shipping, .dr-summary__shipping-tax').show();
            }

            // set this last
            drActiveOrderId = orderId;
            $ordersModal.drModal('show');
        }
    }

    $(document).on('click', '.order-details > .btn', fillOrderModal);

    $('a.right-of-withdrawal-link').on('click', (e) => {
        e.preventDefault();
        const $link = $(e.target);

        if (window.isSecureContext) {
            const id = $link.data('orderId');

            navigator.clipboard.writeText(id).then(() => {
                $orderIdModal.find('.dr-modal-footer > button').data('rowUrl', $link.prop('href'));
                $orderIdModal.drModal('show');
            }, () => {
                console.error('Unable to write to clipboard.');
            });
        } else {
            window.open($link.prop('href'), '_blank');
        }
    });

    $orderIdModal.on('hidden.dr.bs.modal', (e) => {
        window.open($(e.target).find('.dr-modal-footer > button').data('rowUrl'), '_blank');
    });

    $('#list-orders > .overflowContainer > .dr-pagination > .page-link').on('click', async (e) => {
        const $list = $('#list-orders > .overflowContainer');
        let $selectedNum = $(e.target);
        let pageNumber = $selectedNum.data('pageNumber');
        let isNextBtn = false;

        if (!pageNumber) {
            const currentNum = $('#list-orders > .overflowContainer > .dr-pagination').find('.page-link.active').data('pageNumber');
            isNextBtn = $selectedNum.parent('a.page-link').hasClass('next');
            pageNumber = isNextBtn ? currentNum + 1 : ((currentNum - 1) < 1) ? 1 : currentNum - 1;
            $selectedNum = $('#list-orders > .overflowContainer > .dr-pagination > .page-link[data-page-number=' + pageNumber + ']');
        }

        if ($selectedNum.hasClass('active')) return false;

        $list.addClass('dr-loading');

        try {
            const ordersByPage = await DRCommerceApi.getOrders({
                pageNumber: pageNumber,
                expand: 'order.id,order.submissionDate,order.pricing.formattedTotal,order.orderState'
            });
            const list = AccountModule.createOrderList(ordersByPage.orders.order);

            AccountModule.updateListAndPagination(list, $selectedNum, ordersByPage.orders);
        } catch (error) {
            console.error(error);
        }

        $list.removeClass('dr-loading');
    });

    // modal print click
    $ordersModal.find('.dr-modal-footer .print-button').on('click', function() {
        var $dialog = $ordersModal.find('.dr-modal-dialog');
        $dialog.css('max-width', '100%');
        window.print();
        $dialog.css('max-width', '');
    });

    // Address
    var $addresses = $('#dr-account-page-wrapper .address');
    const $deleteAddressModal = $('#dr-deleteAddressConfirm');
    const $deleteAcceptBtn = $deleteAddressModal.find('.dr-delete-confirm');

    $body.append($deleteAddressModal);

    // change primary address
    $addresses.on('click', function(e) {
        var $this = $(this);

        if ($(e.target).is('.address-edit-btn') || $(e.target).is('.address-add-btn')) {
            if ($(e.target).is('.address-add-btn')) {
                $(e.target).hide();
                $this.find('.address-add-text').hide();
            }

            $this.parent().addClass('expand');
            setTimeout(function(){
                $this.find('.address-edit').slideDown(200, function() {
                    $('html, body').animate({
                        scrollTop: $this.offset().top - 50
                    }, 200);
                });
            }, 200);
        } else if ($(e.target).is('.address-delete-btn')) {
            $deleteAddressModal.find('.dr-delete-confirm').data('id' , $(e.target).data('id'));
            $deleteAddressModal.find('p > strong').text($(e.target).data('nickname'));
            $deleteAddressModal.drModal({
                backdrop: 'static',
                keyboard: false
            });
        } else if ($(e.target).is('.address-cancel-btn')) {
            $this.parent().removeClass('expand');
            $this.removeClass('ajax-error');
            setTimeout(function() {
                $this.find('.address-edit').slideUp(200, function() {
                    $('html, body').animate({
                        scrollTop: $this.offset().top - 50
                    }, 200);

                    $this.find('.address-add-btn').show();
                    $this.find('.address-add-text').show();
                });
            }, 200);
        } else if ($(e.target).closest('.address-edit').length) {

            return; // handled by form submit callback

        } else {
            if ($this.attr('data-primary') || $this.hasClass('address-add-new')) return;
            $addresses.removeAttr('data-primary');
            $this.attr('data-primary', 'Primary');
            saveAddress($this.find('form.dr-panel-edit'));
        }
    });

    $deleteAcceptBtn.on('click', (e) => {
        $('body').addClass('dr-loading');
        DRCommerceApi.deleteShopperAddress($(e.target).data('id'))
            .then(() => {
                location.reload();
            })
            .catch((jqXHR) => {
                $('body').removeClass('dr-loading');
                CheckoutUtils.apiErrorHandler(jqXHR);
            });
    });

    // Certificate
    const $certificateModal = $('#certificate-modal');
    const $companyNameConfirmModal = $('#company-name-confirm');

    $body.append($certificateModal).append($companyNameConfirmModal);

    $('#add-new-cert').on('click', (e) => {
        e.preventDefault();

        $certificateModal.drModal({
            backdrop: 'static',
            keyboard: false
        });
    });

    $('#certificate-modal .dr-modal-footer > button.submit').on('click', (e) => {
        e.preventDefault();
        const $form = $('#account-tem-us-form');
        const accountCompanyName = $('#account-company-name').val();

        $form.addClass('was-validated');

        if ($form[0].checkValidity() === false) {
            return false;
        }

        if (accountCompanyName !== '' && accountCompanyName !== $('#tems-us-company-name').val()) {
            $certificateModal.drModal('hide');
            $companyNameConfirmModal.drModal({
                backdrop: 'static',
                keyboard: false
            });
        } else {
            AccountModule.submitTaxCertificate($form, drgc_params.customerId, $certificateModal);
        }
    });

    $('#certificate-modal .dr-modal-footer > button.cancel, #certificate-modal .dr-modal-header > button.close').on('click', (e) => {
        $('#account-tem-us-form').removeClass('was-validated');
        $('#account-tem-us-form input, #certificate-tax-authority').val('');
        $('#tems-us-error-msg').text('').hide();
    });

    $('#company-name-confirm .dr-modal-footer > button.confirm').on('click', (e) => {
        e.preventDefault();

        $certificateModal.drModal({
            backdrop: 'static',
            keyboard: false
        });
        $companyNameConfirmModal.drModal('hide');

        AccountModule.submitTaxCertificate($('#account-tem-us-form'), drgc_params.customerId, $certificateModal);
    });

    $('#company-name-confirm .dr-modal-footer > button.cancel').on('click', (e) => {
        e.preventDefault();

        $certificateModal.drModal({
            backdrop: 'static',
            keyboard: false
        });
        $companyNameConfirmModal.drModal('hide');
    });

    $('#tems-us-start-date, #tems-us-end-date').on('blur', (e) => {
        const date = $(e.target).val();

        if (date) {
            const dateArr = date.split('-').reverse();
            [dateArr[0], dateArr[1]] = [dateArr[1], dateArr[0]];
            $(e.target).val(dateArr.join('/'));
        }
    });

    // Payment
    $('#dr-account-page-wrapper .payment').on('click', function(e) {
      var $this = $(this);
      if ($(e.target).is('.payment-edit-btn')) {
          $this.parent().addClass('expand');
          setTimeout(function(){
              $this.find('.payment-edit').slideDown(200, function() {
                  $('html, body').animate({
                      scrollTop: $this.offset().top - 50
                  }, 200);
              });
          }, 200);
      } else {
          if ($this.attr('data-primary')) return;
          $('#dr-account-page-wrapper .payment').removeAttr('data-primary');
          $this.attr('data-primary', 'Primary');
          let $form = $this.find('form');
          let payload = {
              'isDefault': true,
              'sourceId': $form.find('input[name="sourceId"]').val(),
              'id'      : $form.find('input[name="id"]').val(),
          };

          updateShopperPayment(payload);
      }
    });

    $('#dr-account-page-wrapper .payment').find('form.dr-panel-edit').on('submit', function(e) {
      e.preventDefault();

      let payload = {
          'nickName': $(this).find('input[name="nickName"]').val(),
          'sourceId': $(this).find('input[name="sourceId"]').val(),
          'id'      : $(this).find('input[name="id"]').val(),
      };

      $(this).find('input[type="submit"]').attr('disabled');
      updateShopperPayment(payload);
    });

    $('#paymentDeleteConfirm .dr-confirm-payment-off').on('click', function() {
      var payment = $body.data('currentPayment');
      deleteShopperPayment(payment.id);
    });

    $('#dr-account-page-wrapper .payment').on('click', '.payment-delete-btn', function(e) {
      e.preventDefault();

      $body.data({
          currentPayment: {
              id: $(this).closest('.payment').find('input[name="id"]').val()
          }
      });

      $body.append($('#paymentDeleteConfirm'));
      $('#paymentDeleteConfirm').drModal({
          backdrop:'static',
          keyboard:false
      });
    });



    function fillAddress() {
        var $this = $(this);
        var target = $this.attr('name');
        $this.closest('.address').find('.' + target).text( $this.val() );
    }

    function updateShopperPayment(payload) {

      $.ajax({
          type: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${drgc_params.accessToken}`
          },
          data: JSON.stringify({'paymentOption': payload}),
          url: 'https://' + drgc_params.domain + '/v1/shoppers/me/payment-options/',
          success: () => {
              location.reload();
          },
          error: (jqXHR) => {
              console.error(jqXHR);
              location.reload();
          }
      });
    }

    function deleteShopperPayment(id) {
      $.ajax({
          type: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${drgc_params.accessToken}`
          },
          url: 'https://' + drgc_params.domain + '/v1/shoppers/me/payment-options/' + id,
          success: () => {
              location.reload();
          },
          error: (jqXHR) => {
              console.error(jqXHR);
              location.reload();
          }
      });
    }


    $addresses.find('input[name="firstName"], input[name="lastName"], input[name="companyName"], input[name="line1"], input[name="line2"], input[name="city"], select[name="countrySubdivision"], input[name="postalCode"], input[name="phoneNumber"]').on('change keyup', fillAddress);

    function saveAddress(form) {
        var $form = $(form);
        const addressObj = {
            address: {
                nickName: $form.find('input[name="nickname"]').val(),
                firstName: $form.find('input[name="firstName"]').val(),
                lastName: $form.find('input[name="lastName"]').val(),
                companyName: $form.find('input[name="companyName"]').val(),
                line1: $form.find('input[name="line1"]').val(),
                line2: $form.find('input[name="line2"]').val(),
                city: $form.find('input[name="city"]').val(),
                countrySubdivision: $form.find('select[name="countrySubdivision"]').val(),
                postalCode: $form.find('input[name="postalCode"]').val(),
                countryName: $form.find('select[name="country"] :selected').text(),
                country: $form.find('select[name="country"]').val(),
                phoneNumber: $form.find('input[name="phoneNumber"]').val(),
                isDefault: false
            }
        };

        if (!$form.is('#dr-new-address-form')) {
            addressObj.address.id = $form.find('input[name="id"]').val();
            addressObj.address.isDefault = !!($form.closest('.address').length && $form.closest('.address').attr('data-primary'));

            if ($form.closest('.expand').length) {
                $form.addClass('dr-loading');
            } else {
                $form.closest('.address-col').addClass('dr-loading');
            }
    
            DRCommerceApi.updateShopperAddress(addressObj)
                .then(() => {
                    location.reload();
                })
                .catch((jqXHR) => {
                    $form.removeClass('dr-loading');
                    $form.closest('.address-col').removeClass('dr-loading');
                    $form.closest('.address').addClass('ajax-error');
                    CheckoutUtils.apiErrorHandler(jqXHR);
                });
        } else {
            $form.addClass('dr-loading');
            DRCommerceApi.saveShopperAddress(addressObj)
                .then(() => {
                    location.reload();
                })
                .catch((jqXHR) => {
                    $form.removeClass('dr-loading');
                    $form.closest('.address').addClass('ajax-error');
                    CheckoutUtils.apiErrorHandler(jqXHR);
                });
        }
    }

    $addresses.find('form.dr-panel-edit').on('submit', function(e) {
        e.preventDefault();
        saveAddress(e.target);
    });

    // Subscriptions
    var $subs = $('#dr-account-page-wrapper .subscription');
    var $subscriptionError = $('#subscriptionError');
    var $subscriptionConfirm = $('#subscriptionConfirm');
    const $autoRenewalPlanTerms = $('#dr-autoRenewalPlanTerms');

    function updateSubscription(data = {}, $toggle) {
        $('body').addClass('dr-loading');
        $.post(drgc_params.ajaxUrl, data, function(response) {
            if (response.success) {
                var $renewalDate = $toggle.closest('.subscription').find('.subscription-dates .nextRenewalDate');

                if ($renewalDate.length) {
                    var renewalText = (data.renewalType === 'Auto') ? $renewalDate.attr('data-on') : $renewalDate.attr('data-off');
                    $renewalDate.find('strong').text(renewalText);
                }
            } else {
                $subscriptionError.drModal('show');
                $toggle.prop('checked', !(data.renewalType === 'Auto'));
            }

            $('body').removeClass('dr-loading');
        });
    }

    $subs.find('.subscription-ar .switch input[type="checkbox"]').on('change', function() {
        var $this = $(this);
        var subID = ($this.closest('.subscription').length && $this.closest('.subscription').attr('data-id')) ? $this.closest('.subscription').attr('data-id') : '';
        var ar = $this.is(':checked') ? 'Auto' : 'Manual';
        const modalId = {
            Auto: '#dr-autoRenewalPlanTerms',
            Manual: '#subscriptionConfirm'
        } 

        $body.data({
            currentToggle: {
                selector: $this,
                subID: subID,
                ar: ar
            }
        });

        $(modalId[ar]).drModal({
            backdrop: 'static',
            keyboard: false
        });
    });
    // subscription confirm click events
    $('button.dr-confirm-ar-off, button.dr-confirm-ar-on').on('click', function() {
        var toggle = $body.data('currentToggle');
        var data = {
            action         : 'drgc_toggle_auto_renewal_ajax',
            nonce          : drgc_params.ajaxNonce,
            subscriptionId : toggle.subID,
            renewalType    : toggle.ar
        };
        updateSubscription(data, toggle.selector);
    });
    // reset toggle if event is canceled
    $('button.dr-confirm-cancel').on('click', function() {
        var toggle = $body.data('currentToggle');
        toggle.selector.prop('checked', !(toggle.ar === 'Auto'));
    });

    $('#list-subscriptions .dr-renew-btn').on('click', (e) => {
        const payload = {
            cart: {
                lineItems: {
                    lineItem: [
                        {
                            quantity: e.target.dataset.renewalQty,
                            product: {
                                id: e.target.dataset.productId
                            },
                            customAttributes: {
                                attribute: [
                                    {
                                        name: 'RenewingSubscriptionID',
                                        value: e.target.dataset.subsId
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        };

        $('body').addClass('dr-loading');
        DRCommerceApi.updateCart({testOrder: drgc_params.testOrder}, payload)
            .then(() => {
                window.location.href = drgc_params.cartUrl;
            })
            .catch((jqXHR) => {
                CheckoutUtils.apiErrorHandler(jqXHR);
                $('body').removeClass('dr-loading');
            });
    });

    $body.append($subscriptionError).append($subscriptionConfirm).append($autoRenewalPlanTerms);

    if ($('#list-subscriptions .subscription').length && $autoRenewalPlanTerms.length) {
        const locale = drgc_params.drLocale || 'en_US';
        const digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey, {
            'locale': locale.split('_').join('-')
        });
        let entityCode = CheckoutUtils.getEntityCode();

        if (entityCode) {
            AccountModule.appendAutoRenewalTerms(digitalriverjs, entityCode, locale);
        } else {
            const subsId = $('#list-subscriptions .subscription').first().data('id');

            DRCommerceApi.getSubsDetails(subsId)
                .then((data) => {
                    const orderId = data.subscription.orders.order[0].uri.split('orders/')[1];
                    return DRCommerceApi.getOrderDetails(orderId);
                })
                .then((data) => {
                    entityCode = data.order.businessEntityCode;
                    AccountModule.appendAutoRenewalTerms(digitalriverjs, entityCode, locale);
                })
                .catch((jqXHR) => {
                    CheckoutUtils.apiErrorHandler(jqXHR);
                });
        }
    }

    // mobile back button
    $('#dr-account-page-wrapper .back').on('click', function() {
        $('.dr-tab-pane').removeClass('active show');
        $('.dr-list-group-item').removeClass('active').attr('aria-selected', 'false');
    });

    // Change Password
    $('#pw-new').on('input', (e) => {
        LoginModule.validatePassword(e);
    });

    $('#pw-current, #pw-new, #pw-confirm').on('input', () => {
        const $form = $('#change-password-form');
        const pw = $form.find('input[type=password]')[0];
        const npw = $form.find('input[type=password]')[1];
        const cpw = $form.find('input[type=password]')[2];

        $form.find('.dr-err-field').text('');
        npw.setCustomValidity(pw.value === npw.value ? localizedText.new_password_error_msg : 
            npw.validationMessage !== localizedText.new_password_error_msg ? npw.validationMessage : '');
        cpw.setCustomValidity(npw.value !== cpw.value ? localizedText.password_confirm_error_msg : '');

        if (npw.validity.valueMissing) {
            $(npw).next('.invalid-feedback').text(localizedText.required_field_msg);
        } else if (npw.validity.customError) {
            $(npw).next('.invalid-feedback').text(npw.validationMessage);
        } else {
            $(npw).next('.invalid-feedback').text('');
        }

        if (cpw.validity.valueMissing) {
            $(cpw).next('.invalid-feedback').text(localizedText.required_field_msg);
        } else if (cpw.validity.customError) {
            $(cpw).next('.invalid-feedback').text(cpw.validationMessage);
        } else {
            $(cpw).next('.invalid-feedback').text('');
        }

        $form.addClass('was-validated');
    });

    $('#change-password-form').on('submit', (e) => {
        e.preventDefault();

        const $form = $(e.target);
        const $error = $form.find('.dr-err-field');

        $form.addClass('was-validated');

        if ($form.data('processing')) return false;
        if (!$form[0].checkValidity()) return false;

        $form.data('processing', true);
        $error.text('');

        const data = {
            action: 'drgc_change_password',
            nonce: drgc_params.ajaxNonce,
            current_password: $('#pw-current').val(),
            new_password: $('#pw-new').val(),
            confirm_new_password: $('#pw-confirm').val()
        };

        $('body').addClass('dr-loading');
        $.post(drgc_params.ajaxUrl, data, (response) => {
            if (!response.success) {
                if (response.data && response.data.errors && response.data.errors.error[0].hasOwnProperty('description')) {
                    $error.text(response.data.errors.error[0].description);
                } else if (Object.prototype.toString.call(response.data) === '[object String]') {
                    $error.text(response.data);
                } else {
                    $error.text(localizedText.undefined_error_msg);
                }

                $error.css('color', 'red');
                sessionStorage.setItem('drgcPwChanged', 'false');
                $('body').removeClass('dr-loading');
            } else {
                sessionStorage.setItem('drgcPwChanged', 'true');
                location.reload();
            }

            $('#pw-current, #pw-new, #pw-confirm').val('').removeClass('is-invalid').removeClass('is-valid');
            $form.data('processing', false).removeClass('was-validated');
        });
    });

    // watch account page active tab to start on the same tab after reload
    $('#dr-account-page-wrapper a[data-toggle="dr-list"]').on('shown.dr.bs.tab', function(e) {
        sessionStorage.drAccountTab = $(e.target).attr('href');

        if ((e.target.id === 'list-password-list') && (sessionStorage.getItem('drgcPwChanged') === 'true')) {
            sessionStorage.setItem('drgcPwChanged', 'false');

            const data = {
                action: 'drgc_logout',
                nonce: drgc_params.ajaxNonce
            };

            $('body').addClass('dr-loading');
            $.post(drgc_params.ajaxUrl, data, (response) => {
                if (response.success) {
                    $('body').removeClass('dr-loading');
                    $('#dr-passwordUpdated').drModal({
                        backdrop: 'static',
                        keyboard: false
                    });
                } else {
                    location.reload();
                }
            });
        }
    });

    $('#dr-passwordUpdated button').on('click', () => {
        $('body').addClass('dr-loading');
        window.location.href = drgc_params.loginUrl;
    });

    if (sessionStorage.drAccountTab && $('#dr-account-page-wrapper a[data-toggle="dr-list"][href="' + sessionStorage.drAccountTab + '"]').length) {
        $('#dr-account-page-wrapper a[data-toggle="dr-list"][href="' + sessionStorage.drAccountTab + '"]').drTab('show');
        $('#nav-tabContent').removeClass('dr-loading');
    } else if (window.matchMedia && window.matchMedia('(min-width:768px)').matches) {
        $('#dr-account-page-wrapper a[data-toggle="dr-list"]').eq(0).drTab('show');
        $('#nav-tabContent').removeClass('dr-loading');
    }

    //floating labels
    FloatLabel.init();
    AccountModule.initRightOfWithdrawalLink();
});

export default AccountModule;
