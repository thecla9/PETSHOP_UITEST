<<<<<<< HEAD
const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
=======
const { defineConfig } = require('cypress')
>>>>>>> 5d68debeb9805eacc85a9099b56495bf90b76ac4

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
<<<<<<< HEAD
      // Implement node event listeners here
    },
    baseUrl: 'https://pet-shop.buckhill.com.hr/',
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
  env: {
    USER_API_TOKEN: process.env.USER_API_TOKEN,
    ADMIN_API_TOKEN: process.env.ADMIN_API_TOKEN
  }
});
=======
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.spec.js',
    shell:true
  },
})
>>>>>>> 5d68debeb9805eacc85a9099b56495bf90b76ac4
