/// <reference types="Cypress" />

// ========================================================

describe('Intro', () => {

  // -----------------------------------------------------

  // beforeAll:
  before(() => {
    // cy.task('resetDB').then(cy.log);
  });

  beforeEach(() => {
    cy.visit('http://localhost:5173/'); // frontend
  });

  // after(() => {
  //   cy.task('destroyDB').then(cy.log);
  // });

  // -----------------------------------------------------

  it('should pass', () => {
    assert(1 === 1);
  });

  // -----------------------------------------------------

  it('should navigate to login page', () => {
    cy.get('[data-cy="navlink-Login-desktop"]').click();
    
  });

  // strategy: 
  // -test naviating to login page
  // -test actually logging in
  //   --should I clear LS before doing this?
  // -MOCK:
  //  -- checkout flow should bypass Stripe


  // -----------------------------------------------------

  // it('should display the page title', () => {
  //   cy.visit('http://localhost:9000/');

  //   cy.get('#title').contains('/views/index.ejs');
  //   cy.get('#title').should('have.length', 1);
  // });

  // -----------------------------------------------------

  // it('should display the page title', () => {
  //   cy.visit('http://localhost:9000/');

  //   cy.get('#sub-title > p');
  //   //cy.get('#sub-title').get('p'); // does NOT look for p only inside #sub-title
  //   cy.get('#sub-title').find('p');
  //   cy.get('#sub-title').find('p').contains('sub-title');

  //   // .contains looks inside element returned by .get
  //   // .get().get() does not look inside the first get. It searches from top of page.
  //   // .get().find() does look inside the first get.
  //   // .find() can only be used after .get()
  // });

  // -----------------------------------------------------
});

// ========================================================