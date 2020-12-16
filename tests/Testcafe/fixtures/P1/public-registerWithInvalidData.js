import { Selector, t } from 'testcafe';
import Config from '../../config';
import GenericUtils from '../../utils/genericUtils';
import LoginPage from '../../page-models/public/login-page-model';

fixture `===== DRGC P1 Automation Test - Register With Inavlid Data =====`
  .httpAuth({
    username: Config.websiteAuth['username'],
    password: Config.websiteAuth['password'],
  })
  .beforeEach(async t => {
    console.log('Before Each: Go to Testing Website');
    await t
      .setTestSpeed(0.9)
      .navigateTo(baseURL)
      .maximizeWindow();
});

const env = Config.env;
const utils = new GenericUtils();
const baseURL = Config.baseUrl[env];
const loginPage = new LoginPage();
const requiredFieldMsg = "This field is required.";

test('Register with Duplicated Email', async t => {
  console.log('Test Case: Register with duplicated email');

  const newUser = utils.getNewUser();
  const expectedErrMsg = "Sorry, that username already exists!";

  console.log('  -> Click Login Button and Direct to Login Page');
  utils.clickItem(loginPage.loginMenu);

  // create a valid user
  console.log('  -> Create a valid user');
  await loginPage.createNewCustomer(newUser);
  await loginPage.userLogout();

  console.log('  -> Try to register again with duplicated email');
  await t.click(loginPage.loginMenu);

  console.log('  -> Try to sign up with the duplicated email');
  await loginPage.createNewCustomer(newUser);

  console.log('  ---> Check the error message displayed');
  const loginErrMsg = Selector('.dr-signin-form-error').innerText;
  await t.expect(loginErrMsg).eql(expectedErrMsg);
});

test('Register with Wrong Email Format', async t => {
  console.log('Test Case: Regiset with wrong email format');

  let newUserWithWrongEmailFormat = utils.getNewUser();
  newUserWithWrongEmailFormat.email = "WrongEmailFormat@abc"
  const expectedErrMsg = "Please enter a valid email address.";

  console.log('  -> Click Login Button and Direct to Login Page');
  utils.clickItem(loginPage.loginMenu);
  console.log('  -> Try to sign up with a wrong email format');
  await loginPage.createNewCustomer(newUserWithWrongEmailFormat);

  console.log('  ---> Check the error message displayed');
  const loginErrMsg = Selector('.dr-signin-form-error').innerText;
  await t.expect(loginErrMsg).eql(expectedErrMsg);
});

test('Sign Up: Missing First Name', async t => {
  console.log('Test Case: Missing first name when sign up');

  let newUserWithFirstNameMissing = utils.getNewUser();
  newUserWithFirstNameMissing.firstName= " ";

  console.log('  -> Singup with wrong user infomation');
  console.log('  -> Click Login Button and Direct to Login Page');
  await t.click(loginPage.loginMenu);
  await loginPage.createNewCustomer(newUserWithFirstNameMissing);

  const displayedErrMsg = await loginPage.signupFirstName.parent().find('div').innerText;
  console.log('  ---> Check the error message displayed');
  await t.expect(displayedErrMsg).eql(requiredFieldMsg);

});

test('Sign Up: Missing Last Name', async t => {
  console.log('Test Case: Missing last name when sign up');

  let newUserWithLastNameMissing = utils.getNewUser();
  newUserWithLastNameMissing.lastName= " ";

  console.log('  -> Singup with wrong user infomation');
  console.log('  -> Click Login Button and Direct to Login Page');
  await t.click(loginPage.loginMenu);
  await loginPage.createNewCustomer(newUserWithLastNameMissing);

  const displayedErrMsg = await loginPage.signupLastName.parent().find('div').innerText;
  console.log('  ---> Check the error message displayed');
  await t.expect(displayedErrMsg).eql(requiredFieldMsg);

});

test('Sign Up: Missing Email Address', async t => {
  console.log('Test Case: Missing email address when sign up');

  let newUserWithEmailMissing = utils.getNewUser();
  newUserWithEmailMissing.email= " ";

  console.log('  -> Singup with wrong user infomation');
  console.log('  -> Click Login Button and Direct to Login Page');
  await t.click(loginPage.loginMenu);
  await loginPage.createNewCustomer(newUserWithEmailMissing);

  const displayedErrMsg = await loginPage.signupUeMail.parent().find('div').innerText;
  console.log('  ---> Check the error message displayed');
  await t.expect(displayedErrMsg).eql(requiredFieldMsg);
});


test('Sign Up: Missing Password', async t => {
  console.log('Test Case: Missing password when sign up');

  const newUser = utils.getNewUser();
  console.log('  -> Click Login Button and Direct to Login Page');
  await t.click(loginPage.loginMenu);

  console.log('  -> Entering New User Info and SignUp');
  await t
    .expect(loginPage.loginMenu.exists).ok()
    .typeText(loginPage.signupFirstName, newUser.firstName, { replace: true })
    .typeText(loginPage.signupLastName, newUser.lastName, { replace: true })
    .typeText(loginPage.signupUeMail, newUser.email, { replace: true })
    .typeText(loginPage.signupConfirmPW, newUser.password, { replace: true })
    .takeScreenshot('BWC/signup.jpg')
    .click(loginPage.signupBtn)

  const displayedErrMsg = await loginPage.signupPW.parent().find('div').innerText;
  console.log('  ---> Check the error message displayed');
  await t.expect(displayedErrMsg).eql(requiredFieldMsg);
});

test('Sign Up: Missing Confirm Password', async t => {
  console.log('Test Case: Missing confirm password when sign up');

  const newUser = utils.getNewUser();
  console.log('  -> Click Login Button and Direct to Login Page');
  await t.click(loginPage.loginMenu);

  console.log('  -> Entering New User Info and SignUp');
  await t
    .expect(loginPage.loginMenu.exists).ok()
    .typeText(loginPage.signupFirstName, newUser.firstName, { replace: true })
    .typeText(loginPage.signupLastName, newUser.lastName, { replace: true })
    .typeText(loginPage.signupUeMail, newUser.email, { replace: true })
    .typeText(loginPage.signupPW, newUser.password, { replace: true })
    .takeScreenshot('BWC/signup.jpg')
    .click(loginPage.signupBtn)

  const displayedErrMsg = await loginPage.signupConfirmPW.parent().find('div').innerText;
  console.log('  ---> Check the error message displayed');
  await t.expect(displayedErrMsg).eql(requiredFieldMsg);
});

test('Sign Up: Password and Confirm Password Doesn\'t Match', async t => {
  console.log('Test Case: Password and confirm password does\'t match');

  const expectedErrMsg = "Passwords do not match.";
  let newUser = utils.getNewUser();
  newUser.confirmPassword = "wrongConfirmPassword";

  console.log('  -> Singup with wrong user infomation');
  console.log('  -> Click Login Button and Direct to Login Page');
  await t.click(loginPage.loginMenu);
  await loginPage.createNewCustomer(newUser);

  const displayedErrMsg = await loginPage.signupConfirmPW.parent().find('div').innerText;
  console.log('  ---> Check the error message displayed');
  await t.expect(displayedErrMsg).eql(expectedErrMsg);
});
