const I = actor();

module.exports = {
    url: 'https://www.saucedemo.com/inventory.html',
    burgerMenuButton: '#react-burger-menu-btn',
    logoutLink: '#logout_sidebar_link',
    addToCartButton: '.btn_inventory',
    removeButton: '.btn_inventory',
    cartBadge: '.shopping_cart_badge',
    productName: '.inventory_item_name',
    cartLink: '.shopping_cart_link',
    sortDropdown: '.product_sort_container',
    productPrice: '.inventory_item_price',

    addToCart() {
        I.click(this.addToCartButton);
    },

    removeFromCart() {
        I.click(this.removeButton);
    },

    viewProductDetails() {
        I.click(this.productName);
    },

    sortProductsByPrice(option) {
        I.selectOption(this.sortDropdown, option);
    },

    sortProductsByName(order) {
        const sortDropdown = locate('.product_sort_container');
        if (order === 'az') {
            I.selectOption(sortDropdown, 'Name (A to Z)');
        } else if (order === 'za') {
            I.selectOption(sortDropdown, 'Name (Z to A)');
        } else {
            throw new Error(`Invalid sorting order: ${order}`);
        }

        I.wait(1); // Wait for the page to update after sorting
    }
};