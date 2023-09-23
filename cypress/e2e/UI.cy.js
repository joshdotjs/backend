/// <reference types="Cypress" />

// ========================================================

// require('../../src/util/path');
// const db = require('../../src/db/db');

// ========================================================

describe('UI', () => {

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

  it('find element inside get', () => {
    cy.get('header');//.find('img');
    cy.get('header').find('img'); // Favicon SVG
    // cy.get('header img'); // => also works!
    // -Chaining get after get does not look inside the first get.
    // -It instead searches from the top of the page.
    // -Use find() to look inside the first get.
  });

  // -----------------------------------------------------

  it('find element inside get', () => {
    cy.get('header');//.find('img');
    cy.get('header').find('img'); // Favicon SVG
    // cy.get('header img'); // => also works!
  });

  // -----------------------------------------------------

  it('should find the add to cart button', () => {
    cy.get('#product-card-1').find('button').contains('Add to Cart');
  });

  // -----------------------------------------------------

  it('should add item to cart', () => {
    cy.get('#product-card-1').find('button').contains('Add to Cart').click();
  });

  // -----------------------------------------------------

  it('should empty cart and close it', () => {
      // open cart and empty it
      cy.get('#open-cart-button').click();
      cy.get('#cart-drawer').find('#empty-cart-button').click();
      cy.get('#close-cart-button').click();
  });

  // -----------------------------------------------------
});

// ========================================================