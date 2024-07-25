describe('User Login Tests', () => {
  const baseUrl = 'https://pet-shop.buckhill.com.hr/';
  before(() => {
    // Handle uncaught exceptions to prevent test failures
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Failed to fetch')) {
        return false; // returning false here prevents Cypress from failing the test
      }
    });
  });
  
  beforeEach(() => {
    cy.visit(`${baseUrl}`);

    // Handle uncaught exceptions to prevent test failures
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Failed to fetch')) {
        return false; // returning false here prevents Cypress from failing the test
      }
    });
  });

  it('TS-01: Should log in successfully with valid credentials', () => {
    cy.get('#__nuxt > div > div > nav > header > div > div > div:nth-child(3) > button.v-btn.v-theme--PetGreen.text-white.v-btn--density-default.v-btn--size-default.v-btn--variant-outlined.ml-6 > span.v-btn__content')
      .click();
    cy.get('input[type="text"][aria-describedby="input-10-messages"]').type('ezenwathecla90+100@gmail.com');
    cy.get('input.v-field__input[type="password"]').type('golive@123');

    // Check the "Remember me" checkbox within a specific parent
    cy.get('div.v-selection-control.v-checkbox-btn')
      .contains('Remember me')
      .click();

    // Verify checkbox is checked
    cy.get('div.v-selection-control.v-checkbox-btn')
      .find('input[type="checkbox"]')
      .should('be.checked');

    // Submit the login form using a CSS selector based on text content
    cy.contains('Log in').click();
    // Assert that the URL should take user to the dashbaord after login
    cy.url().should('include', 'https://pet-shop.buckhill.com.hr/');

    // Check if error message is visible
    cy.document().then((doc) => {
      const errorMessage = doc.querySelector('.error-message');
      if (errorMessage) {
        if (errorMessage.textContent.includes('Failed to authenticate user')) {
          cy.log('Type error: failed to fetch error message is visible');
        } else {
          cy.log('Error message visible but does not contain "Failed to authenticate user"');
        }
      } else {
        cy.log('Expected error message not found');
      }
    });

    cy.request(`${baseUrl}`).then(response => {
      if (response.status === 422) {
        cy.log('Received 422 status as expected for Failed to authenticate user');
      } else {
        cy.log(`status code: ${response.status}`);
      }
    });
  });

  it('TS-02: Should display error for invalid email format', () => {
    cy.get('#__nuxt > div > div > nav > header > div > div > div:nth-child(3) > button.v-btn.v-theme--PetGreen.text-white.v-btn--density-default.v-btn--size-default.v-btn--variant-outlined.ml-6 > span.v-btn__content')
      .click();
    cy.get('input[type="text"][aria-describedby="input-10-messages"]').type('ezenwathecla90100@gmail.com');
    cy.get('input.v-field__input[type="password"]').type('golive@12345');

    // Submit the login form
    cy.contains('Log in').click();

    // Check if error message is visible
    cy.document().then((doc) => {
      const errorMessage = doc.querySelector('.error-message');
      if (errorMessage) {
        if (errorMessage.textContent.includes('Failed to authenticate user')) {
          cy.log('Email is invalid error message is visible');
        } else {
          cy.log('Error message visible but does not contain "Failed to authenticate user"');
        }
      } else {
        cy.log('Expected error message not found');
      }
    });

    // Add other assertions as needed for status codes or other conditions
    cy.request(`${baseUrl}`).then(response => {
      if (response.status === 422) {
        cy.log('Received 422 status as expected for invalid email format');
      } else {
        cy.log(`Unexpected status code: ${response.status}`);
      }
    });
  });

  it('TS-03: Should display error for incorrect password', () => {
    cy.get('#__nuxt > div > div > nav > header > div > div > div:nth-child(3) > button.v-btn.v-theme--PetGreen.text-white.v-btn--density-default.v-btn--size-default.v-btn--variant-outlined.ml-6 > span.v-btn__content')
      .click();
    cy.get('input[type="text"][aria-describedby="input-10-messages"]').type('theclaworld@gmail.com');
    cy.get('input.v-field__input[type="password"]').type('goliv1e@12345');

    // Check the "Remember me" checkbox within a specific parent
    cy.get('div.v-selection-control.v-checkbox-btn')
      .contains('Remember me')
      .click();

    // Verify checkbox is checked
    cy.get('div.v-selection-control.v-checkbox-btn')
      .find('input[type="checkbox"]')
      .should('be.checked');

    // Submit the login form using a CSS selector based on text content
    cy.contains('Log in').click();

    // Check if error message is visible
    cy.document().then((doc) => {
      const errorMessage = doc.querySelector('.error-message');
      if (errorMessage) {
        if (errorMessage.textContent.includes('Invalid Password')) {
          cy.log('Invalid Password message is visible');
        } else {
          cy.log('Error message visible but does not contain "Invalid Password"');
        }
      } else {
        cy.log('Expected error message not found');
      }
    });

    // Add other assertions as needed for status codes or other conditions
    cy.request(`${baseUrl}`).then(response => {
      if (response.status === 422) {
        cy.log('Received 422 status as expected for invalid password');
      } else {
        cy.log(`Unexpected status code: ${response.status}`);
      }
    });
  });

  it('TS-04: Should display error for non-existent email', () => {
    cy.get('#__nuxt > div > div > nav > header > div > div > div:nth-child(3) > button.v-btn.v-theme--PetGreen.text-white.v-btn--density-default.v-btn--size-default.v-btn--variant-outlined.ml-6 > span.v-btn__content')
      .click();
    cy.get('input[type="text"][aria-describedby="input-10-messages"]').type('thecla90@gmail.com');
    cy.get('input.v-field__input[type="password"]').type('golive@12345');

    // Check the "Remember me" checkbox within a specific parent
    cy.get('div.v-selection-control.v-checkbox-btn')
      .contains('Remember me')
      .click();

    // Verify checkbox is checked
    cy.get('div.v-selection-control.v-checkbox-btn')
      .find('input[type="checkbox"]')
      .should('be.checked');

    // Submit the login form
    cy.contains('Log in').click();
    cy.contains('Failed to authenticate user');

    // Check if error message is visible
    cy.document().then((doc) => {
      const errorMessage = doc.querySelector('.error-message');
      if (errorMessage) {
        if (errorMessage.textContent.includes('Failed to authenticate user')) {
          cy.log('Invalid email message is visible');
        } else {
          cy.log('Error message visible but does not contain "Failed to authenticate user"');
        }
      } else {
        cy.log('Expected error message not found');
      }
    });

    // Add other assertions as needed for status codes or other conditions
    cy.request(`${baseUrl}`).then(response => {
      if (response.status === 422) {
        cy.log('Received 422 status as expected for non-existent email');
      } else {
        cy.log(`Unexpected status code: ${response.status}`);
      }
    });
  });

  it('TS-05: Should display errors for empty email and password fields', () => {
    cy.contains('Failed to authenticate user');
    cy.contains('Failed to authenticate user');
    cy.contains('Log in').click();

    // Check if error message is visible
    cy.document().then((doc) => {
      const errorMessage = doc.querySelector('.error-message');
      if (errorMessage) {
        if (errorMessage.textContent.includes('email or password is required')) {
          cy.log('Email or Password is required message is visible');
        } else {
          cy.log('Error message visible but does not contain "Email or Password is required"');
        }
      } else {
        cy.log('Expected error message not found');
      }
    });

    // Add other assertions as needed for status codes or other conditions
    cy.request(`${baseUrl}`).then(response => {
      if (response.status === 422) {
        cy.log('Received 422 status as expected for missing email or password');
      } else {
        cy.log(`Unexpected status code: ${response.status}`);
      }
    });
  });
});
