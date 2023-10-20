/// <reference types="Cypress" />

// ========================================================

describe('Intro', () => {

  // -----------------------------------------------------

  // beforeAll:
  before(() => {
    // cy.task('resetDB').then(cy.log);
  });

  beforeEach(() => {
    cy.visit('http://localhost:5173/', 
      {
        onBeforeLoad(win) {
          win.localStorage.setItem('key', 'value')
        },        
      }
    ); // frontend
  });

  // after(() => {
  //   cy.task('destroyDB').then(cy.log);
  // });

  // -----------------------------------------------------

  it('should pass', () => {
    assert(1 === 1);
  });

  // -----------------------------------------------------

  it('should navigate to login page and back', () => {
    cy.get('[data-cy="navlink-Login-desktop"]').click();
    cy.location('pathname').should('eq', '/auth/login');
    cy.go('back');
    cy.location('pathname').should('eq', '/');
  });

  // -----------------------------------------------------

  it('should navigate to login page and store page', () => {
    cy.get('[data-cy="navlink-Login-desktop"]').click();
    cy.location('pathname').should('eq', '/auth/login');
    cy.get('[data-cy="navlink-Store-desktop"]').click();
    cy.location('pathname').should('eq', '/');
  });

  // -----------------------------------------------------

  it('should log in', () => {
    cy.get('[data-cy="navlink-Login-desktop"]').click();
    cy.location('pathname').should('eq', '/auth/login');

    cy.get('[data-cy="auth-email-text-field"]').type('josh@josh.com');
    cy.get('[data-cy="auth-password-text-field"]').type('josh');
    cy.get('[data-cy="auth-login-button"]').click();

    // 1. test notification is displayed (not sure how to!)
    cy.get('[data-cy="notification"]').should('be.visible');
    cy.get('[data-cy="notification"]').contains('successfully logged user in');
    
    // 2. test avatar is displayed
    cy.get('[data-cy="navbar-avatar-button"]').should('be.visible');

    // 3. test redirected to orders page
    cy.location('pathname').should('eq', '/admin/orders');

    // 4. local storage should have token

    
    cy.getAllLocalStorage().then((result) => {

      

      // -local storage for our origin exists
      expect(result).to.have.property('http://localhost:5173');
      
      const LS = result['http://localhost:5173']

      // -local storage for our origin has a user property
      expect(LS).to.have.property('user');
      const getLS = (x) => JSON.parse(x)?.value;
      const user = getLS(LS.user);
      console.log('user: ', user);

      // -user property has desired structure
      const { id, email, password, first_name, last_name, logged_in, is_admin, token }  = user;

      // // -local storage for our origin has a is_admin property of type string
      expect(id).to.be.equal(1);
      expect(email).to.be.equal('josh@josh.com');
      expect(password).to.be.a('string');
      expect(logged_in).to.be.equal(true);
      expect(is_admin).to.be.equal(true);
      expect(token).to.be.a('string');
      expect(first_name).to.be.equal('josh');
      expect(last_name).to.be.equal('holloway');
    })
  });

  // -----------------------------------------------------

  // it('should log out', () => {
  //   cy.get('[data-cy="navlink-Login-desktop"]').click();
  //   cy.location('pathname').should('eq', '/auth/login');

  //   cy.get('[data-cy="auth-email-text-field"]').type('josh@josh.com');
  //   cy.get('[data-cy="auth-password-text-field"]').type('josh');
  //   cy.get('[data-cy="auth-login-button"]').click();

  //   cy.get('[data-cy="navbar-avatar-button"]').click();
  //   cy.get('[data-cy="navbar-logout-button"]').click();

  //   // 1. test notification is displayed
  //   cy.get('[data-cy="notification"]').should('be.visible');
  //   cy.get('[data-cy="notification"]').contains('successfully logged user out');

  //   // 2. test avatar is NOT displayed
  //   cy.get('[data-cy="navbar-avatar-button"]').should('not.exist');

  //   // 3. test redirected to home page
  //   cy.location('pathname').should('eq', '/');
  // });

  // TODO: Incorrect username / password should display error message
  // TODO: Incorrect username / password should display error message
  // TODO: Incorrect username / password should display error message
  // TODO: Incorrect username / password should display error message
  // TODO: Incorrect username / password should display error message
  
  // strategy: 
  // -test naviating to login page
  // -test actually logging in [DONE]
  // -THEN:
  //  -- test incorrect username / password
  //  -- test local storage!
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