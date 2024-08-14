describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, select Home Appliances category, apply filter, and validate product details', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app's login page

    cy.wait(2000);

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    cy.get('.ui.menu > :nth-child(2)').click(); // Navigate to Browse Products

    cy.wait(2000);

    // Click the Categories Dropdown
    cy.get('.form > :nth-child(2) > .ui').click();

    cy.wait(2000);

    // Select the "Home Appliances" category
    cy.get('span.text').contains('Home Appliances').click();

    cy.wait(2000);

    // Click on the Filter Button
    cy.get('.sc-cWSHoV > .blue').click();

    cy.wait(2000);

    // Assertion to verify the filtered product list contains only products from the "Home Appliances" category
    cy.get('.sc-dcJsrY.gqDuVE')
      .each(($el) => {
        cy.wrap($el).should('contain.text', 'Home Appliances');
      });

    cy.wait(2000);

    // Click on the first product from the filtered list
    cy.get('.sc-fqkvVR.jQvrZo').first().click();

    cy.wait(2000);

    // Check the value of the Status
    cy.get('.sc-hknOHE.iLFLNu').then(($status) => {
      if ($status.text().trim() === 'Available') {
        // Check if the Rent and Buy buttons are available
        cy.get('.sc-gFAWRd.cbSKWu').within(() => {
          cy.get('.ui.teal.button').should('exist'); // Check for Rent button
          cy.get('.ui.blue.button').should('exist'); // Check for Buy button
        });
      }

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

});
