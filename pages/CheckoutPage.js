const I = actor();

module.exports = {
    url: 'https://www.saucedemo.com/checkout-step-one.html',
    firstNameField: '#first-name',
    lastNameField: '#last-name',
    zipCodeField: '#postal-code',
    continueButton: '#continue',
    finishButton: '#finish',

    fillCheckoutInformation(firstName, lastName, zipCode) {
        I.fillField(this.firstNameField, firstName);
        I.fillField(this.lastNameField, lastName);
        I.fillField(this.zipCodeField, zipCode);
    },

    continueToOverview() {
        I.click(this.continueButton);
    },

    completeCheckout() {
        I.click(this.finishButton);
    }
};