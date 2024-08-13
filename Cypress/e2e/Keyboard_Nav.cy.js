describe('Teebay-Buggy Account Settings Accessibility Test', () => {
  before(() => {
    // Login before running the test
    cy.visit('/'); // Visit the Teebay-Buggy home page
    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    
    // Wait for the page to load and be ready
    cy.url().should('include', '/my-products'); // Adjusted to match actual redirection
  });

  it('Should navigate and update the Account Settings form using keyboard navigation', () => {
    // Open the Account Settings tab
    cy.get('.ui.menu > :nth-child(4)').click(); // Click on the Account Settings option/tab

    // Ensure the form is visible
    cy.get('.sc-iHbSHJ').should('be.visible');

    // Focus and fill out the form fields using keyboard navigation

    // First Name
    cy.get(':nth-child(1) > :nth-child(1) > .sc-aXZVg').focus().type('John');
    cy.tab(); // Tab to the next field
    
    // Last Name
    cy.focused().type('Doe');
    cy.tab(); // Tab to the next field
    
    // Address
    cy.focused().type('123 Main St');
    cy.tab(); // Tab to the next field
    
    // Email
    cy.focused().type('john.doe@example.com');
    cy.tab(); // Tab to the next field
    
    // Phone Number
    cy.focused().type('555-1234');
    cy.tab(); // Tab to the Update button
    
    // Click the Update button using Enter
    cy.focused().type('{enter}'); // Ensure the focus is on the Update button and press Enter

    // Verify that the form update was successful (this step will depend on your application logic)
    cy.get('.success-message').should('contain.text', 'Account settings updated successfully!');
  });
});
