Feature('Swag Labs');

const loginPage = require('../pages/LoginPage');
const inventoryPage = require('../pages/InventoryPage');
const cartPage = require('../pages/CartPage');
const checkoutPage = require('../pages/CheckoutPage');

Before(({ I }) => {
    I.amOnPage(loginPage.url);
});

Scenario('Successful Login', ({ I }) => {
    I.fillField(loginPage.usernameField, 'standard_user');
    I.fillField(loginPage.passwordField, 'secret_sauce');
    I.click(loginPage.loginButton);
    I.seeInCurrentUrl(inventoryPage.url);
}).tag('@login');

Scenario('Invalid Login', ({ I }) => {
    I.fillField(loginPage.usernameField, 'invalid_user');
    I.fillField(loginPage.passwordField, 'invalid_password');
    I.click(loginPage.loginButton);
    I.see('Epic sadface: Username and password do not match any user in this service');
}).tag('@login');

Scenario('Logout Functionality', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.burgerMenuButton);
    I.click(inventoryPage.logoutLink);
    I.seeInCurrentUrl(loginPage.url);
}).tag('@logout');

Scenario('Add Product to Cart', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.addToCartButton);
    I.seeElement(inventoryPage.cartBadge);
}).tag('@cart');

Scenario('Remove Product from Cart', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.addToCartButton);
    I.click(inventoryPage.removeButton);
    I.dontSeeElement(inventoryPage.cartBadge);
}).tag('@cart');

Scenario('View Product Details', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.productName);
    I.seeInCurrentUrl('/inventory-item.html');
}).tag('@product');

Scenario('Checkout Process', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.addToCartButton);
    I.click(inventoryPage.cartLink);
    I.click(cartPage.checkoutButton);
    I.fillField(checkoutPage.firstNameField, 'John');
    I.fillField(checkoutPage.lastNameField, 'Doe');
    I.fillField(checkoutPage.zipCodeField, '12345');
    I.click(checkoutPage.continueButton);
    I.click(checkoutPage.finishButton);
    I.see('Thank you for your order!');
}).tag('@checkout');

Scenario('Verify Sorted Product Prices', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.sortProductsByPrice('lohi');
    I.seeTextEquals('$7.99', locate(inventoryPage.productPrice).first());
}).tag('@sorting');