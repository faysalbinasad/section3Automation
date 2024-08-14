describe('Teebay-Buggy Account Settings Accessibility Test', () => {

  it('Should login, navigate to Account Settings, update user details using keyboard navigation, and verify the confirmation message', () => {
    // Visit the Teebay-Buggy app's login page
    cy.visit('/'); // This will visit http://localhost:3000/teebay-buggy/

    cy.wait(2000);

    // Enter email and password
    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');

    cy.wait(2000);

    // Click the login button
    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    // Navigate to the Account Settings module
    cy.get('.ui.menu > :nth-child(4)').click();

    cy.wait(2000);

    // Directly focus on the First Name field and fill it out
    cy.get(':nth-child(1) > :nth-child(1) > .sc-aXZVg').focus().clear().type('Al Faysal Bin');

    cy.wait(2000);

    // Focus on the Last Name field and fill it out
    cy.get('.form > :nth-child(1) > :nth-child(2) > .sc-aXZVg').focus().clear().type('Asad');

    cy.wait(2000);

    // Focus on the Address field and fill it out
    cy.get('.form > :nth-child(2) > .sc-aXZVg').focus().clear().type('Lakecity Concord, Dhaka');

    cy.wait(2000);

    // Focus on the Email field and fill it out
    cy.get(':nth-child(3) > :nth-child(1) > .sc-aXZVg').focus().clear().type('abcd@gmail.com');

    cy.wait(2000);

    // Focus on the Phone Number field and fill it out
    cy.get(':nth-child(3) > :nth-child(2) > .sc-aXZVg').focus().clear().type('+880941212995');

    cy.wait(2000);

    // Focus on the Update button and click it
    cy.get('.sc-iHGNWf > .ui').focus().click();

    cy.wait(2000);

    // Assertion to verify the confirmation toast message
    cy.get('.Toastify__toast-body > :nth-child(2)')
      .should('be.visible')
      .and('contain.text', 'User updated!');

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
