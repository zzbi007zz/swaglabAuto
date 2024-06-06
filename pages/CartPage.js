const I = actor();

module.exports = {
    url: 'https://www.saucedemo.com/cart.html',
    checkoutButton: '#checkout',

    proceedToCheckout() {
        I.click(this.checkoutButton);
    }
};