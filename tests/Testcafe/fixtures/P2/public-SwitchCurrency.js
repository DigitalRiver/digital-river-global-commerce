import { Selector, t } from 'testcafe';
import Config from '../../config';
import HomePage from '../../page-models/public/home-page-model';
import MinicartPage from '../../page-models/public/minicart-page-model';
import GeneralUtils from '../../utils/genericUtils';
import LoginPage from '../../page-models/public/login-page-model';
import ProductUtils from '../../utils/productUtils'

const env = Config.env;
const baseURL = Config.baseUrl[env];
const homePage = new HomePage();
const minicartPage = new MinicartPage();
const utils = new GeneralUtils();
const physicalProdName = new ProductUtils().getTestingPhysicalProduct().productName;

fixture `===== DRGC P2 Automation Test - Currency Unit When Switch Currency'=====`
  .httpAuth({
    username: Config.websiteAuth['username'],
    password: Config.websiteAuth['password'],
  })
  .beforeEach(async t => {
    console.log('Before Each: Click Menu -> Product to Enter Product Page');
    await t
      .navigateTo(baseURL)
      .maximizeWindow()
      .click(homePage.productsMenu)
      .expect(Selector('body').hasClass('hfeed')).ok();
});

test('Switch Currency: Product Page', async t => {
  console.log('Test Case: Check the unit of currency after switching currency in Product Page.');
  const price = Selector('.c-product-card-content__text').withText(physicalProdName.toUpperCase()).parent(2).find('span');
  await switchCurrencyFromUsdToEur();
  console.log('>> Default USD, switch currency to EUR and check the currency display correctly');
  await t.expect(price.innerText).contains('EUR');
});

test('Switch Currency: Detail Page', async t => {
  console.log('Test Case: Check the unit of currency after switching currency in Detail Page.');
  const firstProduct = Selector('.c-product-card-content__text').withText(physicalProdName.toUpperCase());
  const price = Selector('.product-price').nth(0);
  await t.click(firstProduct);
  console.log('>> Default USD, switch currency to EUR and check the currency display correctly');
  await switchCurrencyFromUsdToEur();
  await t.expect(price.innerText).contains('EUR');
});

test('Switch Currency: Cart Page', async t => {
  console.log('Test Case: Check the unit of currency after switching currency in Cart Page.');
  await utils.addProductsIntoCart(homePage.addPhyProduct);
  await minicartPage.clickViewCartBtn();

  console.log('>> Default USD, switch currency to EUR and check the currency display correctly');
  await checkPriceUnitInCart('$')
  await switchCurrencyFromUsdToEur();
  await checkPriceUnitInCart('EUR')
});

async function checkPriceUnitInCart(unit) {
  const currencyTitle = Selector('.dr-currency-toggler').find('span').innerText;
  const priceProductInCart = Selector('.sale-price').nth(0).innerText;
  const priceSubTotal = Selector('.discounted-subtotal-value').innerText;
  const priceEstShipping = Selector('.shipping-value').innerText;
  await t
    .expect(currencyTitle).eql('Currency: ')
    .expect(priceProductInCart).contains(unit)
    .expect(priceSubTotal).contains(unit)
    .expect(priceEstShipping).contains(unit);
}

async function checkPriceUnitInCheckout(unit) {
  const currencyTitle = Selector('.dr-currency-toggler').find('span').innerText;
  const priceProductInCart = Selector('.sale-price').nth(0).innerText;
  const priceSubTotal = Selector('.subtotal-value').innerText;
  const priceEstTax = Selector('.dr-summary__tax').find('p').nth(1).innerText;
  const priceEstShipping = Selector('.dr-summary__shipping').find('p').nth(1).innerText;
  const priceTotal = Selector('.total-value').innerText;
  await t
    .expect(currencyTitle).eql('Currency: ')
    .expect(priceProductInCart).contains(unit)
    .expect(priceSubTotal).contains(unit)
    .expect(priceEstTax).contains(unit)
    .expect(priceEstShipping).contains(unit)
    .expect(priceTotal).contains(unit);
}

async function switchCurrencyFromUsdToEur() {
  const currencyTitle = Selector('.dr-currency-toggler').find('span').innerText;
  const currency = Selector('.custom-select.dr-currency-select');
  const currencyOption = currency.find('option');
  await t
    .expect(currencyTitle).eql('Currency: ')
    .expect(currency.value).eql('USD')
    .hover(currency)
    .click(currency)
    .click(currencyOption.withText('EUR'))
    .expect(currency.value).eql('EUR');
}