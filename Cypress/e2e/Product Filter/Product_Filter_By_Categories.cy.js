describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, select Home Appliances category, and apply filter', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app's login page

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.get('.ui.menu > :nth-child(2)').click();

    // Click the Categories Dropdown
    cy.get('.form > :nth-child(2) > .ui').click();

    // Select the "Home Appliances" category
    cy.get('span.text').contains('Home Appliances').click();

    // Click on the Filter Button
    cy.get('.sc-cWSHoV > .blue').click();

    // Assertion to verify the filtered product list contains only products from the "Home Appliances" category
    cy.get('.sc-dcJsrY.gqDuVE') // Replace with the actual selector for the product category elements
      .each(($el) => {
        cy.wrap($el).should('contain.text', 'Home Appliances');
      });
  });

});
