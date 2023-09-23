/// <reference types="Cypress" />

// ========================================================

// require('../../src/util/path');
// const db = require('../../src/db/db');

// ========================================================

describe('UI :: hidden text', () => {

  // -----------------------------------------------------


  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.task('resetDB').then(cy.log);
  })

  // -----------------------------------------------------

  it('should NOT display text when button is NOT clicked', () => {
    cy.visit('http://localhost:9000/');

    // cy.task("connectDB").then(cy.log)
    // cy.task("connectDB","SELECT NOW()").then(cy.log);
    // cy.task("connectDB","SELECT NOW()").then((response) => {
    //   cy.log(response);
    // });

    cy.task('connectDB', 'SELECT * FROM users').then((rows) => {
      rows.forEach(row => cy.log(row.email));
    });

  });

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