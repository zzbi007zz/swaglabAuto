const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    VideoHelper: {
      require: 'codeceptjs-video-helper'
    },
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost',
      show: true,
      emulate: {
        recordVideo: {
          dir: "./recordings"
        }
      }
    }
  },
  include: {
    I: './steps_file.js',
    loginPage: './pages/LoginPage.js',
    inventoryPage: './pages/InventoryPage.js',
    cartPage: './pages/CartPage.js',
    checkoutPage: './pages/CheckoutPage.js',
  },
  gherkin: {
    features: './features/*.feature',
    steps: './step_definitions/*.js',
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    },
  
  },
  name: 'automationtask'
}