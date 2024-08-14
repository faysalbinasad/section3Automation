describe('Teebay-Buggy Browse Products Test', () => {

  it('Should login, navigate to Browse Products, check and update product views for the second product', () => {
    cy.visit('/'); // Visit the Teebay-Buggy app's login page

    cy.wait(2000);

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    cy.get('.ui.menu > :nth-child(2)').click(); // Navigate to Browse Products

    cy.wait(2000);

    // Get the initial value of product views for the second product
    cy.get("div[class='sc-lcIPJg PtUki'] div:nth-child(2) div:nth-child(1) div:nth-child(2) div:nth-child(2)").invoke('text').then((initialViews) => {
      const initialViewsCount = parseInt(initialViews);
      cy.log(initialViewsCount);

      cy.wait(2000);

      // Click on the product title of the second product
      cy.get("div[class='sc-lcIPJg PtUki'] div:nth-child(2) div:nth-child(1) div:nth-child(2) div:nth-child(2)").click();

      cy.wait(2000);

      cy.go('back'); // Navigate back to the previous page

      
      cy.wait(2000);


      // Check if the product views have increased
      cy.get("div[class='sc-lcIPJg PtUki'] div:nth-child(2) div:nth-child(1) div:nth-child(2) div:nth-child(2)").invoke('text').then((updatedViews) => {
        cy.log(updatedViews);
        const updatedViewsCount = parseInt(updatedViews);
        expect(updatedViewsCount).to.be.greaterThan(initialViewsCount);
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

});
