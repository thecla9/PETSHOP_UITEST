// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://pet-shop.buckhill.com.hr/login', 
    body: { email, password }
  }).then((response) => {
    // Ensure the response status is 200
    expect(response.status).to.eq(200);

    // Get the token from the response body and set it as a cookie
    const token = response.body.token;
    if (token) {
      cy.setCookie('auth_token', token);
    } else {
      throw new Error('Login failed: No token received');
    }
  });
});

// -- This is a parent command --
Cypress.Commands.add('getLatestCustomerEmail', () => {
  const adminToken = Cypress.env('adminToken');
  cy.request({
    method: 'GET',
    url: 'https://pet-shop.buckhill.com.hr/api/v1/admin/user-listing/',
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    const users = response.body.data;
    return users[0].email; // Assuming the latest customer email is the first in the list
  });
});

// -- This is a parent command --
Cypress.Commands.add('checkAndLog', (selector, expectedText) => {
  cy.get(selector)
    .then($el => {
      if ($el.length > 0 && $el.text().includes(expectedText)) {
        cy.log(`Expected text "${expectedText}" found in "${selector}"`);
      } else {
        cy.log(`Expected text "${expectedText}" NOT found in "${selector}"`);
        Cypress.env('testFailed', true);
      }
    });
});

// -- This is a child command --
Cypress.Commands.add('statusReqShouldBe', (statusCode) => {
  cy.intercept('GET', '**/dashboard', (req) => {
    req.reply((res) => {
      expect(res.statusCode).to.eq(statusCode);
    });
  });
});

// -- This is a utility command --
Cypress.Commands.add('visitPage', (url) => {
  cy.visit(url);
});

// -- This is a utility command --
Cypress.Commands.add('btnFilterBy', (filter) => {
  cy.contains('button', filter).click();
});

// -- This is a utility command --
Cypress.Commands.add('getFromMemoryTestOrdersUUID', () => {
  // Assuming this command retrieves UUIDs from memory or some storage
  return cy.get('@testOrdersUUID');
});

// -- This is a utility command --
Cypress.Commands.add('assertUUIDAgaintsInput', (inputSelector) => {
  cy.get(inputSelector).within(() => {
    cy.get('tr').each(($row, index, $list) => {
      cy.get('@testOrdersUUID').then((uuids) => {
        expect(uuids).to.include($row.find('td').first().text());
      });
    });
  });
});

// cypress/support/commands.js

Cypress.Commands.add('getFromMemoryTestOrdersUUID', () => {
  // Custom logic to get the UUID
  return cy.window().its('yourObjectWithUUID').invoke('getUUID');
});
