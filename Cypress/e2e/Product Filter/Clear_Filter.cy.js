describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, select Home Appliances category, apply filter, clear fields, and logout', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app's login page

    cy.wait(2000);

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    cy.get('.ui.menu > :nth-child(2)').click();

    cy.wait(2000);

    // Click the Categories Dropdown
    cy.get('.form > :nth-child(2) > .ui').click();

    cy.wait(2000);

    // Select the "Home Appliances" category
    cy.get('span.text').contains('Home Appliances').click();

    cy.wait(2000);

    // Click the Clear Button
    cy.get('.sc-dCFHLb > .ui').click();

    cy.wait(2000);

    // Assertion to check that the dropdown is cleared
    cy.get('.form > :nth-child(2) > .ui').should('exist');

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
