describe('Admin Add Customer Automation', () => {
    const adminEmail = 'admin@buckhill.co.uk';
    const adminPassword = 'admin';
    const loginUrl = 'https://pet-shop.buckhill.com.hr/login';
    const addCustomerUrl = 'https://pet-shop.buckhill.com.hr/dashboard';

    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function generateRandomEmail() {
        const randomString = generateRandomString(10);
        return `${randomString}@example.com`;
    }

    function generateRandomPhoneNumber() {
        return '1234567890'; // You can also randomize the phone number if needed
    }

    before(() => {
        cy.visit(loginUrl);
        cy.get('#input-0').type(adminEmail);
        cy.get('#input-2').type(adminPassword);
        cy.contains('Log in').click();
        cy.url({ timeout: 10000 }).should('include', 'https://pet-shop.buckhill.com.hr/dashboard');
    });

    it('should navigate to and add a new customer successfully', () => {
        const firstName = generateRandomString(5);
        const lastName = generateRandomString(5);
        const email = generateRandomEmail();
        const phone = generateRandomPhoneNumber();

        cy.visit('https://pet-shop.buckhill.com.hr'); // Navigate to dashboard

        // Ensure we are on the dashboard page
        cy.url({ timeout: 10000 }).should('include', '/dashboard');

        // Click the "Add Customer" button using the updated selector
        cy.get('#__nuxt > div > div > div > main > div > div > div:nth-child(2) > div > div > div.table-header > div.table-header__main > div.table-header__content > button > span.v-btn__content > i')
            .click();

        // Wait for the navigation or loading to complete
        cy.wait(2000); // Adjust the wait time as needed

        // Ensure navigation to the add customer page
        cy.url({ timeout: 10000 }).should('include', '/dashboard');

        // Fill in the customer details
        cy.get('#input-101').type(firstName);
        cy.get('#input-103').type(lastName);
        cy.get('#input-105').type(email);
        cy.get('#input-107').type(phone);
        cy.get('#input-109').type('123 Main St, Anytown, USA');
        cy.get('#input-111').type('password123');
        cy.get('#input-113').type('password123');
        cy.get('body > div.v-overlay-container > div > div.v-overlay__content > div > div > div > div > div:nth-child(9) > button').click();

        // Assert success message
        cy.contains('Customer added successfully').should('be.visible');
    });
});
