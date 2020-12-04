import { Selector, ClientFunction, t } from 'testcafe';
import Config from '../../config';
import HomePage from '../../page-models/public/home-page-model';
import GeneralUtils from '../../utils/genericUtils';

const env = Config.env;
const baseURL = Config.baseUrl[env];
const getLocation = ClientFunction(() => document.location.href);
const homePage = new HomePage();
const POSTSPERPAGE = 10;
const utils = new GeneralUtils();

fixture `===== DRGC P2 Automation Test - Pagination on Product Category =====`
  .httpAuth({
    username: Config.websiteAuth['username'],
    password: Config.websiteAuth['password'],
  });

test('Product List - 10 Products per Page and Display Pagination Correctly', async t => {
  console.log('Test Case: Product Page, Pagination & Switch Page Button');
  console.log(">> Navigate to target testing website's product page");
  await t
    .navigateTo(baseURL)
    .maximizeWindow()

  await utils.clickItem(homePage.productsMenu);

  let pagiMsg = ()  => Selector('.pagination-container').find('span');
  let pagiMsgText = await pagiMsg().innerText;
  const totalPosts = parseInt(pagiMsgText.match(/\d+/g)[1]) || 0;
  let displayingPosts = parseInt(pagiMsgText.match(/\d+/g)[0]) || 0;
  const expectedPages = Math.ceil(totalPosts / POSTSPERPAGE);
  const lastPageBtn = Selector(".page-numbers").withText(expectedPages.toString());
  const firstPageBtn = Selector(".page-numbers").withText('1');
  const lastPage = expectedPages;
  // If expectedPages <=1, there is no pagenation
  if (expectedPages <= 1) {
    await onlyOnePageCheck(currentPage);
  } else {
    let expectedCurrentPage = 1;
    let isLastPage = false;
    // else, click next page until reach last page.
    do {
      let currentPage = parseInt(await Selector('.page-numbers.current').innerText);
      pagiMsg = Selector('.pagination-container').find('span');
      pagiMsgText = await pagiMsg().innerText;
      displayingPosts = parseInt(pagiMsgText.match(/\d+/g)[0]) || 0;
      let expectedPostsPerPage = POSTSPERPAGE;
      // if not last page, it should display Maximum number of a posts which a page can display
      if (currentPage == lastPage) {
        expectedPostsPerPage = totalPosts - POSTSPERPAGE * (currentPage - 1);
        isLastPage = true;
      }

      console.log("  -> CurrentPage: " + currentPage.toString() );
      console.log("  -> Last page should be: " + lastPage.toString() );

      // All page should have: fistPageBtn, lastPageBtn, correct # of displayed items
      await t
        .expect(firstPageBtn.exists).ok()
        .expect(lastPageBtn.exists).ok()
        .expect(displayingPosts).eql(expectedPostsPerPage);

      expectedCurrentPage = await checkCurrentPageDisplay(currentPage, expectedCurrentPage, lastPage, isLastPage);
    } while(!isLastPage)
  }
});

async function onlyOnePageCheck(currentPage) {
  console.log(">> Page number == 1, no pagenation.");
  await t
    .expect(homePage.paginationNextBtn.exists).notOk()
    .expect(homePage.paginationPrevBtn.exists).notOk()
    .expect(currentPage).eql(1);
}

/*
* Check each page's display from first page -> last page
*/
async function checkCurrentPageDisplay(currentPage, expectedCurrentPage, lastPage, isLastPage) {
  const prevBtnText = '<';
  const nextBtnText = '>';
  currentPage = parseInt(await Selector('.page-numbers.current').innerText);
  await t.expect(currentPage).eql(expectedCurrentPage);

  switch (currentPage){
    case 1:
    // First page.
    // Display: nextBtn
    // Dont display: prevBtn
      console.log("  -> 1st Page -- Checking...");
      await t
        .expect(homePage.paginationPrevBtn.exists).notOk()
        .expect(homePage.paginationNextBtn.exists).ok()
        .expect(homePage.paginationNextBtn.innerText).eql(nextBtnText);
      break;
    case lastPage:
    // Last page.
    // Display: prevBtn, address should have page number
    // Dont display: nextBtn
      console.log("  -> Last Page -- Checking...");
      await t
        .expect(homePage.paginationNextBtn.exists).notOk()
        .expect(homePage.paginationPrevBtn.exists).ok()
        .expect(homePage.paginationPrevBtn.innerText).eql(prevBtnText)
        .expect(getLocation()).contains(`/page/${lastPage}`);
      break;
    default:
    // Not First and Not last
    // Display: prevBtn, nextBtn, address should have page number
      console.log("  -> Mid Page -- Checking...");
      await t
        .expect(homePage.paginationPrevBtn.exists).ok()
        .expect(homePage.paginationPrevBtn.innerText).eql(prevBtnText)
        .expect(homePage.paginationNextBtn.exists).ok()
        .expect(homePage.paginationNextBtn.innerText).eql(nextBtnText)
        .expect(getLocation()).contains(`/page/${expectedCurrentPage}`);
      break;
  }

  //If there is more pages, go to next page
  if (!isLastPage) {
    console.log(">> Go to next page");
    await t.click(homePage.paginationNextBtn);
    expectedCurrentPage += 1;
  }
  return expectedCurrentPage;
}
