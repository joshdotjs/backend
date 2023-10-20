/// <reference types="Cypress" />

// ========================================================
// ========================================================

// ls: { value, expiry }
const getLS = (x) => JSON.parse(x)?.value;
const dataCY = (x) => `[data-cy="${x}"`;
const get = (x) => cy.get( dataCY(x) );

// ========================================================
// ========================================================

// beforeAll:
before(() => {
  // cy.task('resetDB').then(cy.log);
});

beforeEach(() => {
  cy.visit('http://localhost:5173', // NOTE: Slash at end breaks this!
    {
      onBeforeLoad(win) {
        win.localStorage.setItem('test-key', 'test-value'); // if LS is empty, then this fails: expect(result).to.have.property('http://localhost:5173');
      },
    }
  ); // frontend
});

// after(() => {
//   cy.task('destroyDB').then(cy.log);
// });

// ========================================================
// ========================================================
// ========================================================
// ========================================================

describe('Auth', () => {
  // -----------------------------------------------------

  it('should pass', () => {
    assert(1 === 1);
  });

  // -----------------------------------------------------

  it('should navigate to login page and back', () => {
    get('navlink-Login-desktop').click();
    cy.location('pathname').should('eq', '/auth/login');
    cy.go('back');
    cy.location('pathname').should('eq', '/');
  });

  // -----------------------------------------------------

  it('should navigate to login page and store page', () => {
    get('navlink-Login-desktop').click();
    cy.location('pathname').should('eq', '/auth/login');
    get('navlink-Store-desktop').click();
    cy.location('pathname').should('eq', '/');
  });

  // -----------------------------------------------------

  it('should log in', () => {
    // cy.get('[data-cy="navlink-Login-desktop"]').click();
    get('navlink-Login-desktop').click();
    cy.location('pathname').should('eq', '/auth/login');

    get('auth-email-text-field').type('josh@josh.com');
    get('auth-password-text-field').type('josh');
    get('auth-login-button').click();

    // 1. test notification is displayed
    get('notification').should('be.visible');
    get('notification').contains('successfully logged user in');
    
    // 2. test avatar is displayed
    get('navbar-avatar-button').should('be.visible');

    // 3. test redirected to orders page
    cy.location('pathname').should('eq', '/admin/orders');

    // 4. local storage should have user 
    cy.getAllLocalStorage().then((result) => {
      // -local storage for our origin exists
      expect(result).to.have.property('http://localhost:5173');
      
      const LS = result['http://localhost:5173'];

      // -local storage for our origin has a user property
      expect(LS).to.have.property('user');
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
    }); // cy.getAllLocalStorage().then((result) => { ... });
  });

  // -----------------------------------------------------

  it('should log out', () => {
    get('navlink-Login-desktop').click();
    cy.location('pathname').should('eq', '/auth/login');

    get('auth-email-text-field').type('josh@josh.com');
    get('auth-password-text-field').type('josh');
    get('auth-login-button').click();

    get('navbar-avatar-button').click();
    get('navbar-logout-button').click();

    // 1. test notification is displayed
    get('notification').should('be.visible');
    get('notification').contains('successfully logged user out');

    // 2. test avatar is NOT displayed
    get('navbar-avatar-button').should('not.exist');

    // 3. test redirected to home page
    cy.location('pathname').should('eq', '/');

    // 4. local storage should NOT have user
    cy.getAllLocalStorage().then((result) => {
      // -local storage for our origin exists
      expect(result).to.have.property('http://localhost:5173');
      const LS = result['http://localhost:5173'];

      // -local storage for our origin should NOT have a user property
      expect(LS).to.not.have.property('user');
    }); // cy.getAllLocalStorage().then((result) => { ... });
  });

  // -----------------------------------------------------

  it('should log NOT log in with wrong email', () => {
    get('navlink-Login-desktop').click();
    cy.location('pathname').should('eq', '/auth/login');

    get('auth-email-text-field').type('josh2@josh.com');
    get('auth-password-text-field').type('josh');
    get('auth-login-button').click();

    // 1. test notification is displayed (not sure how to!)
    get('notification').should('be.visible');
    get('notification').contains('error logging user in');
    
    // 2. test avatar is displayed
    get('navbar-avatar-button').should('not.exist');

    // 3. test should still be on /auth/login page
    cy.location('pathname').should('eq', '/auth/login');

    // 4. local storage should NOT have user
    cy.getAllLocalStorage().then((result) => {
      // -local storage for our origin exists
      expect(result).to.have.property('http://localhost:5173');
      const LS = result['http://localhost:5173'];

      // -local storage for our origin should NOT have a user property
      expect(LS).to.not.have.property('user');
    }); // cy.getAllLocalStorage().then((result) => { ... });
  });

  // -----------------------------------------------------

  it('should log NOT log in with wrong password', () => {
    get('navlink-Login-desktop').click();
    cy.location('pathname').should('eq', '/auth/login');

    get('auth-email-text-field').type('josh@josh.com');
    get('auth-password-text-field').type('josh2');
    get('auth-login-button').click();

    // 1. test notification is displayed (not sure how to!)
    get('notification').should('be.visible');
    get('notification').contains('error logging user in');
    
    // 2. test avatar is displayed
    cy.get('[data-cy="navbar-avatar-button"]').should('not.exist');

    // 3. test should still be on /auth/login page
    cy.location('pathname').should('eq', '/auth/login');

    // 4. local storage should NOT have user
    cy.getAllLocalStorage().then((result) => {
      // -local storage for our origin exists
      expect(result).to.have.property('http://localhost:5173');
      const LS = result['http://localhost:5173'];

      // -local storage for our origin should NOT have a user property
      expect(LS).to.not.have.property('user');
    }); // cy.getAllLocalStorage().then((result) => { ... });
  });

  // strategy: 
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
// ========================================================
// ========================================================
// ========================================================

describe('Checkout', () => {
  // -----------------------------------------------------

  it('should pass', () => {
    assert(1 === 1);
  });

  // -----------------------------------------------------
});

// ========================================================
// ========================================================
// ========================================================
// ========================================================

describe('Admin Orders', () => {
  // -----------------------------------------------------

  it('should pass', () => {
    assert(1 === 1);
  });

  // -----------------------------------------------------
});

// ========================================================
// ========================================================
// ========================================================
// ========================================================

describe('Cart', () => {
  // -----------------------------------------------------

  it('should pass', () => {
    assert(1 === 1);
  });

  // -----------------------------------------------------
  
  // it('should add items to cart', () => {
  
  //   // Add items to cart
  //   cy.get('[data-cy=product-card-1').find('button').contains('Add to Cart').click();
  //   cy.get('[data-cy=close-cart-button').click();
  //   cy.get('[data-cy=product-card-2').find('button').contains('Add to Cart').click();
  //   cy.get('[data-cy=close-cart-button').click();
  //   cy.get('[data-cy=product-card-2').find('button').contains('Add to Cart').click();

  // });

  // -----------------------------------------------------
});