describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, filter by title "Blender"', () => {
    cy.visit('/'); 

    cy.wait(2000);

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    // Navigate to the Browse Products menu
    cy.get('.ui.menu > :nth-child(2)').click();

    cy.wait(2000);

    // Enter "Blender" in the Title field
    cy.get('.sc-aXZVg').type('Blender');

    cy.wait(2000);

    // Click the Filter button
    cy.get('.sc-cWSHoV > .blue').click();

    cy.wait(4000);

    // Assertion to verify the filtered product list contains only products with "Blender" in the title
    cy.get('.sc-fqkvVR.jQvrZo') // Replace with the actual selector for the product title elements
      .each(($el) => {
        cy.wrap($el).should('contain.text', 'Blender');
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
