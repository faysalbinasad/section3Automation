describe('Teebay-Buggy Add and Delete Products Test', () => {
  it('Should add 5 new products and then delete the 3rd and 4th products', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app

    // Log in
    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Function to add a new product
    const addProduct = (title, description, purchasePrice, rentPrice) => {
      cy.get('button').filter('[class*="ui blue"]').first().click(); // Click on the 'Add Product' button
      cy.get('input[name="title"]').type(title);
      cy.get('div[name="categories"]').click();
      cy.get('div[name="categories"] .menu .item').first().click(); // Select the first category
      cy.get('textarea[name="description"]').type(description, { force: true });
      cy.get('input[name="purchase_price"]').type(purchasePrice, { force: true });
      cy.get('input[name="rent_price"]').type(rentPrice, { force: true });
      cy.get('div[name="rent_duration_type"]').click();
      cy.get('div[name="rent_duration_type"] .menu .item').first().click(); // Select the first duration type
      cy.get('button.ui.blue.button[type="submit"]').click({ force: true });

      // Ensure the toast message is visible and contains the expected text
      cy.get('.Toastify__toast', { timeout: 10000 }).should('be.visible')
        .find('.Toastify__toast-body')
        .should('contain.text', 'New product added!');
    };

    // Add 5 new products
    const productDetails = [
      { title: 'Headphone', description: 'Description 1', purchasePrice: '199.99', rentPrice: '299.99' },
      { title: 'Laptop', description: 'Description 2', purchasePrice: '999.99', rentPrice: '1499.99' },
      { title: 'Smartphone', description: 'Description 3', purchasePrice: '699.99', rentPrice: '999.99' },
      { title: 'Tablet', description: 'Description 4', purchasePrice: '299.99', rentPrice: '499.99' },
      { title: 'Smartwatch', description: 'Description 5', purchasePrice: '199.99', rentPrice: '299.99' }
    ];

    productDetails.forEach(({ title, description, purchasePrice, rentPrice }) => {
      addProduct(title, description, purchasePrice, rentPrice);
      cy.wait(2000); // Adjust the wait time if needed
    });

    // Assertion to check that 7 products are present
    cy.get('.sc-bXCLTC.etBlfP').should('have.length', 7);

    // Function to delete specific products (3rd and 4th)
    const deleteSpecificProducts = (indices) => {
      cy.get('.sc-bXCLTC.etBlfP').each(($productContainer, index) => {
        if (indices.includes(index)) {
          // Click on the trash icon within the current product container
          cy.wrap($productContainer).find('.trash').first().click();
          // Ensure the ".actions > .blue" button is found before clicking
          cy.get('.actions > .blue').should('exist').click();
          cy.wait(1000); // Adjust the wait time if needed
        }
      });
    };

    // Delete 3rd and 4th products (indices 2 and 3)
    deleteSpecificProducts([2, 3]);

    // Assertion to check that 5 products remain
    cy.get('.sc-bXCLTC.etBlfP').should('have.length', 5);

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
