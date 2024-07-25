describe('Test for Sales Dashboard', () => {
    const baseUrl = 'https://pet-shop.buckhill.com.hr/login'; // replace with your application's admin URL

    before(() => {
        // Handle uncaught exceptions to prevent test failures
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Failed to fetch') || err.message.includes('chrome-error://chromewebdata/')) {
                return false; // Prevent Cypress from failing the test
            }
        });
    });

    beforeEach(() => {
        cy.visit(baseUrl);
    });

    it('TS-01: Successful Admin Login and Dashboard Check', () => {
        // Perform login
        cy.get('#input-0').type('admin@buckhill.co.uk');
        cy.get('#input-2').type('admin');
        cy.contains('Log in').click();

        // Ensure successful redirection to the dashboard
        cy.url({ timeout: 10000 }).should('include', '/dashboard');

        // Verify page content after successful login
        cy.get('#__nuxt > div > div > div > main > div > div > div:nth-child(2) > div > div > div > div > div.v-col.v-col-12 > div > p')
            .should('contain.text', 'Monthly sales');

        cy.get('#__nuxt > div > div > div > main > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div > div.v-card-item > div > div.v-card-subtitle')
            .should('contain.text', 'Total Earnings');

        cy.get('#__nuxt > div > div > div > main > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > div.v-card-item > div > div.v-card-subtitle')
            .should('contain.text', 'Orders this month');

        cy.get('#__nuxt > div > div > div > main > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(4) > div > div.v-card-item > div > div.v-card-subtitle')
            .should('contain.text', 'Potential earnings');
    });
});
