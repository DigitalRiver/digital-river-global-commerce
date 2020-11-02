import { Selector, t, ClientFunction } from 'testcafe';
import HomePage from '../../page-models/public/home-page-model';
import LocaleUtils from '../../utils/localeUtils';
import Config from '../../config';
import CheckoutPage from '../../page-models/public/checkout-page-model';
import GeneralUtils from '../../utils/genericUtils';

fixture `===== DRGC P1 Automation Test - Localization: Locale change =====`
  .beforeEach(async t => {
    console.log('Before Each: Go to Testing Website');
      await t
        .setTestSpeed(0.9)
        .navigateTo(baseURL)
        .maximizeWindow();
});

const homePage = new HomePage();
const localUtil = new LocaleUtils();
const utils = new GeneralUtils();
const baseURL = Config.baseUrl[Config.env];
const testEmail = Config.testEmail;
const localeTW = 'zh_TW';
const expectProductMenu = '產品';
const getURL = ClientFunction(() => window.location.href);
const productCard = homePage.addLocaleProduct.parent('div');
const productMenu = Selector('a').withText(expectProductMenu);

test('Localization - ', async t => {
  console.log('Test Case: Localization: Currency change in product list menu');
  const viewCartBtn = Selector('#dr-minicart-view-cart-btn');
  const proceedToCheckoutBtn = Selector('a').withText('進行結帳');
  const continueAsGuestBtn = Selector('#dr-guest-btn');

  let url = await getURL();
  console.log('Expect the default url doesn\'t contain locale');
  await t.expect(url).notContains('locale');
  
  console.log('Expect the url contains locale after changing locale');
  await localUtil.changeLocales(localeTW);
  await checkUrl();

  console.log('Expect the url contains locale after go to product page');
  await t
    .hover(productMenu)
    .click(productMenu);
  await checkUrl();

  console.log('Expect the url contains locale in product detail page');
  await utils.findTestProduct(homePage.addLocaleProduct);
  await t
    .hover(productCard)
    .click(productCard)
    .wait(3000);
  await checkUrl();

  console.log('Expect the url contains locale in view cart page');
  await t
    .hover(homePage.addLocaleProduct)
    .click(homePage.addLocaleProduct)
    .hover(viewCartBtn)
    .click(viewCartBtn);
  await checkUrl();

  console.log('Expect the url contains locale in checkout page');
  await t.click(proceedToCheckoutBtn)
  await checkUrl();
  await t.click(continueAsGuestBtn);
  await checkUrl();

  // Enter Email and continue
  console.log('>> Checkout page - Entering email');
  const isPhysical = true;
  const isGuest = true;
  const isLocaleUS = false;
  
  console.log('Expect the url contains locale in TY page');
  await new CheckoutPage().completeFormEmail(testEmail);
  await utils.fillOrderInfoAndSubmitOrder(isPhysical, isGuest, isLocaleUS);
  await checkUrl();
});

async function checkUrl() {
  const url = await getURL();
  const url_TW = 'locale=' + localeTW;
  await t.expect(url).contains(url_TW);
}
