describe('Admin Product Management - Edit Product', () => {
    const baseUrl = 'https://pet-shop.buckhill.com.hr/login'; // Admin login URL
    const adminEmail = 'admin@buckhill.co.uk';
    const adminPassword = 'admin';
    const updatedProductName = 'Updated Product Name'; // New product name for editing
    const updatedProductPrice = '99.99'; // New product price for editing
    const updatedProductDescription = 'Updated Product Description'; // New product description for editing
    const productsToEdit = [
        'Purina Tidy Cats Clumping Cat Litter',
        'Precious Cat Unscented Ultra Clumping Cat Litter'
    ]; // Products to be edited

    before(() => {
        // Handle uncaught exceptions to prevent test failures
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Failed to fetch') || 
                err.message.includes('chrome-error://chromewebdata/') || 
                err.message.includes('Container is not defined')) {
                return false; // Prevent Cypress from failing the test
            }
        });

        // Log in as admin
        cy.visit(baseUrl);
        cy.get('#input-0').type(adminEmail);
        cy.get('#input-2').type(adminPassword);
        cy.contains('Log in').click();

        // Assert successful login by checking for a specific element that appears only after login
        cy.url().should('include', '/dashboard'); // Replace with your dashboard URL or a specific element present after login
    });

    beforeEach(() => {
        // Ensure successful redirection to the dashboard
        cy.visit(baseUrl);
        cy.get('#input-0').type(adminEmail);
        cy.get('#input-2').type(adminPassword);
        cy.contains('Log in').click();
        cy.url({ timeout: 10000 }).should('include', '/dashboard');

        // Navigate to Products page
        cy.get('#__nuxt > div > div > div > nav > div > div > div:nth-child(4) > div > a > div > div.v-list-item__content > div').click();
        cy.url().should('include', '/dashboard/products');
    });

    productsToEdit.forEach(productName => {
        it(`should edit the product "${productName}" successfully`, () => {
            // Ensure products are loaded
            cy.wait(5000); // Adjust wait time if necessary

            // Ensure the table is loaded and visible
            cy.get('#__nuxt > div > div > div > main > div > div > div:nth-child(2) > div > div > div.v-table.v-theme--PetGreen.v-table--density-default.c-table.products__table > div')
                .should('be.visible')
                .within(() => {
                    // Assert the product is present in the list
                    cy.contains(productName).should('exist');

                    // Click on the action button (three dots icon) for the product to be edited
                    cy.contains(productName)
                        .parent('tr')
                        .find('td:nth-child(6) > div > span > i')
                        .click();

                    // Click on the Edit option
                    cy.contains(productName)
                        .parent('tr')
                        .find('td:nth-child(6) > div > span:nth-child(1)')
                        .click();
                });

            // Edit Product Details using alternative selectors
            cy.get('input[aria-describedby="input-53-messages"]').clear().type(updatedProductName); // Product name input
            cy.get('input[aria-describedby="input-59-messages"]').clear().type(updatedProductPrice); // Product price input
            cy.get('textarea[aria-describedby="input-62-messages"]').clear().type(updatedProductDescription); // Product description textarea

            // Save the updated product
            cy.get('button:contains(Save)').click(); // Adjust selector if needed

            // Assert the updated product details are correctly saved
            cy.contains(updatedProductName).should('exist');
            
            // Additional verification to ensure the product is updated correctly
            cy.get('table > tbody > tr')
                .contains(updatedProductName)
                .should('exist');
        });
    });
});
