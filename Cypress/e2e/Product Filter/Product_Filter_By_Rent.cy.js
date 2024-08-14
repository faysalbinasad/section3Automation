describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, apply Rent Filter, set price range, select weekly rent duration, and apply filter', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app's login page

    cy.wait(2000);

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    cy.get('.ui.menu > :nth-child(2)').click(); // Navigate to Browse Products

    cy.wait(2000);

    // Check the Rent Filter checkbox
    cy.get(':nth-child(4) > .field > .ui > label').click();

    cy.wait(2000);

    // Enter minimum value in the Min text box
    cy.get('.equal > :nth-child(1) > .sc-aXZVg').type('1');

    cy.wait(2000);

    // Enter maximum value in the Max text box
    cy.get(':nth-child(2) > .sc-aXZVg').type('10000');

    cy.wait(2000);

    // Click on the Rent Duration Dropdown List
    cy.get('.form > :nth-child(6) > .ui').click(); // Updated selector

    cy.wait(2000);

    // Select "Weekly" from the dropdown list
    cy.get('span.text').contains('Weekly').click();

    cy.wait(2000);

    // Click on the Filter Button
    cy.get('.sc-cWSHoV > .blue').click();

    cy.wait(2000);

    // Assertion to verify the Rent: $ value is weekly
    cy.get('div')
      .contains(/^Rent: \$\d+ weekly$/) // Matches the pattern 'Rent: $<amount> weekly'
      .should('exist');

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
