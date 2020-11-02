import { Selector, t } from 'testcafe';
import GeneralUtils from '../../utils/genericUtils';

export default class CheckoutPage {
  constructor() {
    this.utils = new GeneralUtils();
    this.primary = Selector('#primary');

    this.email = Selector('#checkout-email-form').find('input');
    this.emailTexts = Selector('#dr-panel-email-result');

    this.emailBtn = Selector('#checkout-email-form > button');
    this.shippingBtn = Selector('#checkout-shipping-form > button');
    this.longinBillingInfoSubmitBtn = Selector('#checkout-billing-form').find('button').nth(1);
    this.guestBillingInfoSubmitBtn = Selector('#checkout-billing-form > button');
    this.deliverByExpress = Selector('#shipping-option-8196700');
    this.deliverByStandard = Selector('#shipping-option-167400');
    this.deliveryOptionSubmitBtn = Selector('#checkout-delivery-form > button');
    this.useSameAddrCheckbox = Selector('#checkbox-billing');
    this.submitOrderBtn = Selector("#checkout-confirmation-form > button");

    this.shippingFirstName = Selector('#shipping-field-first-name');
    this.shippingLastName = Selector('#shipping-field-last-name');
    this.shippingAddress1 = Selector('#shipping-field-address1');
    this.shippingCity = Selector('#shipping-field-city');
    this.shippingState = Selector('#shipping-field-state');
    this.shippingPostalCode = Selector('#shipping-field-zip');
    this.shippingCountry = Selector('#shipping-field-country');
    this.shippingPhoneNumber = Selector('#shipping-field-phone');

    // Billing Address Info.
    this.billingFirstName = Selector('#billing-field-first-name');
    this.billingLastName = Selector('#billing-field-last-name');
    this.billingAddress1 = Selector('#billing-field-address1');
    this.billingCity = Selector('#billing-field-city');
    this.billingPostalCode = Selector('#billing-field-zip');
    this.billingState = Selector('#billing-field-state');
    this.billingCountry = Selector('#billing-field-country');
    this.billingPhoneNumber = Selector('#billing-field-phone');

    // Payment Info.
    this.creditCardDiv = Selector('#dr-payment-info');
    this.cardNumberIframe = this.creditCardDiv.find('iframe').nth(0);
    this.ccNumber = Selector('#ccNumber');
    this.cardExpIframe = this.creditCardDiv.find('iframe').nth(1);
    this.ccExpiry = Selector('#ccExpiry');
    this.cardCVVIframe = this.creditCardDiv.find('iframe').nth(2);
    this.ccCVV = Selector('#ccCVV');
    this.submitPaymentBtn = this.creditCardDiv.find('button[type="submit"]');

    // Shipping Summary
    this.shippingSummaryTitle = Selector('.dr-summary__shipping').find('p').nth(0);
    this.shippingSummaryValue = Selector('.dr-summary__shipping').find('p').nth(1);

    // Terms of Sale & Privacy
    this.checkboxTermsofSaleAndPolicy = Selector('#dr-tAndC');
  }

  async completeFormEmail(testEmail) {
    await t
      .typeText(this.email, testEmail)
      .hover(this.emailBtn)
      .click(this.emailBtn);
  }

  async completeFormShippingInfo(isLocaleUS = true) {
    const shippingInfo = this.utils.getShippingUserData();
    const shippingStateOption = this.shippingState.find('option');
    const shippingCountryOption = this.shippingCountry.find('option');

    await t
      .typeText(this.shippingFirstName, shippingInfo.firstName, { replace: true })
      .typeText(this.shippingLastName, shippingInfo.lastName, { replace: true })
      .typeText(this.shippingAddress1, shippingInfo.addrLine1)
      .typeText(this.shippingCity, shippingInfo.city)
    if (isLocaleUS){
      await t
        .hover(this.shippingCountry)
        .click(this.shippingCountry)
        .click(shippingCountryOption.withText(shippingInfo.country))
        .expect(this.shippingCountry.value).eql(shippingInfo.countryValue)
        .hover(this.shippingState)
        .click(this.shippingState)
        .click(shippingStateOption.withText(shippingInfo.state))
        .expect(this.shippingState.value).eql(shippingInfo.stateValue);
    }
    await t
      .typeText(this.shippingPostalCode, shippingInfo.postCode)
      .typeText(this.shippingPhoneNumber, shippingInfo.phoneNo)
      .hover(this.shippingBtn)
      .click(this.shippingBtn);
  }

  async completeFormBillingInfo(isGuest, isLocaleUS = true) {
    const billingInfo = this.utils.getBillingUserData();
    const billingStateOption = this.billingState.find('option');
    const billingCountryOption = this.billingCountry.find('option');

    await t
      .typeText(this.billingFirstName, billingInfo.firstName, { replace: true })
      .typeText(this.billingLastName, billingInfo.lastName, { replace: true })
      .typeText(this.billingAddress1, billingInfo.addrLine1)
      .typeText(this.billingCity, billingInfo.city)
    if (isLocaleUS){
      await t
        .hover(this.billingCountry)
        .click(this.billingCountry)
        .click(billingCountryOption.withText(billingInfo.country))
        .expect(this.billingCountry.value).eql(billingInfo.countryValue)
        .hover(this.billingState)
        .click(this.billingState)
        .click(billingStateOption.withText(billingInfo.state))
        .expect(this.billingState.value).eql(billingInfo.stateValue);
    }
    await t
      .typeText(this.billingPostalCode, billingInfo.postCode)
      .typeText(this.billingPhoneNumber, billingInfo.phoneNo);

    if (isGuest) {
      await t
        .hover(this.guestBillingInfoSubmitBtn)
        .click(this.guestBillingInfoSubmitBtn);
    } else {
      await t
        .hover(this.longinBillingInfoSubmitBtn)
        .click(this.longinBillingInfoSubmitBtn);
    }
  }

  async setDeliveryOption(deliveryOption) {
    if (deliveryOption === 'express') {
      await this.utils.clickItem(this.deliverByExpress);
    }
    else if (deliveryOption === 'standard') {
      await this.utils.clickItem(this.deliverByStandard);
    }

    await this.utils.clickItem(this.deliveryOptionSubmitBtn);
  }

  async completeFormCreditCardInfo() {
    const creditCardInfo = this.utils.getCreditCardInfo();

    await t
      .switchToIframe(this.cardNumberIframe)
      .typeText(this.ccNumber, creditCardInfo.cardNo)
      .switchToMainWindow()
      .switchToIframe(this.cardExpIframe)
      .typeText(this.ccExpiry, creditCardInfo.expiry)
      .switchToMainWindow()
      .switchToIframe(this.cardCVVIframe)
      .typeText(this.ccCVV, creditCardInfo.cvv)
      .switchToMainWindow()
      .hover(this.submitPaymentBtn)
      .click(this.submitPaymentBtn);
  }
}
