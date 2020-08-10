import { Selector } from 'testcafe';
import Config from '../../config';
import HomePage from '../../page-models/public/home-page-model';
import CheckoutPage from '../../page-models/public/checkout-page-model';
import GeneralUtils from '../../utils/genericUtils';
import LoginPage from '../../page-models/public/login-page-model';

const env = Config.env;
const baseURL = Config.baseUrl[env];
const testEmail = Config.testEmail;
const homePage = new HomePage();
const checkoutPage = new CheckoutPage();
const utils = new GeneralUtils();

fixture `===== DRGC P1 Automation Test - Place Order As Guest =====`
  .httpAuth({
    username: Config.websiteAuth['username'],
    password: Config.websiteAuth['password'],
  })
  .beforeEach(async t => {
    console.log('Before Each: Go to Testing Website');
    await t
      .navigateTo(baseURL)
      .setTestSpeed(0.9)
      .maximizeWindow()
      .expect(Selector('body').hasClass('hfeed')).ok()
});

test('Place order with physical product', async t => {
  console.log('Test Case: Place Order with Physical Product');
  const isPhysical = true;
  const isGuest = true;
  await utils.addProductAndProceedToCheckout(homePage.addPhyProduct);

  //Continue as a guest
  console.log('>> Checkout page - Continue checkout as a guest');
  await utils.clickItem(new LoginPage().continueAsGuestBtn);

  // Enter Email and continue
  console.log('>> Checkout page - Entering email');
  await checkoutPage.completeFormEmail(testEmail);
  await utils.fillOrderInfoAndSubmitOrder(isPhysical, isGuest);
});

test('Place order with digital product', async t => {
  console.log('Test Case: Place Order with Digital Product');
  const isPhysical = false;
  const isGuest = true;
  const isVariation = false;
  await utils.addProductAndProceedToCheckout(homePage.addDigiProduct, isVariation);

  //Continue as a guest
  console.log('>> Checkout page - Continue checkout as a guest');
  await utils.clickItem(new LoginPage().continueAsGuestBtn);

  // Enter Email and continue
  console.log('>> Checkout page - Entering email');
  await checkoutPage.completeFormEmail(testEmail);

  await utils.fillOrderInfoAndSubmitOrder(isPhysical, isGuest);
});