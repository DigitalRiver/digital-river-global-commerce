const CheckoutUtils = (($, params) => {
  const createDisplayItems = (cartData) => {
    const displayItems = [{
      label: params.translations.subtotal_label,
      amount: cartData.pricing.subtotal.value
    }, {
      label: params.translations.tax_label,
      amount: cartData.pricing.tax.value
    }];

    if (cartData.shippingOptions.shippingOption) {
      displayItems.push({
        label: params.translations.shipping_and_handling_label,
        amount: cartData.pricing.shippingAndHandling.value
      });
    }

    if (cartData.pricing.discount) {
      if (parseFloat(cartData.pricing.discount.value) > 0) {
        displayItems.push({
          label: params.translations.discount_label,
          amount: cartData.pricing.discount.value
        });
      }
    }

    return displayItems;
  };

  const createShippingOptions = (cartData) => {
    const isFreeShipping = (cartData.pricing.shippingAndHandling.value === 0);
    let shippingOptions = [];

    cartData.shippingOptions.shippingOption.forEach((option) => {
      let shippingOption = {
        id: option.id.toString(),
        label: option.description,
        amount: isFreeShipping ? 0 : option.cost.value,
        detail: ''
      };

      shippingOptions.push(shippingOption);
    });

    return shippingOptions;
  };

  const updateShippingOptions = (shippingOptions, selectedId) => {
    shippingOptions.forEach((option, index) => {
      if (option.id === selectedId.toString()) {
        shippingOptions[index].selected = true;
      } else {
        if (shippingOptions[index].selected) {
          delete shippingOptions[index].selected;
        }
      }
    });
  };

  const getBaseRequestData = (cartData, requestShipping, buttonStyle) => {
    const displayItems = createDisplayItems(cartData);
    let shippingOptions = [];

    if (requestShipping) {
      shippingOptions = createShippingOptions(cartData);
      updateShippingOptions(shippingOptions, cartData.shippingMethod.code);
    }

    const requestData = {
      country: params.drLocale.split('_')[1],
      currency: cartData.pricing.orderTotal.currency,
      total: {
        label: params.translations.order_total_label,
        amount: cartData.pricing.orderTotal.value
      },
      displayItems: displayItems,
      shippingOptions: shippingOptions,
      requestShipping: requestShipping,
      style: buttonStyle,
      waitOnClick: false
    };

    return requestData;
  };

  const updateDeliverySection = (shippingOption) => {
    const $selectedOption = $('form#checkout-delivery-form').children().find('input:radio[data-id="' + shippingOption.id + '"]');
    const resultText = `${shippingOption.label} ${shippingOption.amount === 0 ? params.translations.free_label : $selectedOption.attr('data-cost')}`;

    $selectedOption.prop('checked', true);
    $('.dr-checkout__delivery').find('.dr-panel-result__text').text(resultText);
  };

  const updateAddressSection = (addressObj, $target) => {
    const addressArr = [
      `${addressObj.firstName} ${addressObj.lastName}`,
      addressObj.line1,
      addressObj.city,
      addressObj.country
    ];

    $target.text(addressArr.join(', '));
  };

  const updateSummaryPricing = (cart) => {
    const lineItems = cart.lineItems.lineItem;
    const pricing = cart.pricing;
    const newPricing = getSeparatedPricing(lineItems, pricing);

    $('div.dr-summary__shipping > .item-value').text(
      pricing.shippingAndHandling.value === 0 ?
      params.translations.free_label :
      newPricing.formattedShippingAndHandling
    );
    $('div.dr-summary__tax > .item-value').text(newPricing.formattedProductTax);
    $('div.dr-summary__shipping-tax > .item-value').text(newPricing.formattedShippingTax);
    $('div.dr-summary__subtotal > .subtotal-value').text(newPricing.formattedSubtotal);
    $('div.dr-summary__total > .total-value').text(pricing.formattedOrderTotal);
    $('.dr-summary').removeClass('dr-loading');
  };

  const getEntityCode = () => {
    return drgc_params.order && drgc_params.order.order ?
      drgc_params.order.order.businessEntityCode :
      (drgc_params.cart && drgc_params.cart.cart ? drgc_params.cart.cart.businessEntityCode : '');
  };

  const getCompliance = (digitalriverjs, entityCode, locale) => {
    return entityCode && locale ? digitalriverjs.Compliance.getDetails(entityCode, locale).disclosure : {};
  };

  const applyLegalLinks = (digitalriverjs) => {
    const entityCode = getEntityCode();
    const locale = drgc_params.drLocale;
    const complianceData = getCompliance(digitalriverjs, entityCode, locale);

    if (Object.keys(complianceData).length) {
      $('.dr-resellerDisclosure').prop('href', complianceData.resellerDisclosure.url);
      $('.dr-termsOfSale').prop('href', complianceData.termsOfSale.url);
      $('.dr-privacyPolicy').prop('href', complianceData.privacyPolicy.url);
      $('.dr-cookiePolicy').prop('href', complianceData.cookiePolicy.url);
      $('.dr-cancellationRights').prop('href', complianceData.cancellationRights.url);
      $('.dr-legalNotice').prop('href', complianceData.legalNotice.url);
    }
  };

  const displayPreTAndC = () => {
    if (drgc_params.googlePayBtnStatus && drgc_params.googlePayBtnStatus === 'LOADING') return;
    if (drgc_params.applePayBtnStatus && drgc_params.applePayBtnStatus === 'LOADING') return;
    $('.dr-preTAndC-wrapper').show();
  };

  const displayAlertMessage = (message) => {
    alert('ERROR! ' + message);
  };

  const apiErrorHandler = (jqXHR) => {
    if (jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.errors) {
      const currentError = jqXHR.responseJSON.errors.error[0];
      drToast.displayMessage(currentError.description, 'error');
    }
  };

  const resetBodyOpacity = () => {
    $('body').css({'pointer-events': 'auto', 'opacity': 1});
  };

  const getPermalink = (productID) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: drgc_params.ajaxUrl,
        data: {
          action: 'get_permalink',
          productID
        },
        success: (data) => {
          resolve(data);
        },
        error: (jqXHR) => {
          reject(jqXHR);
        }
      });
    });
  };

  const resetFormSubmitButton = ($form) => {
    $form.find('button[type="submit"]').removeClass('sending').blur();
  };

  const getAjaxErrorMessage = (jqXHR) => {
    return (jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.errors) ? jqXHR.responseJSON.errors.error[0].description : '';
  };

  const setShippingOption = (option, freeShipping) => {
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
          <span>${option.description}</span>
          <span class="black">${freeShipping ? drgc_params.translations.free_label : option.formattedCost}</span>
        </label>
      </div>
    `;

    $('#checkout-delivery-form .dr-panel-edit__el').append(html);
  };

  const getSupportedCountries = (addressType) => {
    const countryCodes = $('#' + addressType + '-field-country > option').map((index, element) => element.value).get();
    countryCodes.shift();

    return countryCodes;
  };

  const formatPrice = (val, pricing) => {
    const localeCode = ($('.dr-currency-select').find('option:selected').data('locale') || drgc_params.drLocale).replace('_', '-');
    const currencySymbol = pricing.formattedSubtotal.replace(/\d+/g, '').replace(/[,.]/g, '');
    const symbolAsPrefix = pricing.formattedSubtotal.indexOf(currencySymbol) === 0;
    const formattedPriceWithoutSymbol = pricing.formattedSubtotal.replace(currencySymbol, '');
    const decimalSymbol = (0).toLocaleString(localeCode, { minimumFractionDigits: 1 })[1];
    const digits = formattedPriceWithoutSymbol.indexOf(decimalSymbol) > -1 ?
      formattedPriceWithoutSymbol.split(decimalSymbol).pop().length :
      0;
    val = val.toLocaleString(localeCode, { minimumFractionDigits: digits });
    val = symbolAsPrefix ? (currencySymbol + val) : (val + currencySymbol);
    return val;
  };

  const getCorrectSubtotalWithDiscount = (pricing) => {
    const val = pricing.subtotal.value - pricing.discount.value;
    return formatPrice(val, pricing);
  };

  const getSeparatedPricing = (lineItems, pricing) => {
    let productTax = 0;
    let shippingTax = 0;
    const forceExclTax = drgc_params.forceExclTax === 'true';
    const shippingVal = pricing.shippingAndHandling ?
      pricing.shippingAndHandling.value :
      pricing.shipping ? pricing.shipping.value : 0; // cart is using shippingAndHandling, order is using shipping

    lineItems.forEach((lineItem) => {
      productTax += lineItem.pricing.productTax.value;
      shippingTax += lineItem.pricing.shippingTax.value;
    });

    return {
      formattedProductTax: formatPrice(productTax, pricing),
      formattedShippingTax: formatPrice(shippingTax, pricing),
      formattedSubtotal: (isTaxInclusive() && forceExclTax) ? formatPrice(pricing.subtotal.value - productTax, pricing) : pricing.formattedSubtotal,
      formattedShippingAndHandling: (isTaxInclusive() && forceExclTax) ? formatPrice(shippingVal - shippingTax, pricing) : (pricing.formattedShippingAndHandling || pricing.formattedShipping)
    };
  };

  const shouldDisplayVat = () => {
    const currency = $('.dr-currency-select').val();
    return (currency === 'GBP' || currency === 'EUR');
  };

  const isTaxInclusive = () => {
    const locale = $('.dr-currency-select option:selected').data('locale') || drgc_params.drLocale;
    return locale !== 'en_US';
  }

  return {
    createDisplayItems,
    createShippingOptions,
    updateShippingOptions,
    getBaseRequestData,
    updateDeliverySection,
    updateAddressSection,
    updateSummaryPricing,
    applyLegalLinks,
    displayPreTAndC,
    displayAlertMessage,
    apiErrorHandler,
    resetBodyOpacity,
    getPermalink,
    getEntityCode,
    getCompliance,
    resetFormSubmitButton,
    getAjaxErrorMessage,
    setShippingOption,
    getSupportedCountries,
    formatPrice,
    getCorrectSubtotalWithDiscount,
    getSeparatedPricing,
    shouldDisplayVat,
    isTaxInclusive
  };
})(jQuery, drgc_params);

export default CheckoutUtils;
