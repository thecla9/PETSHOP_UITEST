const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
    baseUrl: 'https://pet-shop.buckhill.com.hr/',
    specPattern: 'cypress/e2e/**/*.spec.js',
    // Configure timeouts
    defaultCommandTimeout: 10000, // Timeout for most commands
    pageLoadTimeout: 60000, // Timeout for page loads
    requestTimeout: 10000, // Timeout for requests
    responseTimeout: 10000, // Timeout for responses
  },
  env: {
    USER_API_TOKEN: process.env.USER_API_TOKEN,
    ADMIN_API_TOKEN: process.env.ADMIN_API_TOKEN
  }
});
