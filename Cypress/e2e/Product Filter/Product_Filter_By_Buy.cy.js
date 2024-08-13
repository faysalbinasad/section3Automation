describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, apply Buy Filter, set price range, and apply filter', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app's login page

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.get('.ui.menu > :nth-child(2)').click(); // Navigate to Browse Products

    // Check the Buy Filter checkbox
    cy.get(':nth-child(3) > .field > .ui > label').click();

    // Enter minimum value in the Min text box
    cy.get('.equal > :nth-child(1) > .sc-aXZVg').type('1');

    // Enter maximum value in the Max text box
    cy.get(':nth-child(2) > .sc-aXZVg').type('1000');

    // Click on the Filter Button
    cy.get('.sc-cWSHoV > .blue').click();

    // Assertion to verify the filtered product list contains only products with prices between 1 and 1000
    cy.get('.sc-gsFSXq.biQayP') // Replace with the actual selector for the price elements
      .each(($el) => {
        const price = parseFloat($el.text().replace('Price: $', '').trim());
        expect(price).to.be.within(1, 1000);
      });
  });

});
