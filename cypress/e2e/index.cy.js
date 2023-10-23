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
  cy.clearAllLocalStorage();
  cy.task('resetDB').then(cy.log);
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

describe('Admin Orders', () => {
  // -----------------------------------------------------

  // TEST: all seeded orders display in the admin dashboard with all desired parts
  it('admin should be able to view protected pages [orders / users]', () => {
    
    // log user in
    get('navlink-Login-desktop').click();
    get('auth-email-text-field').type('josh@josh.com');
    get('auth-password-text-field').type('josh');
    get('auth-login-button').click();
    
    // ...
    get('admin-order-1').should('exist'); // make sure order rows exist in table
    get('admin-order-1-status-chip').contains('Pending'); // test that the order row contains the desired data


    // open the order details drawer
    get('admin-order-1').click();


    // test change status to preparing
    get('admin-order-1--status-button--preparing').click(); // change order status
    // get('admin-order-1-status-chip').contains('Peparing'); // test that the order row contains the desired data


    


    // log user out
    // get('navbar-avatar-button').click();
    // get('navbar-logout-button').click();
  });

  // -----------------------------------------------------

  // TEST: click different states changes states correctly

  // -----------------------------------------------------

  // TEST: filtering

  // -----------------------------------------------------

  // TEST: placing a new order works correctly

  // -----------------------------------------------------

  // -----------------------------------------------------
});
