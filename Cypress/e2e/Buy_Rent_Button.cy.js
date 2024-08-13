describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, select Home Appliances category, apply filter, and validate product details', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app's login page

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.get('.ui.menu > :nth-child(2)').click(); // Navigate to Browse Products

    // Click the Categories Dropdown
    cy.get('.form > :nth-child(2) > .ui').click();

    // Select the "Home Appliances" category
    cy.get('span.text').contains('Home Appliances').click();

    // Click on the Filter Button
    cy.get('.sc-cWSHoV > .blue').click();

    // Assertion to verify the filtered product list contains only products from the "Home Appliances" category
    cy.get('.sc-dcJsrY.gqDuVE')
      .each(($el) => {
        cy.wrap($el).should('contain.text', 'Home Appliances');
      });

    // Click on the first product from the filtered list
    cy.get('.sc-fqkvVR.jQvrZo').first().click();

    // Check the value of the Status
    cy.get('.sc-hknOHE.iLFLNu').then(($status) => {
      if ($status.text().trim() === 'Available') {
        // Check if the Rent and Buy buttons are available
        cy.get('.sc-gFAWRd.cbSKWu').within(() => {
          cy.get('.ui.teal.button').should('exist'); // Check for Rent button
          cy.get('.ui.blue.button').should('exist'); // Check for Buy button
        });
      }
    });
  });

});
