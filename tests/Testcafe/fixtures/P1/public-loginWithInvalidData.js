import { Selector, t } from 'testcafe';
import Config from '../../config';
import GenericUtils from '../../utils/genericUtils';
import LoginPage from '../../page-models/public/login-page-model';

fixture `===== DRGC P1 Automation Test - Login With Invalid Data =====`
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

test('Login with Non-exist User.', async t => {
  console.log('Test Case: Login with a non-exist user');

  const nonExistUser = new GenericUtils().getNewUser();
  const expectedErrMsg = "Authorization failed for specified credentials";

  console.log('  -> Click Login Button and Direct to Login Page');
  utils.clickItem(loginPage.loginMenu);

  console.log('  -> Try to login with a non-exist user');
  await t
    .typeText(loginPage.userName, nonExistUser.email, { replace: true })
    .typeText(loginPage.userPW, nonExistUser.password, { replace: true });
  await utils.clickItem(loginPage.loginBtn);

  console.log('  ---> Check the error message displayed');
  const loginErrMsg = Selector('.dr-form-error-msg').innerText;
  await t.expect(loginErrMsg).eql(expectedErrMsg);
});

test('Login with a valid user but with wrong password', async t => {
  console.log('Test Case: Login with a valid user but with wrong password');

  const newUser = new GenericUtils().getNewUser();
  const wrongPW = "WrongPassword";
  const expectedErrMsg = "Authorization failed for specified credentials";
  
  // create a valid user
  console.log('  -> Click Login Button and Direct to Login Page');
  await t.click(loginPage.loginMenu);
  await loginPage.createNewCustomer(newUser);
  await loginPage.userLogout();

  // go to login page and login with invalid username and password
  console.log('  -> Click Login Button and Direct to Login Page');
  await utils.clickItem(loginPage.loginMenu);

  console.log('  -> Try to login with invalid password');
  await t
    .typeText(loginPage.userName, newUser.email, { replace: true })
    .typeText(loginPage.userPW, wrongPW, { replace: true });
  await utils.clickItem(loginPage.loginBtn);

  console.log('  ---> Check the error message displayed');
  const loginErrMsg = Selector('.dr-form-error-msg').innerText;
  await t.expect(loginErrMsg).eql(expectedErrMsg);

  console.log('  -> Login with correct username/password');
  await loginPage.userSignIn(newUser);
});
