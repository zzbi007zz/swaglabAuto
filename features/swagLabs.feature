Feature: Swag Labs

    Scenario: Successful Login
        Given I am on the login page
        When I fill in the username with "standard_user"
        And I fill in the password with "secret_sauce"
        And I click the login button
        Then I should see the inventory page

    Scenario: Invalid Login
        Given I am on the login page
        When I fill in the username with "invalid_user"
        And I fill in the password with "invalid_password"
        And I click the login button
        Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

    Scenario: Logout Functionality
        Given I am logged in as "standard_user" with password "secret_sauce"
        When I click the burger menu button
        And I click the logout link
        Then I should be redirected to the login page

    Scenario: Add Product to Cart
        Given I am logged in as "standard_user" with password "secret_sauce"
        When I click the add to cart button
        Then I should see the cart badge

    Scenario: Remove Product from Cart
        Given I am logged in as "standard_user" with password "secret_sauce"
        And I have added a product to the cart
        When I click the remove button
        Then I should not see the cart badge

    Scenario: View Product Details
        Given I am logged in as "standard_user" with password "secret_sauce"
        When I click on a product name
        Then I should see the product details page

    Scenario: Checkout Process
        Given I am logged in as "standard_user" with password "secret_sauce"
        And I have added a product to the cart
        When I click the cart link
        And I click the checkout button
        And I fill in the checkout information with first name "John", last name "Doe", and zip code "12345"
        And I click the continue button
        And I click the finish button
        Then I should see the order confirmation message "Thank you for your order!"

    Scenario: Verify Sorted Product Prices
        Given I am logged in as "standard_user" with password "secret_sauce"
        When I sort the products by price from low to high
        Then I should see the products sorted by price in ascending order

    Scenario: Verify Product Sorting - Name (Z to A)
        Given I am logged in as "standard_user" with password "secret_sauce"
        When I sort the products by name from Z to A
        Then I should see the products sorted by name in descending order

    Scenario: Verify Product Sorting - Price (high to low)
        Given I am logged in as "standard_user" with password "secret_sauce"
        When I sort the products by price from high to low
        Then I should see the products sorted by price in descending order

    Scenario: Verify Checkout Information Validation
        Given I am logged in as "standard_user" with password "secret_sauce"
        And I have added a product to the cart
        When I click the cart link
        And I click the checkout button
        And I fill in the checkout information with first name "", last name "", and zip code ""
        And I click the continue button
        Then I should see an error message "Error: First Name is required"