/* searchbox-iPhone6.js */
import { Selector } from 'testcafe';
import Config from '../../config';
import HomePage from '../../page-models/public/home-page-model';

fixture `===== DRGC P3 Automation Test - Search Box for iPhone6 =====`
  .httpAuth({
    username: Config.websiteAuth['username'],
    password: Config.websiteAuth['password'],
  });

const env = Config.env;
const baseURL = Config.baseUrl[env];
const homePage = new HomePage();
const mobileViewHamburgList = Selector('.navbar.navbar-expand-xl.fixed-top').find('[data-target="#navbarNavDropdown"]').find('span');
const searchBoxToggle = Selector('.fa.fa-search');

test('Verify searchbox is visible in iPhone6 portrait mode', async t => {
  console.log('Test Case: Portrait Mode - Verify SearchBox is Visible in iPhone6 ');
  console.log('>> Navigate to target testing website with Mobile mode');
  await t
    .navigateTo(baseURL)
    .resizeWindowToFitDevice('iPhone 6', {
      portraitOrientation: true
    });

  console.log('>> Add a product');
  await t
    .click(mobileViewHamburgList)
    .click(homePage.productsMenu)
    .click(homePage.paginationNextBtnDown)
    .click(homePage.addPhyProduct);

  console.log('>> Check searchbox exists');
  await t
    .click(searchBoxToggle)
    .expect(Selector('.search-field').exists).ok()
    .takeScreenshot('BWC/searchbox-iPhone6-portrait.png');
});

test('Verify searchbox is visible in iPhone6 landscape mode', async t => {
  console.log('Test Case: Landscape Mode - Verify SearchBox is Visible in iPhone6 ');
  console.log('>> Navigate to target testing website with Mobile mode');
  await t
    .navigateTo(baseURL)
    .resizeWindowToFitDevice('iPhone 6', {
      portraitOrientation: false
    });

  console.log('>> Add a product');
  await t
    .click(mobileViewHamburgList)
    .click(homePage.productsMenu)
    .click(homePage.paginationNextBtnDown)
    .click(homePage.addPhyProduct);

  console.log('>> Check searchbox exists');
  await t
    .click(searchBoxToggle)
    .expect(Selector('.search-field').exists).ok()
    .takeScreenshot('BWC/searchbox-iPhone6-landscape.png');
});
