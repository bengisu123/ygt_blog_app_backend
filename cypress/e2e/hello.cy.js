const BASE = 'http://127.0.0.1:3000';

describe('Hello Test', () => {
  it('should display a custom "Hello" message using utils', () => {
    cy.visit(`${BASE}/hello.html`);
    cy.get('h2').should('contain', 'Hello Utils Test');
    cy.get('td').should('contain', 'Bu bir Cypress Utils testidir!');
    cy.wait(1000);
  });
});

