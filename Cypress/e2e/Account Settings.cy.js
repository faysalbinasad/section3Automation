describe('Teebay-Buggy Account Settings Test', () => {

  it('Should login, navigate to Account Settings, update user details, and verify the confirmation message', () => {
    // Visit the Teebay-Buggy app's login page
    cy.visit('/'); // This will visit http://localhost:3000/teebay-buggy/

    // Enter email and password
    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Navigate to the Account Settings module
    cy.get('.ui.menu > :nth-child(4)').click();

    // Fill out the form fields
    cy.get(':nth-child(1) > :nth-child(1) > .sc-aXZVg').clear().type('Al Faysal Bin'); // First Name
    cy.get('.form > :nth-child(1) > :nth-child(2) > .sc-aXZVg').clear().type('Asad'); // Last Name
    cy.get('.form > :nth-child(2) > .sc-aXZVg').clear().type('Lakecity Concord, Dhaka'); // Address
    cy.get(':nth-child(3) > :nth-child(1) > .sc-aXZVg').clear().type('abcd@gmail.com'); // Email
    cy.get(':nth-child(3) > :nth-child(2) > .sc-aXZVg').clear().type('+880941212995'); // Phone Number

    // Click the Update button
    cy.get('.sc-iHGNWf > .ui').click();

    // Assertion to verify the confirmation toast message
    cy.get('.Toastify__toast-body > :nth-child(2)')
      .should('be.visible')
      .and('contain.text', 'User updated!');
  });

});
