import DRCommerceApi from "./commerce-api";

const CheckoutUtils = (($, params) => {
  const localizedText = drgc_params.translations;
  const countryOptionsObj = { shipping: [], billing: [] };
  const getFetchedCountryOptions = (addressType) => {
    return countryOptionsObj[addressType] || [];
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
      addressObj.countrySubdivision,
      addressObj.country
    ];

    $target.text(addressArr.filter(v => v).join(', '));
  };

  const updateSummaryLabels = () => {
    const isTaxInclusive = drgc_params.isTaxInclusive === 'true';
    const forceExclTax = drgc_params.forceExclTax === 'true';
    const shouldDisplayVat = drgc_params.shouldDisplayVat === 'true';
    const taxSuffixLabel = isTaxInclusive ?
      forceExclTax ? ' ' + localizedText.excl_vat_label : ' ' + localizedText.incl_vat_label :
      '';
  
    if ($('.dr-checkout__payment').hasClass('active') || $('.dr-checkout__confirmation').hasClass('active')) {
      $('.dr-summary__tax .item-label').text(shouldDisplayVat ?
        localizedText.vat_label :
        localizedText.tax_label
      );
      $('.dr-summary__shipping .item-label').text(localizedText.shipping_label + taxSuffixLabel);
      $('.dr-summary__shipping-tax .item-label').text(shouldDisplayVat ?
        localizedText.shipping_vat_label :
        localizedText.shipping_tax_label
      );
    } else {
      $('.dr-summary__tax .item-label').text(shouldDisplayVat ?
        localizedText.estimated_vat_label :
        localizedText.estimated_tax_label
      );
      $('.dr-summary__shipping .item-label').text(localizedText.estimated_shipping_label + taxSuffixLabel);
      $('.dr-summary__shipping-tax .item-label').text(shouldDisplayVat ?
        localizedText.estimated_shipping_vat_label :
        localizedText.estimated_shipping_tax_label
      );
    }
  };

  const updateSummaryPricing = (order, isTaxInclusive) => {
    const lineItems = order.lineItems ? order.lineItems.lineItem : (order.products || []);
    const pricing = order.pricing;
    const newPricing = getSeparatedPricing(lineItems, pricing, isTaxInclusive);
    const shippingVal = pricing.shippingAndHandling ?
      pricing.shippingAndHandling.value :
      pricing.shipping ? pricing.shipping.value : 0; // cart is using shippingAndHandling, order is using shipping

    if (order.lineItems) {
      lineItems.forEach((item) => {
        const $item = $('div.dr-summary__products > div[data-line-item-id=' + item.id + ']');
        const $salePrice = $item.find('span.sale-price');
        const $regularPrice = $item.find('span.regular-price');

        $salePrice.text(item.pricing.formattedSalePriceWithQuantity);
        $regularPrice.text(item.pricing.formattedListPriceWithQuantity);
      });
    }

    $('div.dr-summary__shipping > .item-value').text(
      shippingVal === 0 ?
      params.translations.free_label :
      newPricing.formattedShippingAndHandling
    );
    $('div.dr-summary__tax > .item-value').text(newPricing.formattedProductTax);
    $('div.dr-summary__shipping-tax > .item-value').text(newPricing.formattedShippingTax);
    $('div.dr-summary__subtotal > .subtotal-value').text(newPricing.formattedSubtotal);
    $('div.dr-summary__total > .total-value').text(pricing.formattedOrderTotal);
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
    $('.dr-loading').removeClass('dr-loading');
    drToast.displayMessage(getAjaxErrorMessage(jqXHR), 'error');
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

  const getAjaxErrorMessage = (error) => {
    let errMsg = localizedText.undefined_error_msg;

    if (!error) return errMsg;

    if (error.responseJSON && error.responseJSON.errors && Array.isArray(error.responseJSON.errors.error)) {
      const err = error.responseJSON.errors.error[0];
      switch (err.code) {
        case 'restricted-bill-to-country':
        case 'restricted-ship-to-country':
          errMsg = localizedText.address_error_msg;
          break;

        case 'cart-fraud-failure':
        case 'order-fraud-failure':
          errMsg = localizedText.unable_place_order_msg;
          break;

        default:
          errMsg = err.description;
      }
    } else if (Array.isArray(error.errors)) {
      const err = error.errors[0];
      if (err.description) errMsg = err.description;
    }

    return errMsg;
  };

  const setShippingOption = (option) => {
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

  const isSubsAddedToCart = (lineItems) => {
    if (!lineItems.length) return false;

    for (let i = 0; i < lineItems.length; i++) {
      const lineItem = lineItems[i];
      const customAttributes = lineItem.product.customAttributes.attribute || [];

      if (customAttributes.some(attr => attr.name === 'subscriptionType')) return true;
    }

    return false;
  };

  const getLocalizedAutoRenewalTerms = (digitalriverjs, entityCode, locale) => {
    const compliance = getCompliance(digitalriverjs, entityCode, locale);

    return (Object.keys(compliance).length) ? compliance.autorenewalPlanTerms.localizedText : '';
  };

  const formatPrice = (val, pricing) => {
    const localeCode = drgc_params.drLocale.replace('_', '-');
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

  const getSeparatedPricing = (lineItems, pricing, isTaxInclusive) => {
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
      formattedSubtotal: (isTaxInclusive && forceExclTax) ? formatPrice(pricing.subtotal.value - productTax, pricing) : pricing.formattedSubtotal,
      formattedShippingAndHandling: (isTaxInclusive && forceExclTax) ? formatPrice(shippingVal - shippingTax, pricing) : (pricing.formattedShippingAndHandling || pricing.formattedShipping)
    };
  };

  const getCountryOptionsFromGC = (requestShipping) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: `https://drh-fonts.img.digitalrivercontent.net/store/${drgc_params.siteID}/${drgc_params.drLocale}/DisplayPage/id.SimpleRegistrationPage`,
        cache: false,
        success: (response) => {
          const addressTypes = requestShipping ? ['shipping', 'billing'] : ['billing'];
          addressTypes.forEach((type) => {
            const savedCountryCode = $(`#${type}-field-country`).val();
            const $options = $(response).find(`select[name=${type.toUpperCase()}country] option`).not(':first');
            countryOptionsObj[type] = $.map($options, (option) => { return option.value; });

            $(`#${type}-field-country option`).not(':first').remove();
            $(`#${type}-field-country`)
              .append($options)
              .val(countryOptionsObj[type].indexOf(savedCountryCode) > -1 ? savedCountryCode : '');
          });
          resolve();
        },
        error: (jqXHR) => {
          reject(jqXHR);
        }
      });
    });
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

  const getDropinBillingAddress = (billingAddress) => {
    return {
      firstName: billingAddress.firstName,
      lastName: billingAddress.lastName,
      email: billingAddress.emailAddress,
      phoneNumber: billingAddress.phoneNumber,
      address: {
        line1: billingAddress.line1,
        line2: billingAddress.line2,
        city: billingAddress.city,
        state: billingAddress.countrySubdivision,
        postalCode: billingAddress.postalCode,
        country: billingAddress.country
      }
    };
  };

  const getTaxSchema = (address) => {
    const data = {
      action: 'drgc_get_tax_schema',
      nonce: drgc_params.ajaxNonce,
      address: address
    };

    return new Promise((resolve, reject) => {
      $.post(drgc_params.ajaxUrl, data, (response) => {
        if (!response.success) {
          let error = '';

          if (response.data && response.data.errors && response.data.errors[0].hasOwnProperty('message')) {
            error = response.data.errors[0].message;
          } else if (Object.prototype.toString.call(response.data) === '[object String]') {
            error = response.data;
          } else {
            error = localizedText.undefined_error_msg;
          }

          reject(error);
        } else {
          $('.shopper-type-radio, .tax-id-field').remove();

          const taxSchema = response.data;

          for (const [key, value] of Object.entries(taxSchema)) {
            createTaxIdElement(key, value);
          }

          $('.shopper-type-radio').appendTo('.tax-id-shopper-type');
          $('input[name="shopper-type"]:first').prop('checked', true).trigger('click');

          resolve(taxSchema);
        }
      });
    });
  };

  const validateVatNumber = (e) => {
    const elem = e.target;
    const value = elem.value;
    let pattern = elem.dataset.pattern;

    if (pattern.indexOf('$,') > 0) pattern = pattern.split('$,').join('$|');

    const re = new RegExp(pattern);
    const customErrorMsg = (re.test(value) || value.trim() === '') ? '' : 'Invalid ' + elem.dataset.title;

    elem.setCustomValidity(customErrorMsg);

    if (elem.validity.customError) {
        $(elem).nextAll('.invalid-feedback').text(elem.validationMessage);
    } else {
        $(elem).nextAll('.invalid-feedback').text('');
    }

    $('#checkout-tax-id-form').addClass('was-validated');
  };

  const createTaxIdElement = (shopperType, taxRegs) => {
    const typeText = (shopperType === 'Individual') ? localizedText.personal_shopper_type : localizedText.business_shopper_type;
    const radiosHtml = `
      <div class="form-check form-check-inline shopper-type-radio">      
        <input class="form-check-input" type="radio" name="shopper-type" id="shopper-type-${shopperType}" value="${taxRegs.customerType}">
        <label class="form-check-label" for="shopper-type-${shopperType}">${typeText}</label>
      </div>
    `;
    let fieldsHtml = '';

    if (taxRegs.taxRegistrations.length) {
      const taxFields = taxRegs.taxRegistrations;

      taxFields.forEach((element) => {
        const key = Object.keys(element)[0];
        const taxReg = element[key];

        fieldsHtml = `
          ${fieldsHtml}
          <div class="form-group dr-panel-edit__el tax-id-field ${shopperType}">
            <div class="float-container float-container--${key}">
              <label for="tax-id-field-${key}" class="float-label">${taxReg.title}</label>
              <input id="tax-id-field-${key}" type="text" name="tax-id-${key}" value="" class="form-control float-field float-field--${key}" data-key="${key}" data-title="${taxReg.title}" data-description="${taxReg.description}" data-pattern="${taxReg.pattern}">
              <span class="tax-id-field-info">*${taxReg.description}</span>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        `;
      });
    }

    $('#checkout-tax-id-form > button[type="submit"]').before(`${radiosHtml}${fieldsHtml}`);
  };

  const applyTaxRegistration = (customerType, taxRegs) => {
    const data = {
      action: 'drgc_apply_tax_registration',
      nonce: drgc_params.ajaxNonce,
      customerType: customerType,
      taxRegs: taxRegs
    };

    return new Promise((resolve, reject) => {
      $.post(drgc_params.ajaxUrl, data, (response) => {
        if (!response.success) {
          let error = '';

          if (response.data && response.data.errors && response.data.errors[0].hasOwnProperty('message')) {
            error = response.data.errors[0].message;
          } else if (Object.prototype.toString.call(response.data) === '[object String]') {
            error = response.data;
          } else {
            error = localizedText.undefined_error_msg;
          }

          reject(error);
        } else {
          resolve(response.data);
        }
      });
    });
  };

  const getTaxRegistration = () => {
    const data = {
      action: 'drgc_get_tax_registration',
      nonce: drgc_params.ajaxNonce
    };

    return new Promise((resolve, reject) => {
      $.post(drgc_params.ajaxUrl, data, (response) => {
        if (!response.success) {
          let error = '';

          if (response.data && response.data.errors && response.data.errors[0].hasOwnProperty('message')) {
            error = response.data.errors[0].message;
          } else if (Object.prototype.toString.call(response.data) === '[object String]') {
            error = response.data;
          } else {
            error = localizedText.undefined_error_msg;
          }

          reject(error);
        } else {
          resolve(response.data);
        }
      });
    });
  };

  const createTaxProfile = (customerId) => {
    const formData = new FormData();

    formData.append('companyName', $('#tems-us-company-name').val());
    formData.append('taxAuthority', $('#certificate-tax-authority').val());
    formData.append('startDate', $('#tems-us-start-date').val());
    formData.append('endDate', $('#tems-us-end-date').val());
    formData.append('certificate', $('#tems-us-certificate').get(0).files[0]);

    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${params.accessToken}`
        },
        url: `https://${drgc_params.domain}/user-api/customers/${customerId}/tax-registration`,
        cache: false,
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: formData,
        success: (data) => {
          resolve(data);
        },
        error: (jqXHR) => {
          reject(jqXHR);
        }
      });
    });
  };

  const recreateAccessToken = () => {
    const data = {
      action: 'drgc_recreate_access_token',
      nonce: drgc_params.ajaxNonce
    };

    return new Promise((resolve, reject) => {
      $.post(drgc_params.ajaxUrl, data, (response) => {
        if (!response.success) {
          let error = '';

          if (response.data && response.data.hasOwnProperty('error_description')) {
            error = response.data.error_description;
          } else if (Object.prototype.toString.call(response.data) === '[object String]') {
            error = response.data;
          } else {
            error = localizedText.undefined_error_msg;
          }

          reject(error);
        } else {
          if (sessionStorage.getItem('drgcTaxExempt')) sessionStorage.removeItem('drgcTaxExempt');
          if (sessionStorage.getItem('drgcTaxRegs')) sessionStorage.removeItem('drgcTaxRegs');
          resolve(response.data);
        }
      });
    });
  };

  const updateTemsUsStatus = (temsUsStatus, adminSabrixCall = false) => {
    const statusCustomAttr = {
      cart: {
        customAttributes: {
          attribute: [
            {
              name: 'TAX_EXEMPTION_US_STATUS',
              value: temsUsStatus
            },
            {
              name: 'TAX_PROFILE_CREATED_STATUS',
              value: adminSabrixCall
            }
          ]
        }
      }
    };

    return DRCommerceApi.updateCart({}, statusCustomAttr);
  };

  const getTemsUsStatus = (customAttrs) => {
    return customAttrs.find(attr => attr.name === 'TAX_EXEMPTION_US_STATUS') ?
      customAttrs.find(attr => attr.name === 'TAX_EXEMPTION_US_STATUS').value : '';
  };

  return {
    getFetchedCountryOptions,
    updateDeliverySection,
    updateAddressSection,
    updateSummaryLabels,
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
    isSubsAddedToCart,
    getLocalizedAutoRenewalTerms,
    formatPrice,
    getCorrectSubtotalWithDiscount,
    getSeparatedPricing,
    getCountryOptionsFromGC,
    getAddress,
    getDropinBillingAddress,
    getTaxSchema,
    validateVatNumber,
    createTaxIdElement,
    applyTaxRegistration,
    getTaxRegistration,
    createTaxProfile,
    recreateAccessToken,
    updateTemsUsStatus,
    getTemsUsStatus
  };
})(jQuery, drgc_params);

export default CheckoutUtils;
