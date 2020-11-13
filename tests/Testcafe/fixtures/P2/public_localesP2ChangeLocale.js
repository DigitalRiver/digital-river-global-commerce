import { Selector, t } from 'testcafe';
import HomePage from '../../page-models/public/home-page-model';
import LocaleUtils from '../../utils/localeUtils';
import Config from '../../config';
import ProductUtils from '../../utils/productUtils';
import CheckoutPage from '../../page-models/public/checkout-page-model';
import GeneralUtils from '../../utils/genericUtils';


fixture `===== DRGC P2 Automation Test - Localization: Locale change =====`
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
const localeProdData = new ProductUtils().getLocalTestProduct();
const localeTW = 'zh_TW';
const expectProductMenu = '產品';
const expectCurrencyTW = 'TWD';
const expectShortDescTW = localeProdData.shortDescTW;
const expectLongDescTW = localeProdData.longDescTW;
const expectProductNameTW = localeProdData.productNameTW;

test('Localization - ', async t => {
  console.log('Test Case: Localization: Locale change in product list menu');

  const productName = homePage.addLocaleProduct.parent('div').find('h3');
  const currency = homePage.addLocaleProduct.parent('div').find('p');
  const productMenu = Selector('a').withText(expectProductMenu);
  await t
    .hover(homePage.productsMenu)
    .click(homePage.productsMenu);
  await utils.findTestProduct(homePage.addLocaleProduct);
  await localUtil.changeLocales(localeTW);
  
  checkDisplayAfterSwitchLocale(productName, currency);
  console.log('  Expect product menu changed to ' + expectProductMenu);
  await t.expect(productMenu.exists).ok();
});

test('Localization - ', async t => {
  console.log('Test Case: Localization: Locale change in product detail page');

  const productName = homePage.addLocaleProduct.parent('div').parent('div').find('h1');
  const currency = Selector('#dr-pd-price-wrapper');
  const productMenu = Selector('a').withText(expectProductMenu);
  const productCard = homePage.addLocaleProduct.parent('div');
  const shortDescTW = Selector('.dr-pd-short-desc');
  const longDescTW = Selector('.dr-pd-long-desc');
  
  console.log('Click product card to go to product detail page')
  await t
    .hover(homePage.productsMenu)
    .click(homePage.productsMenu);
  await utils.findTestProduct(homePage.addLocaleProduct);
  await t
    .hover(productCard)
    .click(productCard);
  
  await localUtil.changeLocales(localeTW);
  
  checkDisplayAfterSwitchLocale(productName, currency);
  console.log('  Expect short description to be ' + expectShortDescTW);
  await t.expect(shortDescTW.innerText).eql(expectShortDescTW);
  console.log('  Expect long description to be ' + expectLongDescTW);
  await t.expect(longDescTW.innerText).eql(expectLongDescTW);
  console.log('  Expect product menu to be ' + expectProductMenu);
  await t.expect(productMenu.exists).ok();
});

test('Localization - ', async t => {
  console.log('Test Case: Localization: Minicart, Checkout Page & Thank you page');

  const productNameMinicart = Selector('.dr-minicart-item-title')
  const currency = Selector('.dr-pd-price.dr-minicart-item-price')
  const subtotalCurrency = Selector('.dr-minicart-subtotal').find('span');
  const viewCartBtn = Selector('#dr-minicart-view-cart-btn');
  const expectedViewCartBtn = '查看購物車' ;
  const minicartProdTitle = Selector('.dr-minicart-item-title');

  console.log('>> Add product into cart')
  await t
    .hover(homePage.productsMenu)
    .click(homePage.productsMenu);
  await utils.findTestProduct(homePage.addLocaleProduct);

  await localUtil.changeLocales(localeTW);
  
  await t
    .hover(homePage.addLocaleProduct)
    .click(homePage.addLocaleProduct);

  
  checkDisplayAfterSwitchLocale(productNameMinicart, currency);
  console.log('  Expect Minicart prod title to be ' + expectProductNameTW);
  await t.expect(minicartProdTitle.innerText).eql(expectProductNameTW)
  console.log('  Expect subtotal currency to be ' + expectCurrencyTW);
  await t.expect(subtotalCurrency.innerText).contains(expectCurrencyTW);
  console.log('  Expected view cart btn to be ' + expectedViewCartBtn);
  await t.expect(viewCartBtn.innerText).eql(expectedViewCartBtn);

  const subtotalCurrencyCheckout = Selector('.subtotal-value');
  const taxCurrencyCheckout = Selector('.tax-value');
  const shippingCurrencyCheckout = Selector('.shipping-value');
  const shippingTaxCurrencyCheckout = Selector('.shipping-tax-value');
  const totalCurrencyCheckout = Selector('.total-value');
  const proceedToCheckoutBtn = Selector('a').withText('進行結帳');
  const continueAsGuestBtn = Selector('#dr-guest-btn');
  const prodName = Selector('.product-name');

  console.log(' >> Click view cart button');
  await t.click(viewCartBtn);
  console.log('  Expect subtotal, tax, shipping, shipping tax, and total currency in view cart page contains ' + expectCurrencyTW);
  await t
    .expect(subtotalCurrencyCheckout.innerText).contains(expectCurrencyTW)
    .expect(taxCurrencyCheckout.innerText).contains(expectCurrencyTW)
    .expect(shippingCurrencyCheckout.innerText).contains(expectCurrencyTW)
    .expect(shippingTaxCurrencyCheckout.innerText).contains(expectCurrencyTW)
    .expect(totalCurrencyCheckout.innerText).contains(expectCurrencyTW);
  console.log('  Expect prod name in view cart page to be ' + expectProductNameTW);
  await t.expect(prodName.innerText).eql(expectProductNameTW);

  console.log('>> Continue to Checkout');
  await t
    .click(proceedToCheckoutBtn)
    .click(continueAsGuestBtn);
  console.log('  Expect prod name in checkout page to be ' + expectProductNameTW);
  await t.expect(prodName.innerText).eql(expectProductNameTW);
  
  // Enter Email and continue
  console.log('>> Checkout page - Entering email');
  const isPhysical = true;
  const isGuest = true;
  const isLocaleUS = false;
  const priceTYPage = Selector('.sale-price');

  await new CheckoutPage().completeFormEmail(testEmail);
  await new GeneralUtils().fillOrderInfoAndSubmitOrder(isPhysical, isGuest, isLocaleUS);
  console.log('  Expect TY Page product name to be ' + expectProductNameTW);
  await t.expect(prodName.innerText).eql(expectProductNameTW);
  console.log('  Expect TY page currency to be ' + expectCurrencyTW);
  await t.expect(priceTYPage.innerText).contains(expectCurrencyTW);
});

async function checkDisplayAfterSwitchLocale(productName, currency) {
  const expectAddToCartButton = '添加到購物車';
  console.log('  Expect product name changed to ' + expectProductNameTW);
  await t.expect(productName.innerText).eql(expectProductNameTW);
  console.log('  Expect currency contains ' + expectCurrencyTW);
  await t.expect(currency.innerText).contains(expectCurrencyTW);
  console.log('  Expect add to cart button changed to ' + expectAddToCartButton);
  await t.expect(homePage.addLocaleProduct.innerText).eql(expectAddToCartButton);
}