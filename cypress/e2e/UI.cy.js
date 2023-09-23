/// <reference types="Cypress" />

// ========================================================

// require('../../src/util/path');
// const db = require('../../src/db/db');



// ========================================================

describe('UI :: hidden text', () => {

  // -----------------------------------------------------

  it('should NOT display text when button is NOT clicked', () => {
    cy.visit('http://localhost:9000/');
    // cy.get('#display-text-button').click(); // clicks center of element
    // cy.get('#display-text').should('have.class', 'hidden');
    // cy.get('#display-text').should('not.be.visible');

    // cy.task("connectDB").then(cy.log)
    cy.task("connectDB","SELECT NOW()").then(cy.log);
    cy.task("connectDB","SELECT NOW()").then((response) => {
      cy.log(response);
    });

    cy.task('connectDB', 'SELECT * FROM users').then((response) => {
      cy.log(response[0].email);
    });

    cy.task('connectDB', 'SELECT * FROM users').then((rows) => {
      cy.log(rows[0].email);
    });
  });

  // -----------------------------------------------------

  // it('should display text when button is clicked', () => {
  //   cy.visit('http://localhost:9000/');
  //   cy.get('#display-text-button').click(); // clicks center of element
  //   cy.get('#display-text').should('not.have.class', 'hidden');
  //   cy.get('#display-text').should('be.visible');
  // });

  // -----------------------------------------------------

  // it('should NOT display text when button is clicked twice', () => {
  //   cy.visit('http://localhost:9000/');
  //   cy.get('#display-text-button').click(); // clicks center of element
  //   cy.get('#display-text-button').click(); // clicks center of element
  //   cy.get('#display-text').should('have.class', 'hidden');
  //   cy.get('#display-text').should('not.be.visible');
  // });

  // -----------------------------------------------------
});

// ========================================================

describe('UI :: type into field', () => {

  // -----------------------------------------------------

  // it('should display the same text to the output that was typed into the input', () => {
  //   cy.visit('http://localhost:9000/');

  //   const text = 'hello world';

  //   cy.get('#input-field').type(text);
  //   cy.get('#output-field').should('contain.text', text);
  // });

  // -----------------------------------------------------

});

// ========================================================