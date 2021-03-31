import CheckoutUtils from '../../../assets/js/public/checkout-utils';

describe('Checkout Utils', () => {
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

  describe('Test updateSummaryLabels function', () => {
    let deliverySection, paymentSection, taxLabel, shippingLabel;
    beforeAll(() => {
      document.body.innerHTML = `
        <div class="dr-checkout-wrapper__content">
          <div class="dr-checkout">
            <div class="dr-checkout__email"></div>
            <div class="dr-checkout__shipping"></div>
            <div class="dr-checkout__billing"></div>
            <div class="dr-checkout__delivery"></div>
            <div class="dr-checkout__payment"></div>
            <div class="dr-checkout__confirmation"></div>
          </div>
          <div class="dr-summary">
            <div class="dr-summary__tax">
              <p class="item-label">Estimated Tax</p>
              <p class="item-label">0.00USD</p>
            </div>
            <div class="dr-summary__shipping">
              <p class="item-label">Estimated Shipping</p>
              <p class="item-label">5.00USD</p>
            </div>
          </div>
        </div>`;

      deliverySection = document.getElementsByClassName('dr-checkout__shipping')[0];
      paymentSection = document.getElementsByClassName('dr-checkout__payment')[0];
      taxLabel = document.querySelector('.dr-summary__tax .item-label');
      shippingLabel = document.querySelector('.dr-summary__shipping .item-label');
    });

    test('It should display "Estimated" at tax/shipping label when the section is unfinished', () => {
      deliverySection.classList.add('active');
      paymentSection.classList.remove('active');
      drgc_params.shouldDisplayVat = 'false';
      CheckoutUtils.updateSummaryLabels();
      expect(taxLabel.innerHTML).toEqual('Estimated Tax');
      expect(shippingLabel.innerHTML).toEqual('Estimated Shipping');
    });

    test('It should NOT display "Estimated" at tax/shipping label when the section is finished', () => {
      deliverySection.classList.remove('active');
      paymentSection.classList.add('active');
      drgc_params.shouldDisplayVat = 'false';
      CheckoutUtils.updateSummaryLabels();
      expect(taxLabel.innerHTML).toEqual('Tax');
      expect(shippingLabel.innerHTML).toEqual('Shipping');
    });

    test('It should display "Estimated VAT" when currency is GBP/EUR and the section is unfinished', () => {
      deliverySection.classList.add('active');
      paymentSection.classList.remove('active');
      drgc_params.shouldDisplayVat = 'true';
      CheckoutUtils.updateSummaryLabels();
      expect(taxLabel.innerHTML).toEqual('Estimated VAT');
    });

    test('It should display "VAT" when currency is GBP/EUR and the section is finished', () => {
      deliverySection.classList.remove('active');
      paymentSection.classList.add('active');
      drgc_params.shouldDisplayVat = 'true';
      CheckoutUtils.updateSummaryLabels();
      expect(taxLabel.innerHTML).toEqual('VAT');
    });
  });

  describe('Test getCountryOptionsFromGC function', () => {
    test('It should call AJAX for getting country options from GC SimpleRegistrationPage', () => {
      drgc_params.drLocale = 'en_GB';
      $.ajax = jest.fn().mockImplementation(() => {
        return Promise.resolve('<!DOCTYPE html><html xml:lang="en" lang="en"></html>');
      });

      CheckoutUtils.getCountryOptionsFromGC();
      expect($.ajax).toBeCalledWith({
        type: 'GET',
        url:  'https://drh-fonts.img.digitalrivercontent.net/store/drdod15/en_GB/DisplayPage/id.SimpleRegistrationPage',
        cache: false,
        success: expect.any(Function),
        error: expect.any(Function)
      });
    });
  });

});
