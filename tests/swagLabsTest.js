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

Scenario('Negative Login Tests', ({ I }) => {
    I.fillField('Username', 'invalid_username');
    I.fillField('Password', 'invalid_password');
    I.click('Login');
    I.see('Epic sadface: Username and password do not match any user in this service');
}).tag('@login');

Scenario('Product Catalog Tests', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.seeNumberOfElements('.inventory_item', 6);
    I.see('Sauce Labs Backpack');
    I.see('$29.99');
    await inventoryPage.sortProductsByPrice('lohi');
    I.see('Sauce Labs Onesie', '.inventory_item_name');
}).tag('@catalog');

Scenario('Product Details Page Tests', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.productName);
    I.seeInCurrentUrl('/inventory-item.html');
    I.see('Sauce Labs Backpack');
    I.see('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    I.see('$29.99');
    I.seeElement('.inventory_details_img');
    I.click('Add to cart');
    I.see('Remove');
}).tag('@product');

Scenario('Shopping Cart Tests', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.addToCartButton);
    I.click(inventoryPage.cartLink);
    I.see('Sauce Labs Backpack');
    I.see('$29.99');
    I.click(inventoryPage.removeButton);
    I.dontSeeElement(inventoryPage.cartBadge);
    I.click('Continue Shopping');
    I.seeInCurrentUrl('/inventory.html');
}).tag('@cart');

Scenario('Checkout Process Tests', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.addToCartButton);
    I.click(inventoryPage.cartLink);
    I.click(cartPage.checkoutButton);
    I.fillField(checkoutPage.firstNameField, 'John');
    I.fillField(checkoutPage.lastNameField, 'Doe');
    I.fillField(checkoutPage.zipCodeField, '12345');
    I.click(checkoutPage.continueButton);
    I.see('Sauce Labs Backpack');
    I.see('$29.99');
    I.click(checkoutPage.finishButton);
    I.see('THANK YOU FOR YOUR ORDER');
}).tag('@checkout');

Scenario('User Logout Tests', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.burgerMenuButton);
    I.click(inventoryPage.logoutLink);
    I.seeInCurrentUrl('/');
    I.amOnPage('/inventory.html');
    I.seeInCurrentUrl('/');
}).tag('@logout');

Scenario('Verify Product Sorting - Price (low to high)', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.sortProductsByPrice('lohi');
    I.seeTextEquals('$7.99', locate(inventoryPage.productPrice).first());
    I.see('Sauce Labs Onesie');
}).tag('@sorting');

Scenario('Verify Product Sorting - Price (high to low)', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.sortProductsByPrice('hilo');
    I.seeTextEquals('$49.99', locate(inventoryPage.productPrice).first());
    I.see('Sauce Labs Fleece Jacket');
}).tag('@sorting');

Scenario('Verify Product Sorting - Name (Z to A)', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.sortProductsByName('za');
    I.seeTextEquals('Test.allTheThings() T-Shirt (Red)', locate(inventoryPage.productName).first());
}).tag('@sorting');

Scenario('Verify Checkout Information Validation', async ({ I }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    I.click(inventoryPage.addToCartButton);
    I.click(inventoryPage.cartLink);
    I.click(cartPage.checkoutButton);
    I.fillField(checkoutPage.firstNameField, '');
    I.fillField(checkoutPage.lastNameField, '');
    I.fillField(checkoutPage.zipCodeField, '');
    I.click(checkoutPage.continueButton);
    I.see('Error: First Name is required');
}).tag('@checkout');
