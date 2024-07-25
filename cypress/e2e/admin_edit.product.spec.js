describe('Admin Product Management', () => {
    const baseUrl = 'https://pet-shop.buckhill.com.hr/login'; // Admin login URL
    const adminEmail = 'admin@buckhill.co.uk';
    const adminPassword = 'admin';
    const updatedProductName = 'Updated Product Name'; // New product name for editing
    const existingProductName = 'Product to be Edited'; // Product name to be edited

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

    it('should edit an existing product successfully', () => {
        // Navigate to the Products page
        cy.visit('/dashboard/products');

        // Assert the page contains the list of products
        cy.get('products').should('exist'); // Replace with the actual container selector

        // Assert the existing product is present in the list
        cy.contains(existingProductName).should('exist');

        // Click on the action button (three dots icon) for the product to be edited
        cy.get('table > tbody > tr')
            .contains(existingProductName)
            .parent('tr')
            .find('td:nth-child(6) > div > span')
            .click();

        // Click on the Edit option
        cy.get('table > tbody > tr')
            .contains(existingProductName)
            .parent('tr')
            .find('td:nth-child(6) > div > span:nth-child(1) > i')
            .click();

        // Perform the edit by clearing the existing product name and typing the updated name
        cy.get('#product-name').clear().type(updatedProductName);

        // Save the updated product
        cy.contains('Save').click();

        // Assert the updated product details are correctly saved
        cy.contains(updatedProductName).should('exist');
        
        // Additional verification to ensure the product is updated correctly
        cy.get('table > tbody > tr')
            .contains(updatedProductName)
            .should('exist');
    });
});
