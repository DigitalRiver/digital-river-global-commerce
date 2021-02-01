/* global drgc_params, iFrameResize */
/* eslint-disable no-alert, no-console */
import DRCommerceApi from './commerce-api';
import CheckoutUtils from './checkout-utils';

const PdpModule = (($) => {
    const localizedText = drgc_params.translations;

    const bindVariationPrice = (pricing, $target) => {
        if (!pricing.listPrice || !pricing.salePriceWithQuantity) return;
        if (pricing.listPrice.value > pricing.salePriceWithQuantity.value) {
            $target.data('old-price', pricing.formattedListPrice);
            $target.data('price', pricing.formattedSalePriceWithQuantity);
        } else {
            $target.data('price', pricing.formattedSalePriceWithQuantity);
        }
    };

    const bindVariationInventoryStatus = (purchasable, $target) => {
        $target.data('purchasable', purchasable);
    };

    const selectVariation = ($target) => {
        if ($target.is('input[type=radio]')) $target.prop('checked', true).trigger('click');
        else $target.prop('selected', true).trigger('change');
    };

    const displayRealTimePricing = (pricing, option, $target) => {
        const displayIncl = drgc_params.taxDisplay === 'INCL';
        if (!pricing.listPrice || !pricing.salePriceWithQuantity) {
            $target.text(''); // no pricing data
            return;
        }
        if (pricing.listPrice.value > pricing.salePriceWithQuantity.value) {
            $target.html(`
                <${option.listPriceDiv} class="${option.listPriceClass()}">${pricing.formattedListPrice}</${option.listPriceDiv}>
                <${option.salePriceDiv} class="${option.salePriceClass()}">${pricing.formattedSalePriceWithQuantity + CheckoutUtils.getTaxSuffixLabel(displayIncl)}</${option.salePriceDiv}>
            `);
        } else {
            $target.html(`
                <${option.priceDiv} class="${option.priceClass()}">${pricing.formattedSalePriceWithQuantity + CheckoutUtils.getTaxSuffixLabel(displayIncl)}</${option.priceDiv}>
            `);
        }
    };

    const displayRealTimeBuyBtn = (purchasable, isRedirectBuyBtn, $target) => {
        const isOutOfStock = purchasable === 'false';

        $target
            .prop('disabled', isOutOfStock)
            .text(isOutOfStock ? localizedText.out_of_stock :
                isRedirectBuyBtn ? localizedText.buy_now : localizedText.add_to_cart)
            .addClass(isRedirectBuyBtn ? 'dr-redirect-buy-btn' : '');
    };

    const displayVarProductInfo = (product) => {
      $('.dr-pd-title').text(product.displayName);
      $('.dr-pd-short-desc').html(product.shortDescription);
      $('.dr-pd-long-desc').html(product.longDescription);
    };

    const updateProductItem = ($target, product) => {
        const $loadingIcon = $target.find('.dr-loading');
        const $productInfo = $target.find('.dr-pd-info');
        const $title = $target.find('.dr-pd-item-title');
        const $thumbnail = $target.find('.dr-pd-item-thumbnail > img');
        const thumbnail = product.thumbnailImage || '';

        $title.text(product.displayName);
        $thumbnail.attr('src', thumbnail).attr('alt', product.displayName);
        $loadingIcon.hide();
        $productInfo.show();
    };

    return {
        bindVariationPrice,
        bindVariationInventoryStatus,
        selectVariation,
        displayRealTimePricing,
        displayRealTimeBuyBtn,
        displayVarProductInfo,
        updateProductItem
    };
})(jQuery);

jQuery(document).ready(($) => {
    const localizedText = drgc_params.translations;
    let lineItems = [];

    function toggleMiniCartDisplay() {
        const $miniCartDisplay = $('.dr-minicart-display');
        if ($miniCartDisplay.is(':visible')) {
            $miniCartDisplay.fadeOut(200);
        } else {
            $miniCartDisplay.fadeIn(200);
        }
    }

    function openMiniCartDisplay() {
        const $miniCartDisplay = $('.dr-minicart-display');
        if (! $miniCartDisplay.is(':visible')) {
            $miniCartDisplay.fadeIn(200);
        }
    }

    function displayMiniCart(cart) {
        const $display = $('.dr-minicart-display');
        const $body = $('<div class="dr-minicart-body"></div>');
        const $footer = $('<div class="dr-minicart-footer"></div>');
        const taxInclusive = cart.taxInclusive === 'true';

        lineItems = (cart.lineItems && cart.lineItems.lineItem) ? cart.lineItems.lineItem : [];

        $('.dr-minicart-count').text(cart.totalItemsInCart);
        $('.dr-minicart-header').siblings().remove();
        if ($('section.dr-login-sections__section.logged-in').length && cart.totalItemsInCart == 0) {
            $('section.dr-login-sections__section.logged-in > div').hide();
        }

        if (!lineItems.length) {
            const emptyMsg = `<p class="dr-minicart-empty-msg">${localizedText.empty_cart_msg}</p>`;
            $body.append(emptyMsg);
            $display.append($body);

            if (sessionStorage.getItem('drgcTokenRenewed')) sessionStorage.removeItem('drgcTokenRenewed');
        } else {
            let miniCartLineItems = '<ul class="dr-minicart-list">';
            const displayIncl = taxInclusive && drgc_params.taxDisplay === 'EXCL';
            const displayExcl = !taxInclusive && drgc_params.taxDisplay === 'INCL';
            const miniCartSubtotal = `<p class="dr-minicart-subtotal"><label>${localizedText.subtotal_label + CheckoutUtils.getTaxSuffixLabel(displayIncl, displayExcl)}</label><span>${cart.pricing.formattedSubtotal}</span></p>`;
            const miniCartViewCartBtn = `<a class="dr-btn" id="dr-minicart-view-cart-btn" href="${drgc_params.cartUrl}">${localizedText.view_cart_label}</a>`;

            lineItems.forEach((li) => {
                const productId = li.product.uri.replace(`${DRCommerceApi.apiBaseUrl}/me/products/`, '');
                const listPrice = Number(li.pricing.listPriceWithQuantity.value);
                const salePrice = Number(li.pricing.salePriceWithQuantity.value);
                const formattedSalePrice = li.pricing.formattedSalePriceWithQuantity;
                const formattedListPrice = li.pricing.formattedListPriceWithQuantity;
                const thumbnailImage = li.product.thumbnailImage || ((li.product.parentProduct) ? (li.product.parentProduct.thumbnailImage || '') : '');
                let priceContent = '';

                if (listPrice > salePrice) {
                    priceContent = `<del class="dr-strike-price">${formattedListPrice}</del><span class="dr-sale-price">${formattedSalePrice}</span>`;
                } else {
                    priceContent = formattedSalePrice;
                }

                const miniCartLineItem = `
                <li class="dr-minicart-item clearfix">
                    <div class="dr-minicart-item-thumbnail">
                        <img src="${thumbnailImage}" alt="${li.product.displayName}" />
                    </div>
                    <div class="dr-minicart-item-info" data-product-id="${productId}">
                        <span class="dr-minicart-item-title">${li.product.displayName}</span>
                        <span class="dr-minicart-item-qty">${localizedText.qty_label}.${li.quantity}</span>
                        <p class="dr-pd-price dr-minicart-item-price">${CheckoutUtils.renderLineItemSalePrice(priceContent, taxInclusive, drgc_params.taxDisplay)}</p>
                    </div>
                    <a href="#" class="dr-minicart-item-remove-btn" aria-label="Remove" data-line-item-id="${li.id}">${localizedText.remove_label}</a>
                </li>`;
                miniCartLineItems += miniCartLineItem;
            });
            miniCartLineItems += '</ul>';
            $body.append(miniCartLineItems, miniCartSubtotal);
            $footer.append(miniCartViewCartBtn);
            $display.append($body, $footer);
        }
    }

    (function() {
        if ($('#dr-minicart').length) {
            displayMiniCart(drgc_params.cart.cart);
        }
    }());

    $('.dr-minicart-toggle, .dr-minicart-close-btn').click((e) => {
        e.preventDefault();
        toggleMiniCartDisplay();
        $('.dr-minicart-display').css('position', 'absolute');
    });

    $('body').on('click', '.dr-buy-btn', async (e) => {
        e.preventDefault();
        const $this = $(e.target);

        if ($this.hasClass('dr-redirect-buy-btn')) {
            const pdLink = $this.closest('.dr-pd-item, .c-product-card').find('a').attr('href');
            window.location.href = pdLink;
        } else {
            if (!$this.attr('data-product-id')) return;

            const productID = $this.attr('data-product-id');
            const productName = $this.attr('data-product-name') || localizedText.general_product_name;
            const existingProducts = lineItems.map((li) => {
                const { uri } = li.product;
                const id = uri.replace(`${DRCommerceApi.apiBaseUrl}/me/products/`, '');
                return {
                    id,
                    quantity: li.quantity
                };
            });
            let quantity = 1;

            // PD page
            if ($('#dr-pd-offers').length) {
                quantity = parseInt($('#dr-pd-qty').val(), 10);
            }

            existingProducts.forEach((pd) => {
                if (pd.id === productID) {
                    quantity += pd.quantity;
                }
            });

            const locale = drgc_params.drLocale;
            const currency = $('#dr-currency-selector > a.dr-selected-currency').data('drCurrency');
            const shopperData = {
                'shopper': {
                  'locale': locale,
                  'currency': currency
                }
            };

            $('body').addClass('dr-loading');

            try {
                await DRCommerceApi.updateShopper({}, shopperData);
            } catch (error) {
                console.error(error);
            }

            const queryObj = {
                productId: productID,
                quantity,
                testOrder: drgc_params.testOrder,
                expand: 'all'
            };
            DRCommerceApi.updateCart(queryObj)
                .then(res => {
                    drToast.displayMessage(`"${productName}" ${localizedText.product_added_to_cart_msg}`, 'success');
                    displayMiniCart(res.cart);
                })
                .catch(jqXHR => CheckoutUtils.apiErrorHandler(jqXHR))
                .finally(() => $('body').removeClass('dr-loading'));
        }
    });

    $('.dr-minicart-display').on('click', '.dr-minicart-item-remove-btn', (e) => {
        e.preventDefault();
        const lineItemID = $(e.target).data('line-item-id');
        const taxRegs = (sessionStorage.getItem('drgcTaxRegs')) ? JSON.parse(sessionStorage.getItem('drgcTaxRegs')) : {};

        $('.dr-minicart-display').addClass('dr-loading');
        DRCommerceApi.removeLineItem(lineItemID)
            .then(() => DRCommerceApi.getCart())
            .then(async (res) => {
                if ((res.cart.totalItemsInCart === 0) && !sessionStorage.getItem('drgcTokenRenewed') && taxRegs.customerType) {
                    try {
                        const tokenInfo = await CheckoutUtils.recreateAccessToken();
                  
                        if (tokenInfo && tokenInfo.access_token) {
                            sessionStorage.setItem('drgcTokenRenewed', 'true');
                            location.reload();
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }

                $('.dr-minicart-display').removeClass('dr-loading');
                displayMiniCart(res.cart);
            })
            .catch(jqXHR => CheckoutUtils.apiErrorHandler(jqXHR));
    });

    $('span.dr-pd-qty-plus, span.dr-pd-qty-minus').on('click', (e) => {
        // Get current quantity values
        const $qty = $('#dr-pd-qty');
        const val = parseInt($qty.val(), 10);
        const max = parseInt($qty.attr('max'), 10);
        const min = parseInt($qty.attr('min'), 10);
        const step = parseInt($qty.attr('step'), 10);
        if (val) {
            // Change the value if plus or minus
            if ($(e.currentTarget).is('.dr-pd-qty-plus')) {
                if (max && (max <= val)) {
                    $qty.val(max);
                } else {
                    $qty.val(val + step);
                }
            } else if ($(e.currentTarget).is('.dr-pd-qty-minus')) {
                if (min && (min >= val)) {
                    $qty.val(min);
                } else if (val > 1) {
                    $qty.val(val - step);
                }
            }
        } else {
            $qty.val('1');
        }
    });

    $( "iframe[name^='controller-']" ).css('display', 'none');

    // Real-time pricing & inventory status option (for DR child/non-DR child themes)
    let pdDisplayOption = {};
    let isPdCard = false;
    if ($('#digital-river-child-css').length) { // DR child theme
        pdDisplayOption = {
            $card: $('.c-product-card'),
            $variationOption: $('input[type=radio][name=variation]'),
            $singlePDBuyBtn: $('form.product-detail .dr-buy-btn'),
            priceDivSelector: () => { return isPdCard ? '.c-product-card__bottom__price' : '.product-pricing'; },
            listPriceDiv: 'span',
            listPriceClass: () => { return isPdCard ? 'old-price' : 'product-price-old'; },
            salePriceDiv: 'span',
            salePriceClass: () => { return isPdCard ? 'new-price' : 'product-price'; },
            priceDiv: 'span',
            priceClass: () => { return isPdCard ? 'price' : 'product-price'; }
        };
    } else { // non-DR child theme
        pdDisplayOption = {
            $card: $('.dr-pd-item'),
            $variationOption: $('select[name=dr-variation] option'),
            $singlePDBuyBtn: $('form#dr-pd-form .dr-buy-btn'),
            priceDivSelector: () => { return isPdCard ? '.dr-pd-item-price' : 'form#dr-pd-form .dr-pd-price'; },
            listPriceDiv: 'del',
            listPriceClass: () => { return 'dr-strike-price'; },
            salePriceDiv: 'strong',
            salePriceClass: () => { return 'dr-sale-price'; },
            priceDiv: 'strong',
            priceClass: () => { return 'dr-sale-price'; }
        };
    }

    // Real-time pricing & inventory status for single PD page (including variation/base products)
    if ($('.single-dr_product').length && !$('.dr-prod-variations select').length) { 
        isPdCard = false;
        $(pdDisplayOption.priceDivSelector()).text(localizedText.loading_msg);
        pdDisplayOption.$singlePDBuyBtn.text(localizedText.loading_msg).prop('disabled', true);

        if (pdDisplayOption.$variationOption && pdDisplayOption.$variationOption.length) { // variation product
            pdDisplayOption.$variationOption.each((idx, elem) => {
                const $option = $(elem);
                const productID = $option.val();

                if (!productID) return;
                DRCommerceApi.getProduct(productID, { expand: 'inventoryStatus' }).then((res) => {
                    const purchasable = res.product.inventoryStatus.productIsInStock;

                    isPdCard = false; // to avoid being overwritten by concurrency
                    PdpModule.bindVariationPrice(res.product.pricing, $option);
                    PdpModule.bindVariationInventoryStatus(purchasable, $option);

                    if (idx === 0) PdpModule.selectVariation($option);
                });
            });
        } else { // base product
            const productID = pdDisplayOption.$singlePDBuyBtn.data('product-id');
            const $priceDiv = $(pdDisplayOption.priceDivSelector()).text(localizedText.loading_msg);

            if (!productID) return;
            DRCommerceApi.getProduct(productID, { expand: 'inventoryStatus' }).then((res) => {
                const purchasable = res.product.inventoryStatus.productIsInStock;

                isPdCard = false; // to avoid being overwritten by concurrency
                PdpModule.displayRealTimePricing(res.product.pricing, pdDisplayOption, $priceDiv);
                PdpModule.displayRealTimeBuyBtn(purchasable, false, pdDisplayOption.$singlePDBuyBtn);
            });
        }
    }

    // Real-time pricing & inventory status for PD card (category page & recommended products)
    if (pdDisplayOption.$card && pdDisplayOption.$card.length) {
        isPdCard = true;
        pdDisplayOption.$card.each((idx, elem) => {
            const $pdElem = $(elem);
            const $priceDiv = $pdElem.find(pdDisplayOption.priceDivSelector()).text(localizedText.loading_msg);
            const $buyBtn = $pdElem.find('.dr-buy-btn').text(localizedText.loading_msg).prop('disabled', true);
            const productID = $buyBtn.data('product-id');
            const parentId = $buyBtn.data('parent-id');

            if (!productID) return;

            if (parentId) {
                DRCommerceApi.getProduct(parentId, { fields: 'displayName,thumbnailImage,pricing,inventoryStatus,variations', expand: 'all' }).then((res) => {
                    const baseProduct = res.product;
                    const variations = baseProduct.variations.product;
                    const isInStock = variations.some(v => v.inventoryStatus.availableQuantity > 0);

                    isPdCard = true; // to avoid being overwritten by concurrency
                    PdpModule.displayRealTimePricing(baseProduct.pricing, pdDisplayOption, $priceDiv);
                    PdpModule.displayRealTimeBuyBtn(isInStock.toString(), true, $buyBtn);
                    PdpModule.updateProductItem($pdElem, baseProduct);
                });
            } else {
                DRCommerceApi.getProduct(productID, { expand: 'inventoryStatus' }).then((res) => {
                    const baseProduct = res.product;
                    const purchasable = baseProduct.inventoryStatus.productIsInStock;

                    isPdCard = true; // to avoid being overwritten by concurrency
                    PdpModule.displayRealTimePricing(baseProduct.pricing, pdDisplayOption, $priceDiv);
                    PdpModule.displayRealTimeBuyBtn(purchasable, false, $buyBtn);
                    PdpModule.updateProductItem($pdElem, baseProduct);
                });
            }
        });
    }

    const $varSelects = $('.dr-prod-variations select');
    const varSelectCount = $varSelects.length;
    const $priceDiv = $(pdDisplayOption.priceDivSelector());
    const $buyBtn = $('.dr-buy-btn');
    const $pdImgWrapper = $('.dr-pd-img-wrapper');
    const $pdImg = $('.dr-pd-img');

    if (varSelectCount) {
        $varSelects.children('option:first').prop('selected', true);
        $varSelects.first().prop('disabled', false);
        $buyBtn.prop('disabled', true);
    }

    $('.dr-prod-variations select').on('change', (e) => {
        e.preventDefault();
        $priceDiv.text('');
        $buyBtn.prop('disabled', true);

        const selectedVal = $(e.target).val();
        const index = $(e.target).data('index');
        const selectedValues = [];
        const allSelectedVal = {};
        const filterObj = Object.assign({}, drgcVarAttrs);
        let i = index;
        let j = 0;

        while (i < varSelectCount) {
            const $next = $varSelects.eq(i + 1);

            if ($next.length) {
                $next.prop('disabled', true).children('option:first').prop('selected', true);
            }

            while (j < index) {
                selectedValues[j] = $varSelects.eq(j).val();
                j++;
            }

            selectedValues[index] = selectedVal;

            selectedValues.forEach((element, i) => {
                const attr = $varSelects.eq(i).data('var-attribute');
                const deleteItems = Object.keys(filterObj).filter(key => filterObj[key][attr] !== element);

                deleteItems.forEach((key) => {
                    delete filterObj[key];
                });    
            });

            i++;
        }

        if ((index < varSelectCount - 1) && selectedVal) {
            const $nextSelect = $varSelects.eq(index + 1);
            const nextAttr = $nextSelect.data('var-attribute');
            const options = [...new Set(Object.keys(filterObj).map(key => filterObj[key][nextAttr]))];

            $nextSelect.children('option:not(:first-child)').remove();

            $.each(options, (key, value) => {
                $nextSelect.append($('<option></option>').attr('value', value).text(value));
            });

            $nextSelect.prop('disabled', false);
        }

        $varSelects.children('option:selected').each((index, element) => {
            allSelectedVal[$(element).parent().data('var-attribute')] = $(element).val();
        });

        const productId = Object.keys(drgcVarAttrs).find(key => JSON.stringify(drgcVarAttrs[key]) === JSON.stringify(allSelectedVal));

        if (productId) {
            $priceDiv.text(localizedText.loading_msg);
            $pdImgWrapper.addClass('dr-loading');
            DRCommerceApi.getProduct(productId, {expand: 'inventoryStatus'})
                .then((res) => {
                    const currentProduct = res.product;
                    const purchasable = currentProduct.inventoryStatus.productIsInStock;
                    const productImage = currentProduct.productImage || currentProduct.thumbnailImage;

                    PdpModule.displayRealTimePricing(currentProduct.pricing, pdDisplayOption, $priceDiv);
                    PdpModule.displayRealTimeBuyBtn(purchasable, false, $buyBtn);
                    PdpModule.displayVarProductInfo(currentProduct);
                    if (productImage) $pdImg.attr('src', productImage);
                    $pdImgWrapper.removeClass('dr-loading');
                });

            $buyBtn.attr('data-product-id', productId).prop('disabled', false);
        }
    });

    const $floatingCart = $('#floating-cart');
    const $miniCart = $('.dr-minicart-display');

    $(window).on('scroll', () => {      
        if (($(window).scrollTop() > 150)) {
            if ($miniCart.is(':visible')) {
                if ($miniCart.css('top') === 0) {
                    $floatingCart.removeClass('show');
                    if (!$('#dr-minicart > .dr-minicart-display').length) $('#dr-minicart').append($miniCart);
                } else {
                    $miniCart.hide();
                    $floatingCart.addClass('show');
                }
            } else {
                $floatingCart.addClass('show');
            }
        } else {
            $floatingCart.removeClass('show');
            if (!$('#dr-minicart > .dr-minicart-display').length) $('#dr-minicart').append($miniCart);
        }
    });

    $floatingCart.on('click', (e) => {
        e.preventDefault();
        $miniCart.css('position', 'fixed');
        $floatingCart.removeClass('show');
        if (!$('#sticky-mini-cart > .dr-minicart-display').length) $('#sticky-mini-cart').append($miniCart);
        openMiniCartDisplay();
    });

    $('body').on('click', '#dr-minicart-view-cart-btn', (e) => {
        e.preventDefault();
        $('body').addClass('dr-loading');
        window.location.href = $(e.target).attr('href');
    });
});

export default PdpModule;
