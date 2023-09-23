/// <reference types="Cypress" />

// ========================================================

// require('../../src/util/path');
// const db = require('../../src/db/db');

// ========================================================

describe('UI :: hidden text', () => {

  // -----------------------------------------------------


  beforeEach(() => {
    // cy.visit('http://localhost:9000/'); // backend
    cy.visit('http://localhost:5173/'); // frontend
    cy.task('resetDB').then(cy.log);
  })

  // -----------------------------------------------------

  // it('access DB withing tests', () => {
  //   // cy.task("connectDB").then(cy.log)
  //   // cy.task("connectDB","SELECT NOW()").then(cy.log);
  //   // cy.task("connectDB","SELECT NOW()").then((response) => {
  //   //   cy.log(response);
  //   // });
  //   cy.task('connectDB', 'SELECT * FROM users').then((rows) => {
  //     rows.forEach(row => cy.log(row.email));
  //   });
  // });

  // -----------------------------------------------------

  it('should add item to cart', () => {
    
  });

  // -----------------------------------------------------
});

// ========================================================