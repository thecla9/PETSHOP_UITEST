describe('Admin Product Management', () => {
    const baseUrl = 'https://pet-shop.buckhill.com.hr/login'; // Admin login URL
    const adminEmail = 'admin@buckhill.co.uk';
    const adminPassword = 'admin';
    const updatedProductName = 'Updated Product Name'; // Replace with new product name for editing
    let existingProductName; // Variable to store the name of the product to be edited

    before(() => {
        // Handle uncaught exceptions to prevent test failures
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Failed to fetch') || err.message.includes('chrome-error://chromewebdata/') || err.message.includes('Container is not defined')) {
                return false; // Prevent Cypress from failing the test
            }
        });
    });

    beforeEach(() => {
        // Perform login
        cy.visit(baseUrl);
        cy.get('#input-0').type(adminEmail);
        cy.get('#input-2').type(adminPassword);
        cy.contains('Log in').click();

        // Ensure successful redirection to the dashboard
        cy.url({ timeout: 10000 }).should('include', '/dashboard');

        // Navigate to Products page
        cy.get('#__nuxt > div > div > div > nav > div > div > div:nth-child(4) > div > a > div > div.v-list-item__content > div').click();
        cy.url().should('include', '/dashboard/products');
    });

    it('should delete an existing product', () => {
        // Ensure products are loaded
        cy.wait(5000); // Adjust wait time if necessary

        // Ensure the table is loaded and visible
        cy.get('#__nuxt > div > div > div > main > div > div > div:nth-child(2) > div > div > div.v-table.v-theme--PetGreen.v-table--density-default.c-table.products__table > div')
            .should('be.visible')
            .within(() => {
                // Retrieve the name of the first product in the table
                cy.get('table > tbody > tr:nth-child(1) > td:nth-child(1)')
                    .invoke('text')
                    .then((productName) => {
                        existingProductName = productName.trim();

                        // Click on the action button (three dots icon) for the first product
                        cy.get('table > tbody > tr:nth-child(1) > td:nth-child(6) > div > span').first().click();

                        // Click on the Delete option
                        cy.get('table > tbody > tr:nth-child(1) > td:nth-child(6) > div > span:nth-child(2) > i').click();
                    });
            });
    });

});