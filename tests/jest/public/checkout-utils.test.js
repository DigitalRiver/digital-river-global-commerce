import CheckoutUtils from '../../../assets/js/public/checkout-utils';

const cartData = {
  shippingOptions: {
    uri: 'https://api.digitalriver.com/v1/shoppers/me/carts/active/shipping-options'
  },
  pricing: {
    orderTotal: {
      currency: 'USD',
      value: 21.98
    },
    subtotal: {
      currency: 'USD',
      value: 19.99
    },
    tax: {
      currency: 'USD',
      value: 1.99
    },
    shippingAndHandling: {
      currency: 'USD',
      value: 9.99
    }
  },
  shippingMethod: {
    code: 67890
  }
};

describe('Checkout Utils', () => {
  test('Create the display items without shipping and discount', () => {
    const stubItems = [{
      label: 'Sub-total',
      amount: 19.99
    }, {
      label: 'Tax',
      amount: 1.99
    }];

    const displayItems = CheckoutUtils.createDisplayItems(cartData);

    expect(displayItems).toEqual(stubItems);
  });

  test('Create the display items without discount', () => {
    cartData.shippingOptions = {
      shippingOption: [{
        id: 12345,
        description: 'shipping option #1',
        cost: {
          value: 999
        }
      }]
    };

    const stubItems = [{
      label: 'Sub-total',
      amount: 19.99
    }, {
      label: 'Tax',
      amount: 1.99
    }, {
      label: 'Shipping and Handling',
      amount: 9.99
    }];

    const displayItems = CheckoutUtils.createDisplayItems(cartData);

    expect(displayItems).toEqual(stubItems);
  });

  test('Create the display items', () => {
    cartData.pricing.discount = {
      currency: 'USD',
      value: 3.99
    }

    const stubItems = [{
      label: 'Sub-total',
      amount: 19.99
    }, {
      label: 'Tax',
      amount: 1.99
    }, {
      label: 'Shipping and Handling',
      amount: 9.99
    }, {
      label: 'Discount',
      amount: 3.99
    }];

    const displayItems = CheckoutUtils.createDisplayItems(cartData);

    expect(displayItems).toEqual(stubItems);
  });

  test('Create the shipping options', () => {
    cartData.shippingOptions = {
      shippingOption: [{
        id: 12345,
        description: 'shipping option #1',
        cost: {
          value: 999
        }
      }]
    };

    const stubOptions = [{
      id: '12345',
      label: 'shipping option #1',
      amount: 999,
      detail: ''
    }];

    const shippingOptions = CheckoutUtils.createShippingOptions(cartData);

    expect(shippingOptions).toEqual(stubOptions);
  });

  test('Create the shipping options as the shipping is free', () => {
    cartData.pricing.shippingAndHandling.value = 0;
    cartData.shippingOptions = {
      shippingOption: [{
        id: 12345,
        description: 'shipping option #1',
        cost: {
          value: 999
        }
      }]
    };

    const stubOptions = [{
      id: '12345',
      label: 'shipping option #1',
      amount: 0,
      detail: ''
    }];

    const shippingOptions = CheckoutUtils.createShippingOptions(cartData);

    expect(shippingOptions).toEqual(stubOptions);
  });

  test('Update the shipping options', () => {
    cartData.pricing.shippingAndHandling.value = 9.99;
    cartData.shippingOptions.shippingOption.push({
      id: 67890,
      description: 'shipping option #2',
      cost: {
        value: 1000
      }
    }, {
      id: 13579,
      description: 'shipping option #3',
      cost: {
        value: 2000
      }
    });

    const shippingOptions = CheckoutUtils.createShippingOptions(cartData);
    shippingOptions[0].selected = true;

    CheckoutUtils.updateShippingOptions(shippingOptions, 67890);

    const stubOptions = [{
      id: '12345',
      label: 'shipping option #1',
      amount: 999,
      detail: ''
    }, {
      id: '67890',
      label: 'shipping option #2',
      amount: 1000,
      detail: '',
      selected: true
    }, {
      id: '13579',
      label: 'shipping option #3',
      amount: 2000,
      detail: ''
    }];

    expect(shippingOptions).toEqual(stubOptions);
  });

  test('Get the request data', () => {
    const requestShipping = true;
    const buttonStyle = {
      buttonType: 'long',
      buttonColor: 'dark',
      buttonLanguage: 'US'
    };

    const requestData = CheckoutUtils.getBaseRequestData(cartData, requestShipping, buttonStyle);

    const stubRequestData = {
      country: 'US',
      currency: 'USD',
      total: {
        label: 'Order Total',
        amount: 21.98
      },
      displayItems: [{
        label: 'Sub-total',
        amount: 19.99
      }, {
        label: 'Tax',
        amount: 1.99
      }, {
        label: 'Shipping and Handling',
        amount: 9.99
      }, {
        label: 'Discount',
        amount: 3.99
      }],
      shippingOptions: [{
        id: '12345',
        label: 'shipping option #1',
        amount: 999,
        detail: ''
      }, {
        id: '67890',
        label: 'shipping option #2',
        amount: 1000,
        detail: '',
        selected: true
      }, {
        id: '13579',
        label: 'shipping option #3',
        amount: 2000,
        detail: ''
      }],
      requestShipping: true,
      style: {
        buttonType: 'long',
        buttonColor: 'dark',
        buttonLanguage: 'US'
      },
      waitOnClick: false
    };

    expect(requestData).toEqual(stubRequestData);
  });

  test('Get the request data without shipping', () => {
    delete cartData.shippingOptions.shippingOption;
    const requestShipping = false;
    const buttonStyle = {
      buttonType: 'long',
      buttonColor: 'dark',
      buttonLanguage: 'US'
    };

    const requestData = CheckoutUtils.getBaseRequestData(cartData, requestShipping, buttonStyle);

    const stubRequestData = {
      country: 'US',
      currency: 'USD',
      total: {
        label: 'Order Total',
        amount: 21.98
      },
      displayItems: [{
        label: 'Sub-total',
        amount: 19.99
      }, {
        label: 'Tax',
        amount: 1.99
      }, {
        label: 'Discount',
        amount: 3.99
      }],
      shippingOptions: [],
      requestShipping: false,
      style: {
        buttonType: 'long',
        buttonColor: 'dark',
        buttonLanguage: 'US'
      },
      waitOnClick: false
    };

    expect(requestData).toEqual(stubRequestData);
  });

  test('Get the empty entity code', () => {
    drgc_params.order = {};
    drgc_params.cart = {};

    const entity = CheckoutUtils.getEntityCode();
    const stubEntity = '';

    expect(entity).toEqual(stubEntity);
  });

  test('Get the entity code from the order', () => {
    drgc_params.order = {
      order: {
        businessEntityCode: 'DR_INC-ENTITY'
      }
    };

    const entity = CheckoutUtils.getEntityCode();
    const stubEntity = 'DR_INC-ENTITY';

    expect(entity).toEqual(stubEntity);
  });

  test('Get the entity code from the cart', () => {
    drgc_params.order = {};
    drgc_params.cart = {
      cart: {
        businessEntityCode: 'DR_INC-ENTITY'
      }
    };

    const entity = CheckoutUtils.getEntityCode();
    const stubEntity = 'DR_INC-ENTITY';

    expect(entity).toEqual(stubEntity);
  });

  test('Get the empty compliance', () => {
    const digitalriverjs = {
      Compliance: {
        getDetails: (entityCode, locale) => {
          return {
            disclosure: {
              businessEntity: {},
              resellerDisclosure: {},
              termsOfSale: {},
              privacyPolicy: {},
              cookiePolicy: {},
              cancellationRights: {},
              legalNotice: {}
            }
          };
        }
      }
    };

    const compliance = CheckoutUtils.getCompliance(digitalriverjs, '', '');
    const stubCompliance = {};

    expect(compliance).toEqual(stubCompliance);
  });

  test('Get the compliance', () => {
    const digitalriverjs = {
      Compliance: {
        getDetails: (entityCode, locale) => {
          return {
            disclosure: {
              businessEntity: { name: 'Digital River Inc.', id: 'DR_INC-ENTITY' },
              resellerDisclosure: { localizedText: 'is the authorised reseller.', url: 'https://store-domain/resellerDisclosure' },
              termsOfSale: { localizedText: 'Terms of Sale', url: 'https://store-domain/termsOfSale' },
              privacyPolicy: { localizedText: 'Privacy Policy', url: 'https://store-domain/privacyPolicy' },
              cookiePolicy: { localizedText: 'Cookies', url: 'https://store-domain/cookiePolicy' },
              cancellationRights: { localizedText: 'Cancellation Right', url: 'https://store-domain/cancellationRights' },
              legalNotice: { localizedText: 'Legal Notice', url: 'https://store-domain/legalNotice' }
            }
          };
        }
      }
    };

    const compliance = CheckoutUtils.getCompliance(digitalriverjs, 'DR_INC-ENTITY', 'en_US');
    const stubCompliance = {
      businessEntity: { name: 'Digital River Inc.', id: 'DR_INC-ENTITY' },
      resellerDisclosure: { localizedText: 'is the authorised reseller.', url: 'https://store-domain/resellerDisclosure' },
      termsOfSale: { localizedText: 'Terms of Sale', url: 'https://store-domain/termsOfSale' },
      privacyPolicy: { localizedText: 'Privacy Policy', url: 'https://store-domain/privacyPolicy' },
      cookiePolicy: { localizedText: 'Cookies', url: 'https://store-domain/cookiePolicy' },
      cancellationRights: { localizedText: 'Cancellation Right', url: 'https://store-domain/cancellationRights' },
      legalNotice: { localizedText: 'Legal Notice', url: 'https://store-domain/legalNotice' }
    };

    expect(compliance).toEqual(stubCompliance);
  });

  test('applyLegalLinks should get urls by DR.js and apply them to the links', () => {
    document.body.innerHTML = `<div id="container">
      <a href="#" target="_blank" class="dr-privacyPolicy">Privacy Policy</a>
      <a href="#" target="_blank" class="dr-termsOfSale">Terms of Sale</a>
    </div>`;
    const digitalriverjs = {
      Compliance: {
        getDetails: (entityCode, locale) => {
          return {
            disclosure: {
              businessEntity: { name: 'Digital River Inc.', id: 'DR_INC-ENTITY' },
              resellerDisclosure: { localizedText: 'is the authorised reseller.', url: 'https://store-domain/resellerDisclosure' },
              termsOfSale: { localizedText: 'Terms of Sale', url: 'https://store-domain/termsOfSale' },
              privacyPolicy: { localizedText: 'Privacy Policy', url: 'https://store-domain/privacyPolicy' },
              cookiePolicy: { localizedText: 'Cookies', url: 'https://store-domain/cookiePolicy' },
              cancellationRights: { localizedText: 'Cancellation Right', url: 'https://store-domain/cancellationRights' },
              legalNotice: { localizedText: 'Legal Notice', url: 'https://store-domain/legalNotice' }
            }
          };
        }
      }
    };

    CheckoutUtils.applyLegalLinks(digitalriverjs);
    expect($('.dr-termsOfSale').prop('href')).toEqual('https://store-domain/termsOfSale');
    expect($('.dr-privacyPolicy').prop('href')).toEqual('https://store-domain/privacyPolicy');
  });

  test('displayPreTAndC should show T&C of GooglePay & ApplePay once the button(s) is(are) ready', () => {
    document.body.innerHTML = `<div class="dr-preTAndC-wrapper"><input type="checkbox" id="dr-preTAndC"></div>`;
    const preTAndCWrapper = document.getElementsByClassName('dr-preTAndC-wrapper')[0];

    // One is ready but another one is loading, T&C should be hidden
    preTAndCWrapper.style.display = 'none';
    drgc_params.googlePayBtnStatus = 'READY';
    drgc_params.applePayBtnStatus = 'LOADING';
    CheckoutUtils.displayPreTAndC();
    expect(preTAndCWrapper.style.display).toEqual('none');

    // One is ready but another one is unavailable, T&C should be visible
    preTAndCWrapper.style.display = 'none';
    drgc_params.googlePayBtnStatus = 'READY';
    drgc_params.applePayBtnStatus = 'UNAVAILABLE';
    CheckoutUtils.displayPreTAndC();
    expect(preTAndCWrapper.style.display).toEqual('');

    // Both are ready, T&C should be visible
    preTAndCWrapper.style.display = 'none';
    drgc_params.googlePayBtnStatus = 'READY';
    drgc_params.applePayBtnStatus = 'READY';
    CheckoutUtils.displayPreTAndC();
    expect(preTAndCWrapper.style.display).toEqual('');
  });

  describe('Test apiErrorHandler ', () => {
    window.drToast = {};
    drToast.displayMessage = jest.fn();

    test('It should display general error message when the error is not well-formed', () => {
      const jqXHR = {
        status: 409,
        responseJSON: {}
      };
      CheckoutUtils.apiErrorHandler(jqXHR);
      expect(drToast.displayMessage).toBeCalledWith('Something went wrong. Please try again.', 'error');
    });

    test('It should display error description when there is a standard error', () => {
      const jqXHR = {
        status: 409,
        responseJSON: {
          errors: {
            error: [
              {
                relation: 'https://developers.digitalriver.com/v1/shoppers/CartsResource',
                code: 'inventory-unavailable-error',
                description: 'This product is currently out of stock and cannot be added to your cart.'
              }
            ]
          }
        }
      };
      CheckoutUtils.apiErrorHandler(jqXHR);
      expect(drToast.displayMessage).toBeCalledWith('This product is currently out of stock and cannot be added to your cart.', 'error');
    });
  });

});
