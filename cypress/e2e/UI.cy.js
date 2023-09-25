/// <reference types="Cypress" />

// ========================================================

// require('../../src/util/path');
// const db = require('../../src/db/db');

// ========================================================

describe('UI', () => {

  // -----------------------------------------------------

  // beforeAll:
  before(() => {
    cy.task('resetDB').then(cy.log);
  });

  beforeEach(() => {
    // cy.visit('http://localhost:9000/'); // backend
    cy.visit('http://localhost:5173/'); // frontend
    // cy.task('resetDB').then(cy.log);
  });

  // after(() => {
  //   cy.task('destroyDB').then(cy.log);
  // });

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
      // ...click({ force: true }); // forces click even if something is in front of it
  });

  // -----------------------------------------------------

  // it('should change to users page', () => {
  //   cy.get('#navlink-users').click();
  // });

  // -----------------------------------------------------

  // it('should create a new user', () => {
  //   cy.get('#navlink-users').click();
  //   cy.get('#email-text-field').type('josh2@josh.com');
  //   cy.get('#password-text-field').type('josh');
  //   cy.get('#create-user-button').click();

  //   // // check that the user was created in the DB
  //   // cy.task('connectDB', 'SELECT * FROM users').then((rows) => {
  //   //   rows.forEach(row => cy.log(row.email));
  //   //   assert.equal(rows[rows.length - 1].email, 'josh2@josh.com');
  //   //   // assert.equal(rows[rows.length - 1].email, 'sergey@google.com');
  //   // });

  //   // TODO: Check that the corresponding row was created in the table.
  //   // TODO: Check that the corresponding row was created in the table.
  //   // TODO: Check that the corresponding row was created in the table.
  //   // TODO: Check that the corresponding row was created in the table.
  //   // TODO: Check that the corresponding row was created in the table.


  //   // NOTE: The testing DB is all wonky. Using the dev DB works fine though.

  // });

  // -----------------------------------------------------

  it('should send cart to checkout', () => {
    
    // Add items to cart
    cy.get('#product-card-1').find('button').contains('Add to Cart').click();
    cy.get('#close-cart-button').click();
    cy.get('#product-card-2').find('button').contains('Add to Cart').click();
    cy.get('#close-cart-button').click();
    cy.get('#product-card-2').find('button').contains('Add to Cart').click();

    // click checkout button
    cy.get('#checkout-cart-button').click();

    // TODO: Make sure we are actually on the orders page now
    cy.get('#page-title').contains('Order History');

    // TODO: Make sure items from the created order are displayed in the orders page summary
  });

  // -----------------------------------------------------
});

// ========================================================