import { ClientFunction, t } from 'testcafe';
import AdminPage from '../page-models/admin/admin-page-model';
import SiteSettings from '../siteConfig';
import GenericUtils from '../utils/genericUtils';

export default class AdminUtils {
  constructor() {
    this.adminPage = new AdminPage();
    this.utils = new GenericUtils();
    this.getLocation = ClientFunction(() => document.location.href.toString());
  }

  async updateSiteSettings(testSite){
    console.log('>> Enter site settings page');
    await this.utils.clickItem(this.adminPage.drLink);
    await this.utils.clickItem(this.adminPage.drSettingsLink);

    console.log('>> Update site settings');
    const site = SiteSettings[testSite];
    await t
      .typeText(this.adminPage.siteID, site['siteID'], { replace: true })
      .typeText(this.adminPage.apiKey, site['apiKey'], { replace: true })
      .typeText(this.adminPage.apiSecret, site['apiSecret'], { replace: true })
      .typeText(this.adminPage.domainInput, site['domainInput'], { replace: true })
      .typeText(this.adminPage.pluginKey, site['pluginKey'], { replace: true });

    console.log('  -> Enable schedule import option');
    await this.utils.checkCheckBox(this.adminPage.scheduledImport, true);

    console.log('  -> Enable test order option');
    await t
      .hover(this.adminPage.checkoutTab)
      .click(this.adminPage.checkoutTab);
    await this.utils.checkCheckBox(this.adminPage.testOrder, true);

    console.log('  -> Save site settings changes');
    await this.utils.clickItem(this.adminPage.saveBtn);
  }

  async importData(){
    await t.setTestSpeed(0.7);
    await this.utils.clickItem(this.adminPage.drLink);
    await this.utils.clickItem(this.adminPage.drProductsLink);

    console.log('>> Start to import products');
    await this.utils.clickItem(this.adminPage.productsImportBtn);

    const sel1 = this.adminPage.importProgress.with({visibilityCheck:true}).nth(0);
    await t.expect(sel1.exists).ok({timeout:20000});
    const sel2 = this.adminPage.importProgress;
    await t
      .expect(sel2.with({visibilityCheck: true}).exists).notOk({timeout:600000})
      .expect(this.getLocation()).contains('&import-complete=1');

    await this.utils.clickItem(this.adminPage.drProductsLink);
    console.log(' >>', await this.adminPage.displayNum.textContent + ' have been successfully imported!');
  }

  async emptyProducts(){
    await this.utils.clickItem(this.adminPage.drLink);
    await this.utils.clickItem(this.adminPage.drProductsLink);
    await t.expect(this.adminPage.productsImportBtn.exists).ok();
    await this.utils.clickItem(this.adminPage.selectAll);

    await this.adminPage.bulkActions.with({visibilityCheck:true});

    await this.utils.clickItem(this.adminPage.bulkActions);
    await this.utils.clickItem(this.adminPage.moveToTrash);
    await this.utils.clickItem(this.adminPage.applyBtn);

    await t.expect(this.adminPage.returnMsg.textContent).contains('posts moved to the Trash');

    console.log('>> Empty Trash');

    await this.utils.clickItem(this.adminPage.trashLink);
    await this.utils.clickItem(this.adminPage.emptyTrashBtn);

    await t.expect(this.adminPage.returnMsg.textContent).contains('posts permanently deleted');
  }
}
