import { ClientFunction, t } from 'testcafe';
import Config from '../../config';
import HomePage from '../../page-models/public/home-page-model';
import CheckoutPage from '../../page-models/public/checkout-page-model';
import TYPage from '../../page-models/public/ty-page-model';
import GenericUtils from '../../utils/genericUtils';
import LoginPage from '../../page-models/public/login-page-model';

fixture `===== DRGC P1 Automation Test - Place Order Sign In =====`
  .httpAuth({
    username: Config.websiteAuth['username'],
    password: Config.websiteAuth['password'],
  })
  .beforeEach(async t => {
    console.log('Before Each: Go to Testing Website');
    await t
      .setTestSpeed(0.9)
      .navigateTo(baseURL)
      .maximizeWindow();
});;

const env = Config.env;
const baseURL = Config.baseUrl[env];
const homePage = new HomePage();
const checkoutPage = new CheckoutPage();
const loginPage = new LoginPage();
const utils = new GenericUtils();
const newUser = utils.getNewUser();
const isPhysical = true;
const isGuest = false;
const isLocalUs = true;
test('Place order as a new customer: Checkout first then Sigin', async t => {
  console.log('Test Case: Place Order as a New Customer: Checkout First then Signin');

  // Go to login page to create a new user
  console.log('>> Create a New User');
  console.log('  -> Click Login Button and Direct to Login Page');
  await t.click(loginPage.loginMenu);
  await loginPage.createNewCustomer(newUser);
  await loginPage.userLogout();

  await utils.addProductAndProceedToCheckout(homePage.addPhyProduct);
  await checkRedirectToLoginPage();

  console.log('>> Login with an existent user');
  await loginPage.userSignIn(newUser);

  console.log('>> Check it will auto fill user\'s firstname and lastname');
  const autoFirstName = await checkoutPage.shippingFirstName.value;
  const autoLastName = await checkoutPage.shippingLastName.value;
  await t.expect(autoFirstName.toUpperCase()).eql(newUser.firstName);
  await t.expect(autoLastName.toUpperCase()).eql(newUser.lastName);

  await utils.fillOrderInfoAndSubmitOrder(isPhysical, isGuest, isLocalUs);
});

test('Place order as a new customer: Regiser as a new customer when checkout', async t => {
  console.log('Test Case: Place Order as a New Customer: Regiser as a new customer when checkout');

  const user = utils.getNewUser();
  await utils.addProductAndProceedToCheckout(homePage.addPhyProduct);
  await checkRedirectToLoginPage();
  // Go to login page to create a new user
  console.log('>> Create a New User');
  await loginPage.createNewCustomer(user);

  console.log('>> Check it will auto fill user\'s firstname and lastname');
  const autoFirstName = await checkoutPage.shippingFirstName.value;
  const autoLastName = await checkoutPage.shippingLastName.value;
  await t.expect(autoFirstName.toUpperCase()).eql(newUser.firstName);
  await t.expect(autoLastName.toUpperCase()).eql(newUser.lastName);

  await utils.fillOrderInfoAndSubmitOrder(isPhysical, isGuest, isLocalUs);
});
/*
test('Place order as a new customer: Signin first then checkout', async t => {
  console.log('Test Case: Place Order as a New Customer: Signin First then Checkout');

  console.log('  -> Click Login Button and Direct to Login Page');
  await t.click(loginPage.loginMenu);
  await checkRedirectToLoginPage();

  console.log('>> Login with Existing User Account');
  await loginPage.userSignIn(newUser);

  await utils.addProductAndProceedToCheckout(homePage.addPhyProduct);

  const tyPage = new TYPage();

  // Enter shipping info
  console.log('>> Checkout page - Use auto filled shipping info to checkout');
  await utils.clickItem(checkoutPage.shippingBtn);
  await t.expect(checkoutPage.useSameAddrCheckbox.exists).ok();

  // Set billing info as diff from shipping info
  // If checkbox is checked, the billing info will be set to same as shipping info
  await utils.checkCheckBox(checkoutPage.useSameAddrCheckbox, false);

  console.log('>> Check it will auto fill billing info from the last order record');
  const billingInfo = utils.getBillingUserData();
  await t
    .expect(checkoutPage.shippingFirstName.value).eql(billingInfo.firstName)
    .expect(checkoutPage.shippingLastName.value).eql(billingInfo.lastName)
    .expect(checkoutPage.shippingAddress1.value).eql(billingInfo.addrLine1)
    .expect(checkoutPage.shippingCity.value).eql(billingInfo.city)
    .expect(checkoutPage.shippingCountry.value).eql(billingInfo.countryValue)
    .expect(checkoutPage.shippingState.value).eql(billingInfo.stateValue)
    .expect(checkoutPage.shippingPostalCode.value).eql(billingInfo.postCode);


  console.log('>> Checkout page - Use auto filled billing info to checkout');
  await utils.clickItem(checkoutPage.billingInfoSubmitBtn);

  await t.expect(checkoutPage.deliveryOptionSubmitBtn.exists).ok();
  // Set delivery option
  console.log('>> Checkout page - Set Delivery Options as Standard');
  await checkoutPage.setDeliveryOption('standard');
  await t.expect(checkoutPage.submitPaymentBtn.exists).ok();

  // Enter Payment Info
  console.log('>> Checkout page - Entering Payment Info.');
  await checkoutPage.completeFormCreditCardInfo();

  // Agree to Terms of Sales and Privacy Policy then submit order
  console.log('>> Checkout page - agree to Terms of Sale');
  await utils.checkCheckBox(checkoutPage.checkboxTermsofSaleAndPolicy, true);
  // Submit Order
  console.log('>> Checkout page - Place order');
  await t
    .takeScreenshot('BWC/payment_s.jpg')
    .click(checkoutPage.submitOrderBtn)
    .expect(tyPage.tyMsg.innerText).eql('Your order was completed successfully.')
    .takeScreenshot('BWC/TY_s.jpg');

  console.log('>> Directs to the TY page');
  const orderNum = await tyPage.orderNumber.textContent;
  console.log(orderNum.trim());
});
*/
async function checkRedirectToLoginPage() {
  console.log('>> Check it redirect to login page');
  const url = ClientFunction(() => document.location.href);
  await t.expect(url()).contains('login');
}

