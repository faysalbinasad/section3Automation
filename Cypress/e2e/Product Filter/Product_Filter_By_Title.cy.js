describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, filter by title "Blender"', () => {
    cy.visit('/'); 

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Navigate to the Browse Products menu
    cy.get('.ui.menu > :nth-child(2)').click();

    // Enter "Blender" in the Title field
    cy.get('.sc-aXZVg').type('Blender');

    // Click the Filter button
    cy.get('.sc-cWSHoV > .blue').click();

    cy.wait(4000);

    // Assertion to verify the filtered product list contains only products with "Blender" in the title
    cy.get('.sc-fqkvVR.jQvrZo') // Replace with the actual selector for the product title elements
      .each(($el) => {
        cy.wrap($el).should('contain.text', 'Blender');
      });
  });

});
