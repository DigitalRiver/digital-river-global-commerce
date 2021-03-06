import { Selector, t, ClientFunction} from 'testcafe';
import HomePage from '../page-models/public/home-page-model';
import CartPage from '../page-models/public/cart-page-model';
import CheckoutPage from '../page-models/public/checkout-page-model';
import LoginPage from '../page-models/public/login-page-model';
import MiniCartPage from '../page-models/public/minicart-page-model';
import TYPage from '../page-models/public/ty-page-model';

export default class GenericUtils {
  constructor() {
  }

  async checkEstShippingInfo(title, value) {
    const cartPage = new CartPage();
    await t
      .expect(cartPage.estimatedShippingTitle.innerText).eql(title)
      .expect(cartPage.estimatedShippingValue.innerText).eql(value);
  }

  async checkShippingSummaryInfo(title, value) {
    await t
      .expect(new CheckoutPage().shippingSummaryTitle.innerText).eql(title)
      .expect(new CheckoutPage().shippingSummaryValue.innerText).eql(value);
  }

  async clickItem(target) {
    await t
      .expect(target.exists).ok({timeout:20000})
      .hover(target)
      .wait(500)
      .click(target)
      .wait(1000);
  }

  async checkCheckBox(checkbox, checked) {
    let ischecked = await checkbox.checked;
    while(ischecked != checked) {
      await t
        .expect(checkbox.visible).ok({timeout:20000})
        .hover(checkbox)
        .click(checkbox);
      ischecked = await checkbox.checked;
    }
  }

  async addVariProduct(colorVari, sizeVari) {
    let variInfo = {
      'Black': {'9': 19.9, 'image': 'shoeBlackBig.jpg'},
      'White':{'10': 39.1, 'image': 'shoeWhiteBig.jpg'},
      'Grey':{'12': 29.12, 'image': 'shoeBig.jpg'}};
    const expectedTitle = 'Pallidium ' + colorVari;
    const expectedShortDes = colorVari + ' ' + sizeVari + ' short description';
    const expectedLongDes = colorVari + ' ' + sizeVari + ' long description'

    let colorVariOption = Selector('select[name="dr-variation-color"]');
    let sizeVariOption = Selector('select[name="dr-variation-shoeSize"]');
    const addToCartBtn = Selector('.dr-btn.dr-buy-btn');
    const price = Selector('.dr-sale-price').innerText;
    const image = Selector('.dr-pd-img-wrapper').find('img');
    const title = Selector('.entry-title.dr-pd-title').innerText;
    const shortDes = Selector('.dr-pd-short-desc').innerText;
    const longDes = Selector('.dr-pd-long-desc').innerText;

    await t
    .click(colorVariOption)
    .click(colorVariOption.find('option').withText(colorVari))
    .click(sizeVariOption)
    .click(sizeVariOption.find('option').withText(sizeVari));

    // Check: Title
    await t.expect(title).eql(expectedTitle);
    // Check: Price
    await t.expect(price).contains(variInfo[colorVari][sizeVari]);
    // Check: Product Photo'
    let imgStr = await image.getAttribute('src');
    if (!imgStr.includes(variInfo[colorVari]['image'])){
      throw('Error: Wrong image URL.');
    }
    // Check: Short description'
    await t.expect(shortDes).eql(expectedShortDes);
    // Check: Long description'
    await t.expect(longDes).eql(expectedLongDes);

    await t.click(addToCartBtn);
  }

  async addProductsIntoCart(product, isVariation = false){
    const homePage = new HomePage();
    const minicartPage = new MiniCartPage();
    await t
      .hover(homePage.productsMenu)
      .click(homePage.productsMenu);

    await this.findTestProduct(product);
    await t
      .hover(product)
      .click(product);

    // Add to cart btn changed to buy now button of variaction products, need to click add to cart
    // when entered product's detail page after clicking buy now btn in products page.
    if (isVariation) {
      await this.addVariProduct('Black', '9');
      await this.addVariProduct('White', '10');
      await this.addVariProduct('Grey', '12');
    }

    await t.expect(minicartPage.viewCartBtn.exists).ok();
  }

  async findTestProduct(product) {
    const homePage = new HomePage();
    const POSTSPERPAGE = 10;
    let pagiMsg = ()  => Selector('.pagination-container').find('span');
    let pagiMsgText = await pagiMsg().innerText;
    const totalPosts = parseInt(pagiMsgText.match(/\d+/g)[1]) || 0;
    const expectedPages = Math.ceil(totalPosts / POSTSPERPAGE);
    for (let i = 1; i <= expectedPages; i++) {
      if(await product.exists) {
        break;
      } else {
        if (i == expectedPages) {
          throw('Error: Unable to find target products.');
        }
        await t
          .hover(homePage.paginationNextBtn)
          .click(homePage.paginationNextBtn);
      }
    }
  }

  async testShippingFee(estShippingFee, shippingMethod, finalShippingFee) {
    const checkoutPage = new CheckoutPage();
    const cartPage = new CartPage();
    const estimatedShipping = 'Estimated Shipping';
    const testEmail = "qa@test.com";
    const fixedShipping = 'Shipping';
    const isGuest = true;
    const isLocaeUS = true;
    // Click Proceed to Checkout in View Cart page to proceed checkout
    console.log('>> Direct to checkout page, still show Estimated Shipping');
    await this.clickItem(cartPage.proceedToCheckoutBtn);
    await this.clickItem(new LoginPage().continueAsGuestBtn);
    await this.checkShippingSummaryInfo(estimatedShipping, estShippingFee);

    // Enter Email and continue
    console.log('>> Checkout page - Entering email, still show Estimated Shipping');
    await checkoutPage.completeFormEmail(testEmail);
    await this.checkShippingSummaryInfo(estimatedShipping, estShippingFee);

    // Enter shipping info
    console.log('>> Checkout page - Entering shipping info, still show Estimated Shipping');
    await t.expect(checkoutPage.guestShippingBtn.exists).ok();
    await checkoutPage.completeFormShippingInfo(isGuest, isLocaeUS);
    await this.checkShippingSummaryInfo(estimatedShipping, estShippingFee);

    // Skip Billing info
    console.log('>> Checkout page - Skip Billing info and continue, still show Estimated Shipping');
    await this.clickItem(checkoutPage.guestBillingInfoSubmitBtn);
    await this.checkShippingSummaryInfo(estimatedShipping, estShippingFee);

    // Set delivery option
    console.log('>> Checkout page - Set delivery, Estimated Shipping label changes to Shipping');
    await t.expect(checkoutPage.deliveryOptionSubmitBtn.exists).ok();
    await checkoutPage.setDeliveryOption(shippingMethod);
    await this.checkShippingSummaryInfo(fixedShipping, finalShippingFee);
  }

  async fillOrderInfoAndSubmitOrder(isPhysical, isGuest, isLocaleUS = true) {
    const tyPage = new TYPage();
    const checkoutPage = new CheckoutPage();
    let finishOrderMsg = "Your order was completed successfully.";

    if (isLocaleUS && !isGuest) {
      const taxSubmitBtn = Selector('#checkout-tax-exempt-form').find('button');
      await t
        .hover(taxSubmitBtn)
        .click(taxSubmitBtn)
        .wait(2000);
    }

    if (isPhysical) {
      // Enter shipping info
      console.log('>> Checkout page - Entering Shipping Info.');
      await checkoutPage.completeFormShippingInfo(isGuest, isLocaleUS);
      await t.expect(checkoutPage.useSameAddrCheckbox.exists).ok();

      // Set billing info as diff from shipping info
      // If checkbox is checked, the billing info will be set to same as shipping info
      await this.checkCheckBox(checkoutPage.useSameAddrCheckbox, false);
    }
    // Enter Billing Info
    console.log('>> Checkout page - Entering Billing Info.');
    await checkoutPage.completeFormBillingInfo(isGuest, isLocaleUS);

    // Since TEMS-ROW is enabled, non-US countries need to apply VAT when checkout
    if (!isLocaleUS) {
      let taxSubmitBtn = Selector('#checkout-tax-id-form').find('button');
      finishOrderMsg = "您的訂單已成功完成。";
      await this.clickItem(taxSubmitBtn);
    }

    if (isPhysical) {
      await t.expect(checkoutPage.deliveryOptionSubmitBtn.exists).ok();
      // Set delivery option
      console.log('>> Checkout page - Set Delivery Options as Standard');
      await checkoutPage.setDeliveryOption('standard');
    }

    // Enter Payment Info
    console.log('>> Checkout page - Entering Payment Info.');
    await checkoutPage.completeFormCreditCardInfo();

    // Agree to Terms of Sales and Privacy Policy then submit order
    console.log('>> Checkout page - agree to Terms of Sale');
    await this.checkCheckBox(checkoutPage.checkboxTermsofSaleAndPolicy, true);
    // Submit Order
    console.log('>> Checkout page - Place order');
    await t
      .takeScreenshot('BWC/payment_s.jpg')
      .click(checkoutPage.submitOrderBtn);

    const getURL = ClientFunction(() => window.location.href);
    await t
      .expect(getURL()).contains('thank-you', {timeout: 15000})
      .expect(tyPage.tyMsg.innerText).eql(finishOrderMsg)
      .takeScreenshot('BWC/TY_s.jpg');

    console.log('>> Directs to the TY page');
    const orderNum = await tyPage.orderNumber.textContent;
    console.log(orderNum.trim());
  }


  async addProductAndProceedToCheckout(product, isVariation = false) {
    const minicartPage = new MiniCartPage();
    const cartPage = new CartPage();
    // Add a physical product into cart
    console.log('>> Add Product into Cart');
    await this.addProductsIntoCart(product, isVariation);

    // Click View Cart btn in miniCart to go to Cart page
    console.log('>> Direct to cart page');
    await minicartPage.clickViewCartBtn();

    // Click Proceed to Checkout in View Cart page to proceed checkout
    console.log('>> Direct to checkout page');
    await t
      .click(cartPage.proceedToCheckoutBtn);
  }

  getNewUser() {
    const timestamp = Date.now();
    const newEmail = 'qa' + timestamp + '@dr.com';
    const firstName = 'JOHN';
    const lastName = 'DON';
    const password = 'DigitalRiverTest_2019!';
    const email = newEmail;

    const user = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: password,
      email: email
    };

    return user;
  }

  getShippingUserData() {
    const shipInfo = {
      firstName: 'Helen',
      lastName: 'Mcclinton',
      addrLine1: '10451 Gunpowder Falls St',
      city: 'Las Vegas',
      country: 'United States',
      countryValue: 'US',
      state: 'Nevada',
      stateValue: 'NV',
      postCode: '89123',
      phoneNo: '7028962624'
    };

    return shipInfo;
  }

  getBillingUserData() {
    const shipInfo = {
      firstName: 'John',
      lastName: 'Doe',
      addrLine1: '10380 Bren Rd W',
      city: 'Minnetonka',
      country: 'United States',
      countryValue: 'US',
      state: 'Minnesota',
      stateValue: 'MN',
      postCode: '55343',
      phoneNo: '9522531234'
    };

    return shipInfo;
  }

  getCreditCardInfo() {
    const currentTime = new Date();
    const year = (currentTime.getFullYear() + 3).toString();
    const expiryData = '01'+ year.slice(-2);
    const cardInfo = {
      cardNo: '4444222233331111',
      expiry: expiryData,
      cvv: '123'
    };

    return cardInfo;
  }
}
