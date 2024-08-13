describe('Teebay-Buggy Login Test', () => {
  it('Should login successfully with valid credentials', () => {
    cy.visit('/'); // This will visit http://localhost:3000/teebay-buggy/

    cy.get('input[name="email"]').type('testuser@teebay.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
  });
});
