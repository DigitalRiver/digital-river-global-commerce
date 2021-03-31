import { Selector, t } from 'testcafe';

export default class LoginPage {
  constructor() {
    this.continueAsGuestBtn = Selector('#dr-guest-btn');
    this.signupFirstName = Selector('#dr-signup-form').find('[name="first_name"]');
    this.signupLastName = Selector('#dr-signup-form').find('[name="last_name"]');
    this.signupUeMail = Selector('#dr-signup-form').find('[name="uemail"]');
    this.signupPW = Selector('#dr-signup-form').find('[name="upw"]');
    this.signupConfirmPW = Selector('#dr-signup-form').find('[name="upw2"]');
    this.logoutDropDownMenu = Selector('.menu-item.menu-item-has-children.menu-item-login');
    this.loginMenu = Selector('#menu-item-login').find('a');
    this.logoutMenu = Selector('#menu-item-logout').find('a');
    this.signupBtn = Selector('.dr-btn.dr-signup')
    this.userName = Selector('[name="username"]');
    this.userPW = Selector('[name="password"]');
    this.loginBtn = Selector('#dr-auth-submit');
    this.loginMenu = Selector('.menu-item-login');
  }

  async createNewCustomer(newUser) {
    console.log('  -> Entering New User Info and SignUp');
    await t
      .expect(this.loginMenu.exists).ok()
      .typeText(this.signupFirstName, newUser.firstName, { replace: true })
      .typeText(this.signupLastName, newUser.lastName, { replace: true })
      .typeText(this.signupUeMail, newUser.email, { replace: true })
      .typeText(this.signupPW, newUser.password, { replace: true })
      .typeText(this.signupConfirmPW, newUser.confirmPassword, { replace: true })
      .takeScreenshot('BWC/signup.jpg')
      .hover(this.signupBtn)
      .click(this.signupBtn)
      .wait(5000);
  }

  async checkDisplayAfterLogin(newUser) {
    const expectedWelcomeName = 'HI, ' + newUser.firstName;
      console.log('  ---> Check logout button exists and the wording display correctly after login');
    await t
      .expect(this.logoutDropDownMenu.innerText).eql(expectedWelcomeName)
      .expect(this.logoutMenu.exists).ok()
      .expect(this.logoutMenu.innerText).eql("Logout");
  }

  async userLogout() {
    console.log('  -> Logout from Current User');
    await t
      .expect(this.logoutDropDownMenu.exists).ok({timeout:20000})
      .hover(this.logoutDropDownMenu)
      .wait(500)
      .hover(this.logoutMenu)
      .click(this.logoutMenu);

    console.log('  ---> Check login exists and the wording display correctly after logout');
    await t
      .wait(3000)
      .expect(this.loginMenu.exists).ok()
      .expect(this.loginMenu.innerText).eql('Login');
}

  async userSignIn(newUser) {
    const expectedWelcomeName = 'Hi, ' + newUser.firstName;

    console.log('  -> Entering Account and Password and Login');
    await t
      .expect(this.loginBtn.exists).ok()
      .typeText(this.userName, newUser.email, { replace: true })
      .typeText(this.userPW, newUser.password, { replace: true })
      .hover(this.loginBtn)
      .click(this.loginBtn)
      .takeScreenshot('BWC/login.jpg');

    console.log('  ---> Check logout button exists and the wording display correctly after login');
    await t
      .expect(this.logoutDropDownMenu.find('a').innerText).eql(expectedWelcomeName)
      .hover(this.logoutDropDownMenu)
      .expect(this.logoutMenu.exists).ok()
      .expect(this.logoutMenu.innerText).eql("Logout");
  }
}
