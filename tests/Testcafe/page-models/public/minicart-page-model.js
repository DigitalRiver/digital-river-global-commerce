import { Selector, t, ClientFunction } from 'testcafe';

export default class MinicartPage {
  constructor() {
    this.miniCartToggle = Selector('.dr-minicart-toggle');
    this.viewCartBtn = Selector('#dr-minicart-view-cart-btn');
    this.checkoutBtn = Selector('#dr-minicart-checkout-btn');
  }

  async clickViewCartBtn() {
    const getURL = ClientFunction(() => window.location.href);
    await t
      .wait(5000)
      .hover(this.miniCartToggle)
      .click(this.miniCartToggle)
      .hover(this.viewCartBtn)
      .click(this.viewCartBtn)
      .expect(getURL()).contains('cart', {timeout: 15000})
      .expect(Selector('a').withText('PROCEED TO CHECKOUT').exists).ok();
  }

  async clickCheckoutBtn() {
    await t
      .wait(5000)
      .click(this.checkoutBtn)
      .expect(Selector('.dr-btn').exists).ok();
  }
}
