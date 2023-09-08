/// <reference types="Cypress" />

// ========================================================

describe('Intro', () => {

  // -----------------------------------------------------

  it('should render the list of users', () => {
    // cy.visit('https://example.cypress.io');
    cy.visit('http://localhost:9000/view');
    cy.get('.list-group-item').should('have.length', 2);
  });

  // -----------------------------------------------------

  it('should display the page title', () => {
    cy.visit('http://localhost:9000/view');

    cy.get('#title').contains('/views/index.ejs');
    cy.get('#title').should('have.length', 1);
  });

  // -----------------------------------------------------

  it('should display the page title', () => {
    cy.visit('http://localhost:9000/view');

    cy.get('#sub-title > p');
    //cy.get('#sub-title').get('p'); // does NOT look for p only inside #sub-title
    cy.get('#sub-title').find('p');
    cy.get('#sub-title').find('p').contains('sub-title');

    // .contains looks inside element returned by .get
    // .get().get() does not look inside the first get. It searches from top of page.
    // .get().find() does look inside the first get.
    // .find() can only be used after .get()
  });

  // -----------------------------------------------------
});

// ========================================================