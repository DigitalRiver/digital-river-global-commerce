import { Selector, t } from 'testcafe';
import Config from '../../config';
import HomePage from '../../page-models/public/home-page-model';
import MinicartPage from '../../page-models/public/minicart-page-model';
import GeneralUtils from '../../utils/genericUtils';

const env = Config.env;
const baseURL = Config.baseUrl[env];
const homePage = new HomePage();
const minicartPage = new MinicartPage();
const utils = new GeneralUtils();
const standardFee = '$5.00';
const expressFee = '$7.49';

fixture `===== DRGC P2 Automation Test - Physical Product Shipping =====`
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
      .expect(Selector('body').hasClass('hfeed')).ok()
});

test('Estimated Shipping Fee - Standard free Shipping', async t => {
  console.log('Test Case: Check the standard shipping fee for physical products');
  const shippingMethod = 'standard';

  await addPhysicalProduct();
  await utils.testShippingFee(standardFee, shippingMethod, standardFee);
});

test('Estimated Shipping Fee - Express free Shipping', async t => {
  console.log('Test Case: Check the express shipping fee for physical products');
  const shippingMethod = 'express';

  await addPhysicalProduct();
  await utils.testShippingFee(standardFee, shippingMethod, expressFee);
});

async function addPhysicalProduct() {
  // Add a physical product into cart
  console.log('>> Add physical product into cart');
  await t
    .setTestSpeed(0.9)
    .click(homePage.addPhyProduct)
    .takeScreenshot('BWC/minicart.jpg');

  // Click View Cart btn in miniCart to go to Cart page
  console.log('>> Direct to cart page');
  await minicartPage.clickViewCartBtn();
}
