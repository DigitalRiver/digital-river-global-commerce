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

  test('Update the shipping options', () => {
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
});