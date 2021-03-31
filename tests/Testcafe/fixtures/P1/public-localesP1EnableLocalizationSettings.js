import { Selector, t } from 'testcafe';
import AdminRole from '../../utils/adminRole';
import AdminPage from '../../page-models/admin/admin-page-model';
import GenericUtils from '../../utils/genericUtils';

fixture `===== DRGC P1 Automation Test - Localization: Enable localization Settings =====`;
const adminPage = new AdminPage();
const utils = new GenericUtils();

test('DR Site Settings - ', async t => {
  console.log('Test Case: Locales Settings - Enable DR Locales Settings');
  console.log('>> Enter admin settings page');
  await t
    .setTestSpeed(0.8)
    .useRole(AdminRole)
    .maximizeWindow();

  await updateLocalizationSettings();
  await checkLocalizationSiteSettings();
});

async function updateLocalizationSettings() {
  const btnSending = Selector('.button.sending');
  const syncComplete = Selector('.notice.notice-success.is-dismissible').find('p').withText('Sync Complete!');
  const btnSave = Selector('#submit');
  const expectLocalesList = ['zh_TW', 'ja_JP', 'fr_FR', 'en_US', 'de_DE', 'en_GB'];
  
  console.log('>> Enter dr settings page');
  await t
    .hover(adminPage.drLink)
    .wait(1000);
  await utils.clickItem(adminPage.drSettingsLink);
  
  console.log('>> Enable localization settings');
  await utils.clickItem(adminPage.localesTab);
  await utils.clickItem(adminPage.synclocaleBtn);
  await t
    .expect(btnSending.with({visibilityCheck: true}).exists).notOk({timeout:600000})
    .expect(syncComplete.exists).ok();
  
  console.log('>> Save localization settings');
  await utils.clickItem(btnSave);

  console.log('>> Check the locales list is equal to ' + expectLocalesList.toString());
  const locales = Selector('.form-table').find('table').find('tbody').find('tr');
  for (let i = 0; i < 6; i++) {
    console.log(('    ' + i + 'th locale should be ' + expectLocalesList[i]));
    await t.expect(locales.nth(i).find('td').nth(0).innerText).eql(expectLocalesList[i]);
  }
}

async function checkLocalizationSiteSettings() {
  console.log('>> Enter Site settings page');
  const expectedInstalledLocales = ['English (United States)', 'Deutsch', 'English (UK)', 'Français', '日本語', '繁體中文'];
  const siteLanguageInstalled = Selector('#WPLANG').find('optgroup[label="Installed"]');
  await t
    .hover(adminPage.siteSettingsTab)
    .wait(1000);
  await utils.clickItem(adminPage.siteSettingsGeneral);

  console.log('>> Check the Installed locales list is equal to ' + expectedInstalledLocales.toString());
  await t.expect(siteLanguageInstalled.exists).ok();
  for (let i = 0; i < 6; i++) {
    console.log('    ' + i + 'th installed locale should be ' + expectedInstalledLocales[i]);
    await t.expect(siteLanguageInstalled.find('option').nth(i).innerText).eql(expectedInstalledLocales[i]);
  }
}