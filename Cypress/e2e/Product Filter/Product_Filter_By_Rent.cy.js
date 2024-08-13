describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, apply Rent Filter, set price range, select weekly rent duration, and apply filter', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app's login page

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.get('.ui.menu > :nth-child(2)').click(); // Navigate to Browse Products

    // Check the Rent Filter checkbox
    cy.get(':nth-child(4) > .field > .ui > label').click();

    // Enter minimum value in the Min text box
    cy.get('.equal > :nth-child(1) > .sc-aXZVg').type('1');

    // Enter maximum value in the Max text box
    cy.get(':nth-child(2) > .sc-aXZVg').type('10000');

    // Click on the Rent Duration Dropdown List
    cy.get('.form > :nth-child(6) > .ui').click(); // Updated selector

    // Select "Weekly" from the dropdown list
    cy.get('span.text').contains('Weekly').click();

    // Click on the Filter Button
    cy.get('.sc-cWSHoV > .blue').click();

    // Assertion to verify the Rent: $ value is weekly
    cy.get('div')
      .contains(/^Rent: \$\d+ weekly$/) // Matches the pattern 'Rent: $<amount> weekly'
      .should('exist');
  });

});
