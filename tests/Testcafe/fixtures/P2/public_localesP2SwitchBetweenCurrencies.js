import { Selector, t } from 'testcafe';
import HomePage from '../../page-models/public/home-page-model';
import LocaleUtils from '../../utils/localeUtils';
import GenericUtils from '../../utils/genericUtils';
import Config from '../../config';

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
const utils = new GenericUtils();
const baseURL = Config.baseUrl[Config.env];
const localeTW = 'zh_TW';
const expectCurrency = {TWD: 'TWD', USD: 'USD'};
const defaultCurrency = Selector('.dr-dropdown-toggle.nav-link.dr-selected-currency');
const expectDefaultCurrency = 'TWD';

test('Localization - ', async t => {
  console.log('Test Case: Localization: Currency change in product list menu');
  const currencySymbol = homePage.addLocaleProduct.parent('div').find('p');

  await t
    .hover(homePage.productsMenu)
    .click(homePage.productsMenu);
  await utils.findTestProduct(homePage.addLocaleProduct);
  await localUtil.changeLocales(localeTW);
  
  console.log('Expect currency contains ' + expectCurrency['TWD']);
  await t.expect(currencySymbol.innerText).contains(expectCurrency['TWD']);
  console.log('Expect default select currency to be ' + expectDefaultCurrency);
  await t.expect(defaultCurrency.innerText).eql(expectDefaultCurrency);

  await localUtil.switchCurrency('USD');
  await checkCurrencyDisplay('USD', 'TWD', currencySymbol);
  await localUtil.switchCurrency('TWD');
  await checkCurrencyDisplay('TWD', 'USD', currencySymbol);
});

test('Localization - ', async t => {
  console.log('Test Case: Localization: Currency change in product detail page');
  const productCard = homePage.addLocaleProduct.parent('div');
  const currencySymbol = Selector('.dr-sale-price');

  console.log('Click product card to go to product detail page')
  await t
    .hover(homePage.productsMenu)
    .click(homePage.productsMenu);
  await new GenericUtils().findTestProduct(homePage.addLocaleProduct);
  await t
    .hover(productCard)
    .click(productCard);
  await localUtil.changeLocales(localeTW);
  
  console.log('Expect currency contains ' + expectCurrency['TWD']);
  await t.expect(currencySymbol.innerText).contains(expectCurrency['TWD']);
  console.log('Expect default select currency to be ' + expectDefaultCurrency);
  await t.expect(defaultCurrency.innerText).eql(expectDefaultCurrency);
  
  await localUtil.switchCurrency('USD');
  await checkCurrencyDisplay('USD', 'TWD', currencySymbol);
  await localUtil.switchCurrency('TWD');
  await checkCurrencyDisplay('TWD', 'USD', currencySymbol);
});

async function checkCurrencyDisplay(currency, extraCurrencyItem, currencySymbol) {
  console.log('>> Check display after switch currency to ' + currency);
  const currencyItem = Selector('.dr-dropdown-menu.dr-other-currencies').find('a');

  console.log('    Expect select currency to be ' + currency);
  await t.expect(defaultCurrency.innerText).eql(currency);
  console.log('    Expect currency list item contains ' + extraCurrencyItem);
  await t.expect(currencyItem.innerText).eql(extraCurrencyItem);
  console.log('    Expect currency contains symbol ' + expectCurrency[currency]);
  await t.expect(currencySymbol.innerText).contains(expectCurrency[currency]);

}