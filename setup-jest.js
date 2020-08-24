global.jQuery = require('jquery');
global.$ = global.jQuery;

global.drgc_params = {
  siteID: 'drdod15',
  wpLocale: 'en_US',
  drLocale: 'en_US',
  domain: 'api.digitalriver.com',
  accessToken: 'mockedAccessToken',
  isLogin: 'false',
  loginPath: null,
  translations: {
    subtotal_label: 'Sub-total',
    vat_label: 'VAT',
    estimated_vat_label: 'Estimated VAT',
    tax_label: 'Tax',
    estimated_tax_label: 'Estimated Tax',
    shipping_label: 'Shipping',
    estimated_shipping_label: 'Estimated Shipping',
    shipping_and_handling_label: 'Shipping and Handling',
    discount_label: 'Discount',
    order_total_label: 'Order Total',
    free_label: 'FREE',
    required_field_msg: 'This field is required.',
    required_tandc_msg: 'Please indicate you have read and accepted the privacy policy and terms of sale.',
    password_length_error_msg: 'Password must be between 8 - 32 characters.',
    password_uppercase_error_msg: 'Must use at least one upper case letter.',
    password_lowercase_error_msg: 'Must use at least one lower case letter.',
    password_number_error_msg: 'Must use at least one number.',
    password_char_error_msg: 'Must use at least one special character (! _ @).',
    password_banned_char_error_msg: 'Contains non-allowable special characters (only ! _ @ are allowed).',
    buy_now: 'Buy Now',
    add_to_cart: 'Add to Cart',
    out_of_stock: 'Out of Stock',
    undefined_error_msg: 'Something went wrong. Please try again.'
  },
  cart: {
    cart: {
      hasPhysicalProduct: true,
      businessEntityCode: 'DR_INC-ENTITY',
      shippingOptions: {}
    }
  }
};
