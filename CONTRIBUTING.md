# DIGITAL RIVER GLOBAL COMMERCE Contributing Guidelines

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/DigitalRiver/digital-river-global-commerce/blob/master/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## 🚩 Preparation

Please ensure following steps have been completed:

- Please choose one of the recommended local server program from [Installing a Local Server](https://make.wordpress.org/core/handbook/tutorials/installing-a-local-server/) (e.g. [XAMPP](https://www.apachefriends.org/index.html)), install the program and start the server according to its documentation.
- Clone/download this repo to the proper plugin folder of your WordPress local server. Make sure to establish the upstream connection with the following command:
  ```
  git remote add upstream https://github.com/DigitalRiver/digital-river-global-commerce.git
  ```
- Visit your site (URL should look like this: http://localhost/), follow the instructions on the page and launch the site step by step. If you need more details about how to setup, please read [Famous 5-Minute Installation](https://codex.wordpress.org/Installing_WordPress) the WordPress official guide.
- When everything is set up, login to admin page with the credentials you just created, navigate to "Plugins" page from the left menu, click the "Activate" button for **Digital River Global Commerce**

## 🚩 Development

We use [WPGulp](https://github.com/ahmadawais/WPGulp) as our plugin build-workflow.


### Start developing and compiling code

- Start your npm build workflow by running the command below in plugin directory:
  ```
  npm install
  npm start
  ```
  Now you can access live reload localhost by URL like this: http://localhost:3000/
- More npm/gulp tasks can be used:

  ```
  # To optimize images.
  gulp images

  # To generate WP POT translation file.
  gulp translate

  # To generate RTL stylesheets and Sourcemap.
  gulp stylesRTL

  # Run JS unit tests (Jest)
  npm run test:jest

  ```

- If you need to customize/add gulp tasks, please modify **gulpfile.babel.js**

## 🚩 Testing
We use [Jest](https://jestjs.io/) as unit testing framework for Javascript , [PHPUnit](https://phpunit.de/) for PHP unit testing, and [TestCafe](https://github.com/DevExpress/testcafe) as our end-to-end testing framework.

### Write and run unit testing for Javascript
1. Write unit testing case under tests/jest/public/ with Jest.
2. Run unit testing for Javascript.
  ```
  npm run test:jest
  ```

### Write and run unit testing for PHP
1. Write unit testing case under tests/Unit-Test with phpunit.
2. Install PHPUnit and execute the scripts under tests/Unit-Test with PHPUnit.



### Install Testcafe for E2E testing
  ```
  npm install -g -y testcafe
  ```

### Write E2E testing script

Write E2E testing case under tests/Testcafe with Testcafe.

### Running the E2E testing

Then you can specify the [target browser](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#browser-list) and [file path](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#file-pathglob-pattern) to run the test with command like this:

  ```
  testcafe chrome test/Testcafe/fixtures
  ```

## 🚩 Prepare your Pull Request
1. Prepare your Pull Request and include a comment "How to test" that outlines test steps and any related configuration or dependencies.
2. Confirm that there were no errors in the test results within your code change. Commit your changes. Rebase your branch to upstream/master and squash any unhelpful commits. Push your branch to your personal fork. Create a PR back into DigitalRiver/digital-river-global-commerce for the appropriate release candidate branch. Please note that it may take some time for us to review and approve your pull request.  We retain the final decision regarding whether or not to incorporate your code into a release and may contact you with questions regarding your submission.