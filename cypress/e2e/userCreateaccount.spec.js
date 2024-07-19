import { userData } from '../support/constants';
describe('User Create Account', () => {
  before(() => {

    // Handle uncaught exceptions to prevent test failures
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Failed to fetch')) {
        return false; // returning false here prevents Cypress from failing the test
      }
    });
  });

  beforeEach(() => {
    // Ensure the app is visited before each test
    cy.visit('https://pet-shop.buckhill.com.hr/');
    cy.get('#__nuxt > div > div > nav > header > div > div > div:nth-child(3) > button.v-btn.v-theme--PetGreen.text-white.v-btn--density-default.v-btn--size-default.v-btn--variant-outlined.ml-6 > span.v-btn__content')
      .click();
    cy.get('body > div.v-overlay-container > div > div.v-overlay__content > div > div.auth-actions > span:nth-child(2)')
      .click();

  });

  it('should create an account', () => {

    // Destructure constants from userData
    const { firstName, lastName, email, phoneNumber, address, password, confirmPassword } = userData;

    // Generate unique data
    cy.get('#input-26').type(firstName);
    cy.get('#input-28').type(lastName);
    cy.get('#input-30').type(email);
    // Using eq() to select the first matching element
    cy.get('[id^="input-"]').should('be.visible').eq(4).type(phoneNumber);
    cy.get('[id^="input-"]').should('be.visible').eq(5).type(address);
    cy.get('[id^="input-"]').should('be.visible').eq(6).type(password);
    cy.get('[id^="input-"]').should('be.visible').eq(6).type(confirmPassword);
    // Generate random boolean for isMarketing checkbox
    const isMarketing = Math.random() < 0.5; // 50% chance of being true or false

    if (isMarketing) {
      // Example: Check if visible and not disabled before clicking
      cy.get('[id^="checkbox-"]').check();// Check the checkbox if isMarketing is true
    } else {
      cy.get('[id^="checkbox-"]').uncheck(); // Uncheck the checkbox if isMarketing is false
    }

    cy.get('body > div.v-overlay-container > div > div.v-overlay__content > div > button > span.v-btn__content').click();
    //cy.url().should('include', '/dashboard');
    //cy.contains('Welcome, Thecla').should('be.visible');
  });

  it('should return error for duplicate email', () => {

    // Generate unique data
    cy.get('#input-26').type(firstName);
    cy.get('#input-28').type(lastName);
    cy.get('#input-30').as('emailInput').type("theclaworld@gmail.com");
    // Using eq() to select the first matching element
    cy.get('[id^="input-"]').should('be.visible').eq(4).type(phoneNumber);
    cy.get('[id^="input-"]').should('be.visible').eq(5).type(address);
    cy.get('[id^="input-"]').should('be.visible').eq(6).type(password);
    cy.get('[id^="input-"]').should('be.visible').eq(6).type(confirmPassword);
    // Generate random boolean for isMarketing checkbox
    const isMarketing = Math.random() < 0.5; // 50% chance of being true or false

    if (isMarketing) {
      // Example: Check if visible and not disabled before clicking
      cy.get('[id^="checkbox-"]').check();// Check the checkbox if isMarketing is true
    } else {
      cy.get('[id^="checkbox-"]').uncheck(); // Uncheck the checkbox if isMarketing is false
    }

    cy.get('body > div.v-overlay-container > div > div.v-overlay__content > div > button > span.v-btn__content').click();

    cy.contains('Email already exists').should('be.visible');
  });

  it('should not create account with invalid email', () => {
    // Destructure constants from userData
    const { firstName, lastName, email, phoneNumber, address, password, confirmPassword } = userData;
    // Generate unique data
    cy.get('#input-26').type(firstName);
    cy.get('#input-28').type(lastName);
    cy.get('#input-30').type(email);
    // Using eq() to select the first matching element
    cy.get('[id^="input-"]').should('be.visible').eq(4).type(phoneNumber);
    cy.get('[id^="input-"]').should('be.visible').eq(5).type(address);
    cy.get('[id^="input-"]').should('be.visible').eq(6).type(password);
    cy.get('[id^="input-"]').should('be.visible').eq(6).type(confirmPassword);

    const isMarketing = Math.random() < 0.5; // 50% chance of being true or false

    if (isMarketing) {
      // Example: Check if visible and not disabled before clicking
      cy.get('[id^="checkbox-"]').check();// Check the checkbox if isMarketing is true
    } else {
      cy.get('[id^="checkbox-"]').uncheck(); // Uncheck the checkbox if isMarketing is false
    }

    cy.get('button[type="submit"]').click();


    cy.contains('Invalid email format').should('be.visible');
  });

  it('should not create account with short password', () => {
    // Destructure constants from userData
    const { firstName, lastName, email, phoneNumber, address, password, confirmPassword } = userData;
    // Generate unique data
    cy.get('#input-26').type(firstName);
    cy.get('#input-28').type(lastName);
    cy.get('#input-30').type(email);
    // Using eq() to select the first matching element
    cy.get('[id^="input-"]').should('be.visible').eq(4).type(phoneNumber);
    cy.get('[id^="input-"]').should('be.visible').eq(5).type(address);
    cy.get('[id^="input-"]').should('be.visible').eq(6).type(password);
    cy.get('[id^="input-"]').should('be.visible').eq(6).type(confirmPassword);
    // Generate random boolean for isMarketing checkbox
    const isMarketing = Math.random() < 0.5; // 50% chance of being true or false

    if (isMarketing) {
      // Example: Check if visible and not disabled before clicking
      cy.get('[id^="checkbox-"]').check();// Check the checkbox if isMarketing is true
    } else {
      cy.get('[id^="checkbox-"]').uncheck(); // Uncheck the checkbox if isMarketing is false
    }

    cy.get('button[type="submit"]').click();


    cy.contains('Password too short').should('be.visible');
  });

  it('should require all fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('First name is required').should('be.visible');
    cy.contains('Last name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
    cy.contains('Password confirmation is required').should('be.visible');
    cy.contains('Address is required').should('be.visible');
    cy.contains('Phone number is required').should('be.visible');
  });
});
