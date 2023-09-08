/// <reference types="Cypress" />

// ========================================================

describe('UI :: hidden text', () => {

  // -----------------------------------------------------

  it('should NOT display text when button is NOT clicked', () => {
    cy.visit('http://localhost:9000/view');
    // cy.get('#display-text-button').click(); // clicks center of element
    cy.get('#display-text').should('have.class', 'hidden');
    cy.get('#display-text').should('not.be.visible');
  });

  // -----------------------------------------------------

  it('should display text when button is clicked', () => {
    cy.visit('http://localhost:9000/view');
    cy.get('#display-text-button').click(); // clicks center of element
    cy.get('#display-text').should('not.have.class', 'hidden');
    cy.get('#display-text').should('be.visible');
  });

  // -----------------------------------------------------

  it('should NOT display text when button is clicked twice', () => {
    cy.visit('http://localhost:9000/view');
    cy.get('#display-text-button').click(); // clicks center of element
    cy.get('#display-text-button').click(); // clicks center of element
    cy.get('#display-text').should('have.class', 'hidden');
    cy.get('#display-text').should('not.be.visible');
  });

  // -----------------------------------------------------
});

// ========================================================

describe('UI :: type into field', () => {

  // -----------------------------------------------------

  it('should display the same text to the output that was typed into the input', () => {
    cy.visit('http://localhost:9000/view');

    const text = 'hello world';

    cy.get('#input-field').type(text);
    cy.get('#output-field').should('contain.text', text);
  });

  // -----------------------------------------------------

});

// ========================================================