import { Selector } from 'testcafe';

export default class AdminPage {
  constructor() {
    this.drLink = Selector('#menu-posts-dr_product > a');
    this.drProductsLink = Selector('#menu-posts-dr_product').find('a').withText('Products');
    this.drVariationsLink = Selector('#menu-posts-dr_product').find('a').withText('Variations');
    this.drSettingsLink = Selector('#menu-posts-dr_product').find('a').withText('Settings');

    this.siteID = Selector('#drgc_site_id');
    this.apiKey = Selector('#drgc_api_key');
    this.apiSecret = Selector('#drgc_api_secret');
    this.domainInput = Selector('#drgc_domain');
    this.pluginKey = Selector('#drgc_digitalRiver_key');
    this.scheduledImport = Selector ('#drgc_cron_handler');
    this.testOrder = Selector ('#drgc_testOrder_handler');
    this.saveBtn = Selector('#submit');

    this.productsImportBtn = Selector('#products-import-btn');
    this.selectAll = Selector('#cb-select-all-1');
    this.bulkActions = Selector('#bulk-action-selector-top');
    this.moveToTrash = Selector('#bulk-action-selector-top').find('option').withText('Move to Trash');
    this.applyBtn = Selector('#doaction');
    this.returnMsg = Selector('#message').find('p');

    this.trashLink = Selector('a').withText('Trash');
    this.emptyTrashBtn = Selector('#delete_all');
    this.importProgress = Selector('#products-import-progress-bar');
    this.importResult = Selector('.is-dismissible');
    this.displayNum = Selector('.displaying-num');
    this.searchProductsInput = Selector('#post-search-input');
    this.searchProductsBtn = Selector('#search-submit');
    this.productTable = Selector('#the-list');
    this.viewTable = Selector('a').withText('View').nth(1);

    this.prodLink = Selector('#sample-permalink');
    this.addToCartBtn = Selector('.dr-buy-btn');

    this.checkoutTab = Selector('.nav-tab').withText('Checkout');

    this.localesTab = Selector('.nav-tab').withText('Locales');
    this.synclocaleBtn = Selector('#dr-sync-locales-btn');

    this.siteSettingsTab = Selector('.wp-menu-name').withText('Settings');
    this.siteSettingsGeneral = Selector('.wp-submenu.wp-submenu-wrap').find('a').withText('General');
  }
}
