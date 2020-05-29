/* global drgc_params, iFrameResize */
/* eslint-disable no-alert, no-console */
import CheckoutUtils from './checkout-utils';
import DRCommerceApi from './commerce-api';

const CartModule = (($) => {
  let hasPhysicalProduct = false;

  const hasPhysicalProductInLineItems = (lineItems) => {
    return lineItems.some(lineItem => lineItem.product.productType === 'PHYSICAL');
  };

  const initAutoRenewalTerms = (digitalriverjs) => {
    const $checkoutBtn = $('a.dr-summary__proceed-checkout');
    const $termsCheckbox = $('#autoRenewOptedInOnCheckout');

    if (sessionStorage.getItem('isTermsChecked')) {
      const isTermsChecked = sessionStorage.getItem('isTermsChecked') === 'true' ? true : false;
      $termsCheckbox.prop('checked', isTermsChecked);
    }

    $termsCheckbox.change((e) => {
      if ($(e.target).is(':checked')) {
        $('#dr-TAndC-err-msg').text('').hide();
        $checkoutBtn.prop('href', drgc_params.checkoutUrl);
        sessionStorage.setItem('isTermsChecked', 'true');
      } else {
        $checkoutBtn.prop('href', '#dr-autoRenewTermsContainer');
        sessionStorage.setItem('isTermsChecked', 'false');
      }
    });

    $checkoutBtn.click(() => {
      if (!$termsCheckbox.is(':checked')) {
        $('#dr-TAndC-err-msg').text(drgc_params.translations.required_tandc_msg).show();
      }
    });

    $termsCheckbox.trigger('change');

    appendAutoRenewalTerms(digitalriverjs);
  };

  const appendAutoRenewalTerms = (digitalriverjs) => {
    const entityCode = CheckoutUtils.getEntityCode();
    const locale = drgc_params.drLocale || 'en_US';
    const compliance = CheckoutUtils.getCompliance(digitalriverjs, entityCode, locale);

    if (Object.keys(compliance).length) {
      const terms = compliance.autorenewalPlanTerms.localizedText;

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

    $lineItem.addClass('dr-loading');
    $('.dr-summary').addClass('dr-loading');
    DRCommerceApi.updateLineItem(lineItemID, { quantity: $qty.val() })
      .then((res) => {
        renderSingleLineItem(res.lineItem.pricing, $lineItem);
        $lineItem.removeClass('dr-loading');
      })
      .then(() => DRCommerceApi.getCart({ expand: 'all' }))
      .then((res) => {
        renderSummary(res.cart.pricing, hasPhysicalProduct);
        $('.dr-summary').removeClass('dr-loading');
      })
      .catch((jqXHR) => {
        CheckoutUtils.apiErrorHandler(jqXHR);
        $lineItem.removeClass('dr-loading');
        $('.dr-summary').removeClass('dr-loading');
      });
  };

  const renderOffers = (lineItems) => {
    lineItems.forEach((lineItem, idx) => {
      // Candy Rack (should be inserted after specific line item)
      DRCommerceApi.getOffersByPoP('CandyRack_ShoppingCart', { expand: 'all' }, lineItem.product.id)
        .then((res) => {
          const offers = res.offers.offer;
          if (offers && offers.length) {
            offers.forEach((offer) => {
              renderCandyRackOffer(offer, lineItems[idx].product.id);
            });
          }
        })
        .catch(jqXHR => CheckoutUtils.apiErrorHandler(jqXHR));

      // Bundle Tight (should disable edit buttons of specific line item)
      DRCommerceApi.getOffersByProduct(lineItem.product.id, { expand: 'all' })
        .then((res) => {
          const offers = res.offers.offer;
          if (offers && offers.length) {
            offers.forEach((offer) => {
              disableEditBtnsForBundle(offer);
            });
          }
        })
        .catch(jqXHR => CheckoutUtils.apiErrorHandler(jqXHR));
    });

    // Banner (should be appended after all the line items)
    DRCommerceApi.getOffersByPoP('Banner_ShoppingCartLocal', { expand: 'all' })
      .then((res) => {
        const offers = res.offers.offer;
          if (offers && offers.length) {
            offers.forEach((offer) => {
              renderBannerOffer(offer);
            });
          }
      })
      .catch(jqXHR => CheckoutUtils.apiErrorHandler(jqXHR));
  };

  const renderCandyRackOffer = (offer, driverProductID) => {
    const productOffers = offer.productOffers.productOffer;
    const promoText = offer.salesPitch.length ? offer.salesPitch[0] : '';

    if (productOffers && productOffers.length) {
      productOffers.forEach((productOffer) => {
        const salePrice = productOffer.pricing.formattedSalePriceWithQuantity;
        const listPrice = productOffer.pricing.formattedListPriceWithQuantity;
        const purchasable = productOffer.product.inventoryStatus.productIsInStock === 'true';
        const buyBtnText = purchasable ?
          (offer.type === 'Up-sell') ? drgc_params.translations.upgrade_label : drgc_params.translations.add_label :
          drgc_params.translations.out_of_stock;
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
                  <span>${drgc_params.translations.product_label} </span>
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

  const disableEditBtnsForBundle = (offer) => {
    const hasBundleTight = (offer.type === 'Bundling' && offer.policyName === 'Tight Bundle Policy');
    const productOffers = offer.productOffers.productOffer;

    if (hasBundleTight && productOffers && productOffers.length) {
      productOffers.forEach((productOffer) => {
        $(`.dr-product-line-item[data-product-id=${productOffer.product.id}]`)
          .find('.remove-icon, .dr-pd-cart-qty-minus, .dr-pd-cart-qty-plus')
          .css({ opacity: 0, 'pointer-events': 'none' });
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

  const renderLineItems = (lineItems) => {
    const min = 1;
    const max = 999;
    const promises = [];
    const lineItemHTMLArr = [];

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
                <div class="product-sku">
                  <span>${drgc_params.translations.product_label} </span>
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
    });

    return Promise.all(promises).then(() => {
      $('.dr-cart__products').html(lineItemHTMLArr.join(''));
    });
  };

  const renderSummary = (pricing, hasPhysicalProduct) => {
    const $discountRow = $('.dr-summary__discount');
    const $shippingRow = $('.dr-summary__shipping');
    const $subtotalRow = $('.dr-summary__discounted-subtotal');

    $discountRow.find('.discount-value').text(`-${pricing.formattedDiscount}`);
    $shippingRow.find('.shipping-value').text(
      pricing.shippingAndHandling.value === 0 ?
      drgc_params.translations.free_label :
      pricing.formattedShippingAndHandling
    );
    $subtotalRow.find('.discounted-subtotal-value').text(pricing.formattedSubtotalWithDiscount);

    if (pricing.discount.value) $discountRow.show();
    else $discountRow.hide();

    if (hasPhysicalProduct) $shippingRow.show();
    else $shippingRow.hide();

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
            renderSummary(res.cart.pricing, hasPhysicalProduct)
          ]);
        } else {
          $('.dr-cart__products').text(drgc_params.translations.empty_cart_msg);
          $('#cart-estimate').remove();
          return new Promise(resolve => resolve());
        }
      })
      .then(() => {
        if (lineItems && lineItems.length) renderOffers(lineItems);
        $('.dr-cart__content').removeClass('dr-loading'); // Main cart is ready, loading can be ended
      })
      .catch((jqXHR) => {
        CheckoutUtils.apiErrorHandler(jqXHR);
        $('.dr-cart__content').removeClass('dr-loading');
      });
  };

  return {
    hasPhysicalProduct,
    hasPhysicalProductInLineItems,
    initAutoRenewalTerms,
    appendAutoRenewalTerms,
    setProductQty,
    renderOffers,
    renderCandyRackOffer,
    renderBannerOffer,
    disableEditBtnsForBundle,
    renderSingleLineItem,
    renderLineItems,
    renderSummary,
    fetchFreshCart
  };
})(jQuery);

jQuery(document).ready(($) => {
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

  $('body').on('click', '.dr-buy-candyRack', (e) => {
    e.preventDefault();
    const $this = $(e.target);
    const buyUri = $this.attr('data-buy-uri');

    $('.dr-cart__content').addClass('dr-loading');
    DRCommerceApi.postByUrl(`${buyUri}&testOrder=${drgc_params.testOrder}`)
      .then(() => CartModule.fetchFreshCart())
      .catch((jqXHR) => {
        CheckoutUtils.apiErrorHandler(jqXHR);
        $('.dr-cart__content').removeClass('dr-loading');
      });
  });

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
      $('#dr-promo-code-err-field').text(drgc_params.translations.invalid_promo_code_msg).show();
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

    const digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey);
    CheckoutUtils.applyLegalLinks(digitalriverjs);

    if ($('#dr-autoRenewTermsContainer').length) {
      CartModule.initAutoRenewalTerms(digitalriverjs);
    }
  }
});

export default CartModule;
