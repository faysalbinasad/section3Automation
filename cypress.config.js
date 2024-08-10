const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/teebay-buggy', // Set baseUrl here
    supportFile: 'cypress/support/e2e.js', // Correctly set the support file
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false
  }
});
