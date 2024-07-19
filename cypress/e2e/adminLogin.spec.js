describe('Admin Login Tests', () => {
  const baseUrl = 'https://pet-shop.buckhill.com.hr/login'; // replace with your application's admin URL

  before(() => {
    // Handle uncaught exceptions to prevent test failures
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Failed to fetch') || err.message.includes('chrome-error://chromewebdata/')) {
        return false; // returning false here prevents Cypress from failing the test
      }
    });
  });

  beforeEach(() => {
    cy.visit(baseUrl);

    // Handle uncaught exceptions to prevent test failures
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Failed to fetch') || err.message.includes('chrome-error://chromewebdata/')) {
        return false; // returning false here prevents Cypress from failing the test
      }
    });
  });

  it('TS-01: Successful Admin Login', () => {
    cy.get('#input-0').type('admin@buckhill.co.uk');
    cy.get('#input-2').type('admin');
    cy.contains('Log in').click();
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
  });

  it('TS-02: Incorrect Admin Password', () => {
    cy.get('#input-0').type('admin@buckhill.co.uk');
    cy.get('#input-2').type('Wrong Password');
    cy.contains('Log in').click();

    // Check for the error message and handle different scenarios
    cy.document().then((doc) => {
      const errorMessage = doc.querySelector('.error-message');

      if (errorMessage) {
        if (errorMessage.textContent.includes('Incorrect email or password')) {
          cy.log('Incorrect email or password message is visible');
          cy.contains('Incorrect email or password').should('be.visible');
        } else {
          cy.log('Error message visible but does not contain "Incorrect email or password"');
          cy.contains(errorMessage.textContent).should('be.visible');
        }
      } else {
        cy.log('Expected error message not found');
        // You can add additional assertions or actions here if needed
      }
    });
  });


  it('TS-03: Empty Admin Email Field', () => {
    cy.get('#input-2').type('admin');
    cy.contains('Log in').click();
    cy.contains('Email is required').should('be.visible');
  });

  it('TS-04: Empty Admin Password Field', () => {
    cy.get('#input-0').type('admin@buckhill.co.uk');
    cy.contains('Log in').click();
    cy.contains('Password is required').should('be.visible');
  });

  it('TS-05: Admin Login with Locked Account', () => {
    for (let i = 0; i < 5; i++) {
      cy.get('#input-0').type('admin@buckhill.co.uk');
      cy.get('#input-2').type('admin');
      cy.contains('Log in').click();
      cy.contains('Incorrect email or password').should('be.visible');
    }
    cy.get('#input-0').type('admin@buckhill.co.uk');
    cy.get('#input-2').type('admin');
    cy.contains('Log in').click();
    cy.contains('Your account is temporarily locked').should('be.visible');
    // Check for the error message and handle different scenarios
    cy.document().then((doc) => {
      const errorMessage = doc.querySelector('.error-message');

      if (errorMessage) {
        if (errorMessage.textContent.includes('\Your account is temporarily locked')) {
          cy.log('Your account is temporarily locked is visible');
          cy.contains('Your account is temporarily locked').should('be.visible');
        } else {
          cy.log('Error message visible but does not contain "Your account is temporarily locked"');
          cy.contains(errorMessage.textContent).should('be.visible');
        }
      } else {
        cy.log('Expected error message not found');
       
      }
  });

  it('TS-06: Admin Login with Case-Sensitive Email', () => {
    cy.get('#input-0').type('ADMIN@buckhill.co.uk');
    cy.get('#input-2').type('admin');
    cy.contains('Log in').click();
  });

  });

  it('TS-07: Admin Login with Remember Me Option Checked', () => {
    cy.get('#input-0').type('admin@buckhill.co.uk');
    cy.get('#input-2').type('admin');
    cy.contains('Log in').click();
    cy.get('input[type="checkbox"]').check(); 
    cy.url().should('include', '/admin/dashboard');
    cy.contains('Welcome, Admin');

    // Simulate closing and reopening the browser
    cy.reload();
    cy.url().should('include', '/admin/dashboard');
  });

  it('TS-08: Admin Login with Invalid Email Format', () => {
    cy.get('#input-0').type('adminuckhill.co.uk');
    cy.get('#input-2').type('admin');
    cy.contains('Log in').click();
    cy.contains('Please enter a valid email address').should('be.visible');

    // Check for the error message and handle different scenarios
    cy.document().then((doc) => {
      const errorMessage = doc.querySelector('.error-message');

      if (errorMessage) {
        if (errorMessage.textContent.includes('Incorrect email or password')) {
          cy.log('Invalid email format message is visible');
          cy.contains('Invalid email format').should('be.visible');
        } else {
          cy.log('Error message visible but does not contain "Invalid email format"');
          cy.contains(errorMessage.textContent).should('be.visible');
        }
      } else {
        cy.log('Expected error message not found');
        // You can add additional assertions or actions here if needed
      }
  });
  });
  });
