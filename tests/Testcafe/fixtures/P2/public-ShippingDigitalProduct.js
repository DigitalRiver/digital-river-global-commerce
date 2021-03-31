import { Selector, t } from 'testcafe';
import Config from '../../config';
import HomePage from '../../page-models/public/home-page-model';
import MinicartPage from '../../page-models/public/minicart-page-model';
import CartPage from '../../page-models/public/cart-page-model';
import CheckoutPage from '../../page-models/public/checkout-page-model';
import LoginPage from '../../page-models/public/login-page-model';
import GeneralUtils from '../../utils/genericUtils';

const env = Config.env;
const baseURL = Config.baseUrl[env];
const homePage = new HomePage();
const minicartPage = new MinicartPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const utils = new GeneralUtils();

fixture `===== DRGC P2 Automation Test - No Shipping for Digital Products =====`
  .httpAuth({
    username: Config.websiteAuth['username'],
    password: Config.websiteAuth['password'],
  })
  .beforeEach(async t => {
    console.log('Before Each: Click Menu -> Product to Enter Product Page');
    await t
      .navigateTo(baseURL)
      .maximizeWindow();
});

test('Estimated Shipping Fee - Standard free Shipping', async t => {
  console.log('Test Case: Check there is no shipping info for Digital Product');

  // Add a physical product into cart
  console.log('>> Add Digital product into cart');
  let isVariationProduct = false;
  await t.setTestSpeed(0.9);
  await utils.addProductsIntoCart(homePage.addDigiProduct, isVariationProduct);
  await t.takeScreenshot('BWC/minicart.jpg');

  // Click View Cart btn in miniCart to go to Cart page
  console.log('>> Direct to cart page');
  await minicartPage.clickViewCartBtn();

  // Change quantity to make the total purchase exceed the free shipping total
  console.log('>> No Shipping info for Digital Product');
  await t.expect(checkoutPage.shippingSummaryTitle.visible).notOk();
  await t.expect(cartPage.estimatedShippingValue.visible).notOk();

  // Click Proceed to Checkout in View Cart page to proceed checkout
  console.log('>> Direct to checkout page, no shipping info for Digital Product');
  await utils.clickItem(cartPage.proceedToCheckoutBtn);
  await utils.clickItem(new LoginPage().continueAsGuestBtn);
  await t.expect(checkoutPage.shippingSummaryTitle.exists).notOk();
  await t.expect(checkoutPage.shippingSummaryValue.exists).notOk();
});
