describe('Teebay-Buggy Add and Delete Products Test', () => {
  it('Should add a new product successfully and then delete all products', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app

    // Log in
    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Add a new product
    cy.get('button').contains('Add Product').should('be.visible').click();
    cy.get('input[name="title"]').type('Headphone');
    cy.get('div[name="categories"]').click();
    cy.get('div[name="categories"] .menu .item').contains('Electronics').click();
    cy.get('textarea[name="description"]').type('This is a headphone. Fully fresh in condition.', { force: true });
    cy.get('input[name="purchase_price"]').type('199.99', { force: true });
    cy.get('input[name="rent_price"]').type('299.99', { force: true });
    cy.get('div[name="rent_duration_type"]').click();
    cy.get('div[name="rent_duration_type"] .menu .item').contains('Monthly').click();
    cy.get('button.ui.blue.button[type="submit"]').click({ force: true });

    // Wait for the toast message to be visible and contain the expected text
    cy.get('.Toastify__toast', { timeout: 10000 }).should('be.visible')
      .find('.Toastify__toast-body')
      .should('contain.text', 'New product added!');

    cy.wait(4000); // Adjust the wait time if needed

    // Function to delete all products
    const deleteAllProducts = () => {
      return cy.get('.sc-bXCLTC.etBlfP').then(($productContainers) => {
        if ($productContainers.length > 0) {
          const promises = Array.from($productContainers).map(($productContainer) => {
            // Click on the trash icon within the current product container
            return cy.wrap($productContainer).find('.trash').first().click().then(() => {
              // Ensure the ".actions > .blue" button is found before clicking
              cy.get('.actions > .blue').should('exist').click();

              // Optionally, wait for any additional UI updates or animations
              cy.wait(1000); // Adjust the wait time if needed
            });
          });

          // Wait for all promises to resolve before recursively calling the function
          return Cypress.Promise.all(promises).then(() => {
            // After all products are processed, recursively call the function to handle any new products
            return deleteAllProducts();
          });
        }
      });
    };

    // Start the deletion process
    deleteAllProducts().then(() => {
      // Assert that there are no products left
      cy.get('.sc-bXCLTC.etBlfP').should('have.length', 0);
    });

    cy.wait(2000);
    
    // Logout operation
    cy.get('.right > .item').click(); // Click the logout button

    cy.wait(2000);

    // Click the confirmation button to complete the logout
    cy.get('.actions > .blue').click();

    cy.wait(5000);

    // Assertion to check if redirected to the sign-in page
    cy.url().should('include', '/signin');

  });
});
