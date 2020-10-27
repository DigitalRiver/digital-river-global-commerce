import { Selector, t } from 'testcafe';
import ProductUtils from '../utils/productUtils';

export default class LocaleUtils {
  constructor() {
      this.localDropDownBtn = Selector('#dr-locale-selector');
  }

  async checkLocalesList(){
    console.log('>> Check local list display correctly');
    const expectedSelectedLocale = 'United States';
    const expectedLocalList = ['Taiwan', 'Japan', 'France', 'Germany', 'United Kingdom'];
    const selectedLocale = Selector('.dr-dropdown-toggle.nav-link.dr-current-locale');
    const locale = Selector('.menu-item.nav-item');

    await t
      .expect(selectedLocale.innerText).eql(expectedSelectedLocale.toUpperCase());
    for (let i = 0; i < 6; i++) {
      console.log('    ' + i + 'th locale should be ' + expectedLocalList[i].toUpperCase());
      await t.expect(locale.find('li').nth(i).innerText).eql(expectedLocalList[i].toUpperCase());
    }
  }

  async changeLocales(targetLocale) {
    console.log('>> Change locales to ' + targetLocale);
    const localeMenu = Selector('.dr-dropdown-toggle.nav-link.dr-current-locale');
    const locale = Selector('.menu-item.nav-item').find('a[data-dr-locale="' + targetLocale + '"]');
    await t
      .hover(localeMenu)
      .hover(locale)
      .click(locale);
  }

  async switchCurrency(targetCurrency) {
    console.log('>> Switch currency to ' + targetCurrency);
    const currencyMenu = Selector('#dr-currency-selector');
    const currency = Selector('.menu-item.nav-item').find('a[data-dr-currency="' + targetCurrency +'"]');

    await t
      .hover(currencyMenu)
      .hover(currency)
      .click(currency);
  }
}
