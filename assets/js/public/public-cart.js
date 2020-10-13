/* global drgc_params, iFrameResize */
/* eslint-disable no-alert, no-console */
import CheckoutUtils from './checkout-utils';
import DRCommerceApi from './commerce-api';

const CartModule = (($) => {
  const localizedText = drgc_params.translations;
  let hasPhysicalProduct = false;

  const hasPhysicalProductInLineItems = (lineItems) => {
    return lineItems.some(lineItem => lineItem.product.productType === 'PHYSICAL');
  };

  const initAutoRenewalTerms = (digitalriverjs, locale) => {
    const $checkoutBtn = $('#dr-checkout-btn');
    const $termsCheckbox = $('#autoRenewOptedInOnCheckout');

    $termsCheckbox.change((e) => {
      const isChecked = $(e.target).is(':checked');
      const href = isChecked ? drgc_params.checkoutUrl : '#dr-autoRenewTermsContainer';

      $checkoutBtn.prop('href', href);
      if (isChecked) $('#dr-TAndC-err-msg').text('').hide();

      const cartPayload = {
        cart: {
          customAttributes: {
            attribute: [
              {
                name: 'autoRenewOptedInOnCheckout',
                value: isChecked
              }
            ]
          }
        }
      };

      DRCommerceApi.updateCart({}, cartPayload).catch(jqXHR => CheckoutUtils.apiErrorHandler(jqXHR));
    });

    $checkoutBtn.click((e) => {
      if (!$termsCheckbox.is(':checked')) {
        $('#dr-TAndC-err-msg').text(localizedText.required_tandc_msg).show();
        $(e.target).removeClass('sending');
      }
    });

    appendAutoRenewalTerms(digitalriverjs, locale);
  };

  const appendAutoRenewalTerms = (digitalriverjs, locale) => {
    const entityCode = CheckoutUtils.getEntityCode();
    const terms = CheckoutUtils.getLocalizedAutoRenewalTerms(digitalriverjs, entityCode, locale);

    if (terms) {
      $('#dr-optInAutoRenew > .dr-optInAutoRenewTerms > p').append(terms);
      $('#dr-autoRenewTermsContainer').show();
    }
  };

  const setProductQty = (e) => {
    const $this = $(e.target);
    const $lineItem = $this.closest('.dr-product');
    const lineItemID = $lineItem.data('line-item-id');
    const $qty = $this.siblings('.product-qty-number:first');
    const qty = parseInt($qty.val(), 10);
    const max = parseInt($qty.attr('max'), 10);
    const min = parseInt($qty.attr('min'), 10);
    const step = parseInt($qty.attr('step'), 10);

    if ($this.hasClass('disabled') || !lineItemID) return;
    if ($(e.currentTarget).is('.dr-pd-cart-qty-plus')) {
      if (qty < max) $qty.val(qty + step);
    } else if ($(e.currentTarget).is('.dr-pd-cart-qty-minus')) {
      if (qty > min) $qty.val(qty - step);
    }

    $('.dr-cart__content').addClass('dr-loading');
    DRCommerceApi.updateLineItem(lineItemID, { quantity: $qty.val() })
      .then((res) => {
        renderSingleLineItem(res.lineItem.pricing, $lineItem);
        CartModule.fetchFreshCart();
      })
      .catch((jqXHR) => {
        CheckoutUtils.apiErrorHandler(jqXHR);
        $('.dr-cart__content').removeClass('dr-loading');
      });
  };

  const getOffersByPoP = (type, productId = '') => {
    const data = {
      action: 'drgc_get_offers_by_pop',
      nonce: drgc_params.ajaxNonce,
      popType: type,
      productId: productId
    };

    $.post(drgc_params.ajaxUrl, data, (response) => {
      const res = response.data;

      if (response.success) {
        if (res.offers) {
          const offers = res.offers.offer || '';

          if (offers && offers.length) {
            offers.forEach((offer) => {
              switch (type) {
                case 'CandyRack_ShoppingCart':
                  renderCandyRackOffer(offer, productId);
                  break;
                case 'Banner_ShoppingCartLocal':
                  renderBannerOffer(offer);
                  break;
              }
            });
          }
        } else if (res.errors) {
          drToast.displayMessage(res.errors.error[0], 'error');
        }
      } else {
        drToast.displayMessage(localizedText.undefined_error_msg, 'error');
      }
    });
  };

  const renderOffers = (lineItems) => {
    lineItems.forEach((lineItem) => {
      // Candy Rack (should be inserted after specific line item)
      getOffersByPoP('CandyRack_ShoppingCart', lineItem.product.id);

      // Bundle Tight (should disable edit buttons of specific line item)
      DRCommerceApi.getOffersByProduct(lineItem.product.id, { expand: 'all' })
        .then((res) => {
          const offers = res.offers.offer;
          if (offers && offers.length) {
            offers.forEach((offer) => {
              disableEditBtnsForBundle(offer, lineItem.product.id);
            });
          }
        })
        .catch(jqXHR => CheckoutUtils.apiErrorHandler(jqXHR));
    });

    // Banner (should be appended after all the line items)
    getOffersByPoP('Banner_ShoppingCartLocal');
  };

  const renderCandyRackOffer = (offer, driverProductID) => {
    const offerType = offer.type;
    const productOffers = offer.productOffers.productOffer;
    const promoText = offer.salesPitch.length ? offer.salesPitch[0] : '';
    const declinedProductIds = sessionStorage.getItem('drgc_upsell_decline') ? sessionStorage.getItem('drgc_upsell_decline') : '';
    const upsellDeclineArr = declinedProductIds ? declinedProductIds.split(',') : [];

    if (productOffers && productOffers.length) {
      productOffers.forEach((productOffer) => {
        const salePrice = productOffer.pricing.formattedSalePriceWithQuantity;
        const listPrice = productOffer.pricing.formattedListPriceWithQuantity;
        const purchasable = productOffer.product.inventoryStatus.productIsInStock === 'true';
        const buyBtnText = purchasable ?
          (offerType === 'Up-sell') ? localizedText.upgrade_label : localizedText.add_label :
          localizedText.out_of_stock;
        const productSalesPitch = productOffer.salesPitch || '';
        const shortDiscription = productOffer.product.shortDiscription || '';

        if ((offerType === 'Up-sell') && (upsellDeclineArr.indexOf(driverProductID.toString()) === -1)) {
          const declineText = localizedText.upsell_decline_label;
          const upsellProductHtml = `
            <div class="modal dr-upsellProduct-modal" data-product-id="${productOffer.product.id}" data-parent-product-id="${driverProductID}">
              <div class=" modal-dialog">
                <div class="dr-upsellProduct modal-content">
                  <button class="dr-modal-close dr-modal-decline" data-parent-product-id="${driverProductID}"></button>
                  <div class="dr-product-content">
                    <div class="dr-product__info">
                      <div class="dr-offer-header">${promoText}</div>
                      <div class="dr-offer-content">${productSalesPitch}</div>
                      <button type="button" class="dr-btn dr-buy-candyRack dr-buy-${buyBtnText}" data-buy-uri="${productOffer.addProductToCart.uri}">${buyBtnText}</button>
                      <button type="button" class="dr-nothanks dr-modal-decline" data-parent-product-id="${driverProductID}">${declineText}</button>
                    </div>
                  </div>
                  <div class="dr-product__price">
                    <img src="${productOffer.product.thumbnailImage}" class="dr-upsellProduct__img"/>
                    <div class="product-name">${productOffer.product.displayName}</div>
                    <div class="product-short-desc">${shortDiscription}</div>
                    <span class="sale-price">${salePrice}</span>
                    <span class="regular-price dr-strike-price ${salePrice === listPrice ? 'd-none' : ''}">${listPrice}</span>
                  </div>
                </div>
              </div>
            </div>`;

          $('body').append(upsellProductHtml).addClass('modal-open').addClass('drgc-wrapper');
        } else if (offerType !== 'Up-sell') {
          const html = `
            <div class="dr-product dr-candyRackProduct" data-product-id="${productOffer.product.id}" data-driver-product-id="${driverProductID}">
              <div class="dr-product-content">
                <img src="${productOffer.product.thumbnailImage}" class="dr-candyRackProduct__img"/>
                <div class="dr-product__info">
                  <div class="product-color">
                    <span style="background-color: yellow;">${promoText}</span>
                  </div>
                  ${productOffer.product.displayName}
                  <div class="product-sku">
                    <span>${localizedText.product_label} </span>
                    <span>#${productOffer.product.id}</span>
                  </div>
                </div>
              </div>
              <div class="dr-product__price">
                <button type="button" class="dr-btn dr-buy-candyRack"
                  data-buy-uri="${productOffer.addProductToCart.uri}"
                  ${purchasable ? '' : 'disabled="disabled"'}>${buyBtnText}</button>
                <span class="sale-price">${salePrice}</span>
                <span class="regular-price dr-strike-price ${salePrice === listPrice ? 'd-none' : ''}">${listPrice}</span>
              </div>
            </div>`;

          if (!$(`.dr-product-line-item[data-product-id=${productOffer.product.id}]`).length) {
            $(html).insertAfter(`.dr-product-line-item[data-product-id=${driverProductID}]`);
          }
        }
      });
    }
  };

  const renderBannerOffer = (offer) => {
    const html = `
      <div class="dr-banner">
        <div class="dr-banner__content">${offer.salesPitch[0]}</div>
        <div class="dr-banner__img"><img src="${offer.image}"></div>
      </div>`;
    $('.dr-cart__products').append(html);
  };

  const disableEditBtnsForBundle = (offer, productID) => {
    const hasBundleTight = (offer.type === 'Bundling' && offer.policyName === 'Tight Bundle Policy');
    const productOffers = offer.productOffers.productOffer;

    if (hasBundleTight && productOffers && productOffers.length) {
      productOffers.forEach((productOffer) => {
        if (productOffer.product.id !== productID) { // Hide action buttons only when it's triggered by parent product
          $(`.dr-product-line-item[data-product-id=${productOffer.product.id}]`)
            .find('.remove-icon, .dr-pd-cart-qty-minus, .dr-pd-cart-qty-plus')
            .css({ opacity: 0, 'pointer-events': 'none' });
        }
      });
    }
  };

  const renderSingleLineItem = (pricing, $lineItem) => {
    const { formattedListPriceWithQuantity, formattedSalePriceWithQuantity } = pricing;
    const $qty = $lineItem.find('.product-qty-number');
    const qty = parseInt($qty.val(), 10);
    const max = parseInt($qty.attr('max'), 10);
    const min = parseInt($qty.attr('min'), 10);
    $lineItem.find('.sale-price').text(formattedSalePriceWithQuantity);
    $lineItem.find('.regular-price').text(formattedListPriceWithQuantity);
    $lineItem.find('.dr-pd-cart-qty-minus').toggleClass('disabled', qty <= min);
    $lineItem.find('.dr-pd-cart-qty-plus').toggleClass('disabled', qty >= max);
  };

  const renderLineItems = async (lineItems) => {
    const min = 1;
    const max = 999;
    const promises = [];
    const lineItemHTMLArr = [];
    let hasAutoRenewal = false;

    lineItems.forEach((lineItem, idx) => {
      const parentProductID = lineItem.product.parentProduct ? lineItem.product.parentProduct.id : lineItem.product.id;
      const salePrice = lineItem.pricing.formattedSalePriceWithQuantity;
      const listPrice = lineItem.pricing.formattedListPriceWithQuantity;
      const promise = CheckoutUtils.getPermalink(parentProductID).then((permalink) => {
        const lineItemHTML = `
          <div data-line-item-id="${lineItem.id}" class="dr-product dr-product-line-item" data-product-id="${lineItem.product.id}" data-sort="${idx}">
            <div class="dr-product-content">
              <div class="dr-product__img" style="background-image: url(${lineItem.product.thumbnailImage})"></div>
              <div class="dr-product__info">
                <a class="product-name" href="${permalink}?locale=${drgc_params.drLocale}">${lineItem.product.displayName}</a>
                <div class="product-short-description">
                  <span>${drgc_params.displayShortDescription === 'true' && lineItem.product.shortDescription ? lineItem.product.shortDescription : ''}</span>
                </div>
                <div class="product-sku">
                  <span>${localizedText.product_label} </span>
                  <span>#${lineItem.product.id}</span>
                </div>
                <div class="product-qty">
                  <span class="qty-text">Qty ${lineItem.quantity}</span>
                  <span class="dr-pd-cart-qty-minus value-button-decrease ${lineItem.quantity <= min ? 'disabled' : ''}"></span>
                  <input type="number" class="product-qty-number" step="1" min="${min}" max="${max}" value="${lineItem.quantity}" maxlength="5" size="2" pattern="[0-9]*" inputmode="numeric" readonly="true">
                  <span class="dr-pd-cart-qty-plus value-button-increase ${lineItem.quantity >= max ? 'disabled' : ''}"></span>
                </div>
              </div>
            </div>
            <div class="dr-product__price">
              <button class="dr-prd-del remove-icon"></button>
              <span class="sale-price">${salePrice}</span>
              <span class="regular-price ${salePrice === listPrice ? 'd-none' : ''}">${listPrice}</span>
            </div>
          </div>`;
          lineItemHTMLArr[idx] = lineItemHTML; // Insert item to specific index to keep sequence asynchronously
      });
      promises.push(promise);

      for (const attr of lineItem.product.customAttributes.attribute) {
        if ((attr.name === 'isAutomatic') && (attr.value === 'true')) {
          hasAutoRenewal = true;
          break;
        }
      }
    });

    if (!hasAutoRenewal) $('.dr-cart__auto-renewal-terms').remove();

    return Promise.all(promises).then(() => {
      $('.dr-cart__products').html(lineItemHTMLArr.join(''));
    });
  };

  const renderSummary = (cart, hasPhysicalProduct) => {
    const lineItems = cart.lineItems.lineItem;
    const pricing = cart.pricing;
    const $taxRow = $('.dr-summary__tax');
    const $shippingTaxRow = $('.dr-summary__shipping-tax');
    const $discountRow = $('.dr-summary__discount');
    const $shippingRow = $('.dr-summary__shipping');
    const $subtotalRow = $('.dr-summary__subtotal');
    const $totalRow = $('.dr-summary__total');
    const newPricing = CheckoutUtils.getSeparatedPricing(lineItems, pricing, drgc_params.isTaxInclusive === 'true');

    $discountRow.find('.discount-value').text(`-${pricing.formattedDiscount}`);
    $taxRow.find('.tax-value').text(newPricing.formattedProductTax);
    $shippingTaxRow.find('.shipping-tax-value').text(newPricing.formattedShippingTax);
    $shippingRow.find('.shipping-value').text(
      pricing.shippingAndHandling.value === 0 ?
      drgc_params.translations.free_label :
      newPricing.formattedShippingAndHandling
    );
    $subtotalRow.find('.subtotal-value').text(newPricing.formattedSubtotal);
    $totalRow.find('.total-value').text(pricing.formattedOrderTotal);

    if (pricing.discount.value) $discountRow.show();
    else $discountRow.hide();

    if (hasPhysicalProduct) {
      $shippingRow.show();
      $shippingTaxRow.show();
    } else {
      $shippingRow.hide();
      $shippingTaxRow.hide();
    }

    return new Promise(resolve => resolve());
  };

  const fetchFreshCart = () => {
    let lineItems = [];

    $('.dr-cart__content').addClass('dr-loading');
    DRCommerceApi.getCart({expand: 'all'})
      .then((res) => {
        lineItems = res.cart.lineItems.lineItem;

        if (lineItems && lineItems.length) {
          hasPhysicalProduct = hasPhysicalProductInLineItems(lineItems);
          return Promise.all([
            renderLineItems(lineItems),
            renderSummary(res.cart, hasPhysicalProduct)
          ]);
        } else {
          if (sessionStorage.getItem('drgc_upsell_decline')) sessionStorage.removeItem('drgc_upsell_decline');
          $('.dr-cart__auto-renewal-terms').remove();
          $('.dr-cart__products').text(localizedText.empty_cart_msg);
          $('#dr-checkout-btn').remove();
          $('#cart-estimate').remove();
          $('.dr-cart-wrapper__content > .order-number').remove();
          return new Promise(resolve => resolve());
        }
      })
      .then(() => {
        if (lineItems && lineItems.length) {
          if (CheckoutUtils.isSubsAddedToCart(lineItems)) {
            const $termsCheckbox = $('#autoRenewOptedInOnCheckout');
            const href = ($termsCheckbox.length && !$termsCheckbox.prop('checked')) ? '#dr-autoRenewTermsContainer' : 
              (drgc_params.isLogin !== 'true') ? drgc_params.loginUrl : drgc_params.checkoutUrl;

            $('#dr-checkout-btn').prop('href', href);
          }

          renderOffers(lineItems);
        }

        $('.dr-cart__content').removeClass('dr-loading'); // Main cart is ready, loading can be ended
      })
      .catch((jqXHR) => {
        CheckoutUtils.apiErrorHandler(jqXHR);
        $('.dr-cart__content').removeClass('dr-loading');
      });
  };

  const updateUpsellCookie = (id, isDeclined = false) => {
    const productId = id.toString();
    const declinedProductIds = sessionStorage.getItem('drgc_upsell_decline') ? sessionStorage.getItem('drgc_upsell_decline') : '';
    let upsellDeclineArr = declinedProductIds ? declinedProductIds.split(',') : [];

    if ((upsellDeclineArr.indexOf(productId) === -1) && isDeclined) {
      upsellDeclineArr.push(productId);
    } else {
      upsellDeclineArr = upsellDeclineArr.filter(item => item !== productId);
    }

    sessionStorage.setItem('drgc_upsell_decline', upsellDeclineArr.join(','));
  };

  return {
    hasPhysicalProduct,
    hasPhysicalProductInLineItems,
    initAutoRenewalTerms,
    appendAutoRenewalTerms,
    setProductQty,
    getOffersByPoP,
    renderOffers,
    renderCandyRackOffer,
    renderBannerOffer,
    disableEditBtnsForBundle,
    renderSingleLineItem,
    renderLineItems,
    renderSummary,
    fetchFreshCart,
    updateUpsellCookie
  };
})(jQuery);

jQuery(document).ready(($) => {
  const drLocale = drgc_params.drLocale || 'en_US';
  const localizedText = drgc_params.translations;
  // Very basic throttle function, avoid too many calls within a short period
  const throttle = (func, limit) => {
    let inThrottle;

    return function() {
      const args = arguments;
      const context = this;

      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  };

  $('body').on('click', 'span.dr-pd-cart-qty-plus, span.dr-pd-cart-qty-minus', throttle(CartModule.setProductQty, 200));

  $('body').on('click', '.dr-prd-del', (e) => {
    e.preventDefault();
    const $this = $(e.target);
    const $lineItem = $this.closest('.dr-product');
    const lineItemID = $lineItem.data('line-item-id');
    const productId = $lineItem.data('product-id');

    CartModule.updateUpsellCookie(productId, false);

    $('.dr-cart__content').addClass('dr-loading');
    DRCommerceApi.removeLineItem(lineItemID)
      .then(() => {
        $lineItem.remove();
        CartModule.fetchFreshCart();
      })
      .catch((jqXHR) => {
        CheckoutUtils.apiErrorHandler(jqXHR);
        $('.dr-cart__content').removeClass('dr-loading');
      });
  });

  $('body').on('click', '.dr-modal-decline', (e) => {
    e.preventDefault();
    const $this = $(e.target);
    const productId = $this.data('parent-product-id');
   
    CartModule.updateUpsellCookie(productId, true);
    $('.dr-upsellProduct-modal[data-parent-product-id="' + productId + '"]').remove();
    $('body').removeClass('modal-open').removeClass('drgc-wrapper');
  });

  $('body').on('click', '.dr-buy-candyRack', (e) => {
    e.preventDefault();
    const $this = $(e.target);
    const buyUri = $this.attr('data-buy-uri');

    if ($this.hasClass('dr-buy-Upgrade')) {
      $('body').removeClass('modal-open').removeClass('drgc-wrapper');
    }

    $('.dr-cart__content').addClass('dr-loading');
    DRCommerceApi.postByUrl(`${buyUri}&testOrder=${drgc_params.testOrder}`)
      .then(() => CartModule.fetchFreshCart())
      .catch((jqXHR) => {
        CheckoutUtils.apiErrorHandler(jqXHR);
        $('.dr-cart__content').removeClass('dr-loading');
      });
  });

  // Old currency selector, will be deprecated after it's not used by any theme
  $('body').on('change', '.dr-currency-select', (e) => {
    e.preventDefault();
    const $this = $(e.target);
    const queryParams = {
      currency: e.target.value,
      locale: $this.find('option:selected').data('locale')
    };

    if ($('.dr-cart__content').length) $('.dr-cart__content').addClass('dr-loading');
    else $('body').addClass('dr-loading');
    DRCommerceApi.updateShopper(queryParams)
      .then(() => location.reload(true))
      .catch((jqXHR) => {
        CheckoutUtils.apiErrorHandler(jqXHR);
        $('.dr-cart__content, body').removeClass('dr-loading');
      });
  });

  $('.promo-code-toggle').click(() => {
    $('.promo-code-wrapper').toggle();
  });

  $('#apply-promo-code-btn').click((e) => {
    const $this = $(e.target);
    const promoCode = $('#promo-code').val();

    if (!$.trim(promoCode)) {
      $('#dr-promo-code-err-field').text(localizedText.invalid_promo_code_msg).show();
      return;
    }

    $this.addClass('sending').blur();
    DRCommerceApi.updateCart({ promoCode }).then(() => {
      $this.removeClass('sending');
      $('#dr-promo-code-err-field').text('').hide();
      CartModule.fetchFreshCart();
    }).catch((jqXHR) => {
      $this.removeClass('sending');
      if (jqXHR.responseJSON.errors) {
        const errMsgs = jqXHR.responseJSON.errors.error.map((err) => {
          return err.description;
        });
        $('#dr-promo-code-err-field').html(errMsgs.join('<br/>')).show();
      }
    });
  });

  $('#promo-code').keypress((e) => {
    if (e.which == 13) {
      e.preventDefault();
      $('#apply-promo-code-btn').trigger('click');
    }
  });

  $('.dr-summary__proceed-checkout').click((e) => {
    $(e.target).addClass('sending');
  });

  if ($('#dr-cart-page-wrapper').length) {
    CartModule.fetchFreshCart();

    const digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey, {
      'locale': drLocale.split('_').join('-')
    });

    CheckoutUtils.applyLegalLinks(digitalriverjs);

    if ($('#dr-autoRenewTermsContainer').length) {
      CartModule.initAutoRenewalTerms(digitalriverjs, drLocale);
      $('#autoRenewOptedInOnCheckout').prop('checked', false).trigger('change');
    }
  }
});

export default CartModule;
