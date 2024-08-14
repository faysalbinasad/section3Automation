describe('Teebay-Buggy Account Settings Accessibility Test', () => {

  it('Should login, navigate to Account Settings, update user details using keyboard navigation, and verify the confirmation message', () => {
    // Visit the Teebay-Buggy app's login page
    cy.visit('/'); // This will visit http://localhost:3000/teebay-buggy/

    // Enter email and password without keyboard navigation
    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Navigate to the Account Settings module
    cy.get('.ui.menu > :nth-child(4)').click();

    // Manually simulate tabbing through the form fields and filling out the form

    // First Name
    cy.get('body').tab(); // Focus on the first element
    cy.focused().tab(); // Move to the First Name field
    cy.focused().clear().type('Al Faysal Bin').tab(); // Enter the First Name and tab to the next field

    // Last Name
    cy.focused().clear().type('Asad').tab(); // Enter the Last Name and tab to the next field

    // Address
    cy.focused().clear().type('Lakecity Concord, Dhaka').tab(); // Enter the Address and tab to the next field

    // Email
    cy.focused().clear().type('abcd@gmail.com').tab(); // Enter the Email and tab to the next field

    // Phone Number
    cy.focused().clear().type('+880941212995'); // Enter the Phone Number

    // Move focus to the Update button and press Enter
    cy.get('body').tab(); // Tab to reach the Update button
    cy.focused().click(); // Click the Update button

    // Assertion to verify the confirmation toast message
    cy.get('.Toastify__toast-body > :nth-child(2)')
      .should('be.visible')
      .and('contain.text', 'User updated!');
  });

});
