describe('Admin Add Customer Automation', () => {
    const adminEmail = 'admin@buckhill.co.uk';
    const adminPassword = 'admin';
    const loginUrl = 'https://pet-shop.buckhill.com.hr/login';
    const customersUrl = 'https://pet-shop.buckhill.com.hr/dashboard/customers';

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

    function generateRandomLocation() {
        return 'Random Location'; // Adjust this as needed
    }

    before(() => {
        cy.visit(loginUrl);
        cy.get('#input-0').type(adminEmail);
        cy.get('#input-2').type(adminPassword);
        cy.contains('Log in').click();
        cy.url({ timeout: 10000 }).should('include', '/dashboard');

        // Click on the customers page navigation item
        cy.contains('Customers').click();

        // Ensure the current URL is the customers page
        cy.url({ timeout: 10000 }).should('include', customersUrl);
    });

    it('should navigate to the customers page and add a new customer successfully', () => {
        const firstName = generateRandomString(5);
        const lastName = generateRandomString(5);
        const email = generateRandomEmail();
        const phone = generateRandomPhoneNumber();
        const location = generateRandomLocation();
        const password = 'password123'; // Define the password here
        const confirmPassword = password;

            // Click the "Add New Customer" button using the specified selector
            cy.get('#__nuxt > div > div > div > main > div > div > div:nth-child(2) > div > div > div.table-header > div.table-header__main > div.table-header__content > button > span.v-btn__content').click()

        // Fill out the form
        cy.get('input.v-field__input').eq(0).type(firstName, { force: true }); // Assuming the first input is for the first name
        cy.get('input.v-field__input').eq(1).type(lastName, { force: true });  // Assuming the second input is for the last name
        cy.get('input.v-field__input').eq(2).type(email, { force: true });     // Assuming the third input is for the email
        cy.get('input.v-field__input').eq(3).type(phone, { force: true });  
        cy.get('input.v-field__input').eq(3).type(location, { force: true });     
        cy.get('input.v-field__input').eq(3).type(password, { force: true }); 
        cy.get('input.v-field__input').eq(3).type(confirmPassword, { force: true });    
        cy.get('div').contains('Add new customer').click(); // Adjust as needed
        cy.get('body').then($body => {
            console.log($body.html()); // Log HTML to inspect element attributes
          });


        // Verify the new customer is added successfully
        cy.contains(firstName, { timeout: 20000 }).should('exist');
        cy.contains(lastName, { timeout: 20000 }).should('exist');
    });
});
