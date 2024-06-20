const { I } = inject();
const loginPage = require('../pages/LoginPage');
const inventoryPage = require('../pages/InventoryPage');
const cartPage = require('../pages/CartPage');
const checkoutPage = require('../pages/CheckoutPage');

Given('I am on the login page', () => {
    I.amOnPage(loginPage.url);
});

Given('I am logged in as {string} with password {string}', async (username, password) => {
    I.amOnPage(loginPage.url);
    await loginPage.login(username, password);
});

Given('I have added a product to the cart', () => {
    I.click(inventoryPage.addToCartButton);
});

When('I fill in the username with {string}', (username) => {
    I.fillField(loginPage.usernameField, username);
});

When('I fill in the password with {string}', (password) => {
    I.fillField(loginPage.passwordField, password);
});

When('I click the login button', () => {
    I.click(loginPage.loginButton);
});

When('I click the burger menu button', () => {
    I.click(inventoryPage.burgerMenuButton);
});

When('I click the logout link', () => {
    I.click(inventoryPage.logoutLink);
});

When('I click the add to cart button', () => {
    I.click(inventoryPage.addToCartButton);
});

When('I click the remove button', () => {
    I.click(inventoryPage.removeButton);
});

When('I click on a product name', () => {
    I.click(inventoryPage.productName);
});

When('I click the cart link', () => {
    I.click(inventoryPage.cartLink);
});

When('I click the checkout button', () => {
    I.click(cartPage.checkoutButton);
});

When('I fill in the checkout information with first name {string}, last name {string}, and zip code {string}', (firstName, lastName, zipCode) => {
    I.fillField(checkoutPage.firstNameField, firstName);
    I.fillField(checkoutPage.lastNameField, lastName);
    I.fillField(checkoutPage.zipCodeField, zipCode);
});

When('I click the continue button', () => {
    I.click(checkoutPage.continueButton);
});

When('I click the finish button', () => {
    I.click(checkoutPage.finishButton);
});

When('I sort the products by price from low to high', () => {
    inventoryPage.sortProductsByPrice('lohi');
});

Then('I should see the inventory page', () => {
    I.seeInCurrentUrl(inventoryPage.url);
});

Then('I should see an error message {string}', (errorMessage) => {
    I.see(errorMessage);
});

Then('I should be redirected to the login page', () => {
    I.seeInCurrentUrl(loginPage.url);
});

Then('I should see the cart badge', () => {
    I.seeElement(inventoryPage.cartBadge);
});

Then('I should not see the cart badge', () => {
    I.dontSeeElement(inventoryPage.cartBadge);
});

Then('I should see the product details page', () => {
    I.seeInCurrentUrl('/inventory-item.html');
});

Then('I should see the order confirmation message {string}', (confirmationMessage) => {
    I.see(confirmationMessage);
});

const assert = require('assert');

Then('I should see the products sorted by price in ascending order', async () => {
    const productPrices = await I.grabTextFromAll('.inventory_item_price');
    const sortedPrices = [...productPrices].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));

    await I.waitForElement('.inventory_item_price', 5);

    const isPricesSorted = async () => {
        const currentPrices = await I.grabTextFromAll('.inventory_item_price');
        return JSON.stringify(currentPrices) === JSON.stringify(sortedPrices);
    };

    const maxAttempts = 5;
    let attempt = 0;

    while (attempt < maxAttempts) {
        if (await isPricesSorted()) {
            break;
        }
        attempt++;
        await I.wait(1);
    }

    assert.deepStrictEqual(productPrices, sortedPrices, 'Product prices are not sorted in ascending order');
});


When('I sort the products by price from low to high', () => {
    inventoryPage.sortProductsByPrice('lohi');
});

When('I sort the products by price from high to low', () => {
    inventoryPage.sortProductsByPrice('hilo');
});

When('I sort the products by name from Z to A', () => {
    inventoryPage.sortProductsByName('za');
});

Then('I should see the products sorted by price in ascending order', async () => {
    const productPrices = await I.grabTextFromAll('.inventory_item_price');
    const sortedPrices = [...productPrices].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));
    assert.deepStrictEqual(productPrices, sortedPrices, 'Product prices are not sorted in ascending order');
});

Then('I should see the products sorted by price in descending order', async () => {
    const productPrices = await I.grabTextFromAll('.inventory_item_price');
    const sortedPrices = [...productPrices].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
    assert.deepStrictEqual(productPrices, sortedPrices, 'Product prices are not sorted in descending order');
});

Then('I should see the products sorted by name in descending order', async () => {
    const productNames = await I.grabTextFromAll('.inventory_item_name');
    const sortedNames = [...productNames].sort().reverse();
    assert.deepStrictEqual(productNames, sortedNames, 'Product names are not sorted in descending order');
});

When('I fill in the checkout information with first name {string}, last name {string}, and zip code {string}', (firstName, lastName, zipCode) => {
    I.fillField(checkoutPage.firstNameField, firstName);
    I.fillField(checkoutPage.lastNameField, lastName);
    I.fillField(checkoutPage.zipCodeField, zipCode);
});

When('I click the continue button', () => {
    I.click(checkoutPage.continueButton);
});

Then('I should see an error message {string}', (errorMessage) => {
    I.see(errorMessage);
});