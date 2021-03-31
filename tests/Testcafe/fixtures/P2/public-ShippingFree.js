import { Selector, t } from 'testcafe';
import Config from '../../config';
import HomePage from '../../page-models/public/home-page-model';
import MinicartPage from '../../page-models/public/minicart-page-model';
import CartPage from '../../page-models/public/cart-page-model';
import GeneralUtils from '../../utils/genericUtils';

const env = Config.env;
const baseURL = Config.baseUrl[env];
const homePage = new HomePage();
const minicartPage = new MinicartPage();
const cartPage = new CartPage();
const utils = new GeneralUtils();
const freeShipping = 'FREE';

fixture `===== DRGC P2 Automation Test - Free Shipping =====`
  .httpAuth({
    username: Config.websiteAuth['username'],
    password: Config.websiteAuth['password'],
  })
  .beforeEach(async t => {
    console.log('Before Each: Click Menu -> Product to Enter Product Page');
    await t
      .navigateTo(baseURL)
      .maximizeWindow();
});

test('Estimated Shipping Fee - Standard free Shipping', async t => {
  console.log('Test Case: Check the standard shipping fee for free shipping');

  // Add a physical product into cart
  console.log('>> Add physical product into cart');
  const shippingMethod = 'standard';

  await setProductQuatityToFreeShipping();
  await utils.testShippingFee(freeShipping, shippingMethod, freeShipping);
});

test('Estimated Shipping Fee - Express free Shipping', async t => {
  console.log('Test Case: Check the express shipping fee for free shipping');

  // Add a physical product into cart
  console.log('>> Add physical product into cart');
  const shippingMethod = 'express';

  await setProductQuatityToFreeShipping();
  await utils.testShippingFee(freeShipping, shippingMethod, freeShipping);
});

async function setProductQuatityToFreeShipping() {
  const estimatedShipping = 'Estimated Shipping';
  const standardFee = '$5.00';

  await t
    .setTestSpeed(0.9)
    .click(homePage.productsMenu);
  await utils.findTestProduct(homePage.addPhyProduct);
  await t
    .hover(homePage.addPhyProduct)
    .click(homePage.addPhyProduct)
    .takeScreenshot('BWC/minicart.jpg');

  // Click View Cart btn in miniCart to go to Cart page
  console.log('>> Direct to cart page');
  await minicartPage.clickViewCartBtn();

  // Change quantity to make the total purchase exceed the free shipping total
  console.log('>> Only 1 product, not reach free shipping, shipping fee $5.00');
  await utils.checkEstShippingInfo(estimatedShipping, standardFee);
  await utils.clickItem(cartPage.increaseQuantity); //add 1, total 2
  console.log('>> 2 product, not reach free shipping, shipping fee $5.00');
  await utils.checkEstShippingInfo(estimatedShipping, standardFee);
  await utils.clickItem(cartPage.increaseQuantity); //add 1, total 3
  console.log('>> 3 product, reach free shipping, shipping fee FREE');
  await utils.checkEstShippingInfo(estimatedShipping, freeShipping);
}
