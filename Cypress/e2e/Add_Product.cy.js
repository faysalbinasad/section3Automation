describe('Teebay-Buggy Add Product Test', () => {
  it('Should add a new product successfully', () => {
    cy.visit('/'); // This will visit http://localhost:3000/teebay-buggy/

    cy.wait(2000);

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    // Wait for the "Add Product" button to be visible and then click it
    cy.get('button').contains('Add Product').should('be.visible').click();

    cy.wait(2000);

    //Enter Title
    cy.get('input[name="title"]').type('Headphone');

    cy.wait(2000);



    // Open the dropdown menu
    cy.get('div[name="categories"]').click();

    cy.wait(2000);

    // Select the desired option from the dropdown
    cy.get('div[name="categories"] .menu .item')
      .contains('Electronics') // Replace with the text of the option you want to select
      .click();

    cy.wait(2000);

    //Enter Description
    cy.get('textarea[name="description"]').type('This is a headphone. Fully fresh in condition.', { force: true });

    cy.wait(2000);

    //Enter Purchase Price
    cy.get('input[name="purchase_price"]').type('199.99', { force: true });

    cy.wait(2000);

    //Enter Rent Price
    cy.get('input[name="rent_price"]').type('299.99', { force: true });

    cy.wait(2000);

    // Open the dropdown menu
    cy.get('div[name="rent_duration_type"]').click();

    cy.wait(2000);

    // Select the desired option from the dropdown
    cy.get('div[name="rent_duration_type"] .menu .item')
      .contains('Monthly') // Replace with the text of the option you want to select
      .click();

    cy.wait(2000);

    //Click on the 'Add Product' button
    cy.get('button.ui.blue.button[type="submit"]').click({ force: true });

    cy.wait(2000);

    // Ensure the toast message is visible and contains the expected text
    cy.get('.Toastify__toast')
      .should('be.visible')
      .find('.Toastify__toast-body')
      .should('contain.text', 'New product added!');

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
