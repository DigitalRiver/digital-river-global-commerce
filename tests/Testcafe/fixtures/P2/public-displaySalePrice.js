import { Selector, t } from 'testcafe';
import Config from '../../config';
import HomePage from '../../page-models/public/home-page-model';
import GeneralUtils from '../../utils/genericUtils';
import ProductUtils from '../../utils/productUtils';

fixture `===== DRGC P2 Automation Test - Displaying Sale Price =====`
  .httpAuth({
    username: 'gcwpdemo',
    password: '33a5b9f5',
  });
const onSaleProductID = new ProductUtils().getOnSaleProduct().productID;
const utils = new GeneralUtils();
const homePage = new HomePage();
const baseURL = Config.baseUrl[Config.env];

test('Minicart price', async t => {
  console.log('Test Case: Minicart - Check the Sale Price ');
  console.log('>> Navigate to target testing website');
  await t
    .navigateTo(baseURL)
    .maximizeWindow();

  // Add the on sale product into cart and check it displays on sale price in mini cart
  console.log(">> Check on sale price in mini cart")
  await utils.addProductsIntoCart(onSaleProductID);
  await t
    .expect(homePage.minicartItem.exists).ok()
    .expect(homePage.minicartRegularPrice.exists).ok()
    .expect(homePage.minicartSalePrice.exists).ok();
});

test('Category page price', async t => {
  console.log('Test Case: Category Page - Check the Sale Price ');
  console.log('>> Navigate to target testing website');
  await t
    .navigateTo(baseURL)
    .maximizeWindow();

  // Enter Product page and check is displays on sale price
  console.log(">> Check on sale price in product detail page");
  await utils.clickItem(homePage.productsMenu);
  await checkSaleBtnPriceExists(homePage.categoryRegularPrice, homePage.categorySalePrice);
});

test('Porduct page price', async t => {
  console.log('Test Case: Product Detail Page - Check the Sale Price');
  const onSaleProductPageLink = homePage.onSaleBuyButton.parent('div').find('.card-overlay');
  const regularPrice = homePage.onSaleBuyButton.parent('form').find('.product-price-old');
  const salePrice = homePage.onSaleBuyButton.parent('form').find('.product-price');

  console.log('>> Navigate to target testing website');
  await t
    .navigateTo(baseURL)
    .maximizeWindow();

  console.log('>> Checking the on sale/regular price in product\'s page');
  await utils.clickItem(homePage.productsMenu);
  await utils.clickItem(onSaleProductPageLink);
  await checkSaleBtnPriceExists(regularPrice, salePrice);
});

async function checkSaleBtnPriceExists(regularPrice, salePrice) {
  await t
    .expect(homePage.onSaleBuyButton.exists).ok()
    .expect(regularPrice.exists).ok()
    .expect(salePrice.exists).ok();
}
