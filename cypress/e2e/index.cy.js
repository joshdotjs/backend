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

    // test order 1
    get('admin-order-1').click(); // open the order details accordion
    get('admin-order-1--status-button--preparing').click(); // change order status
    get('admin-order-1-status-chip').contains('Preparing'); // test that the order row contains the desired data
    get('admin-order-1--status-button--ready').click(); // change order status
    get('admin-order-1-status-chip').contains('Ready'); // test that the order row contains the desired data
    get('admin-order-1--status-button--done').click(); // change order status
    get('admin-order-1-status-chip').contains('Done'); // test that the order row contains the desired data
    get('admin-order-1').click(); // close the order details accordion

    // test order 2
    get('admin-order-2').click(); // open the order details accordion
    get('admin-order-2--status-button--preparing').click(); // change order status
    get('admin-order-2-status-chip').contains('Preparing'); // test that the order row contains the desired data
    get('admin-order-2--status-button--ready').click(); // change order status
    get('admin-order-2-status-chip').contains('Ready'); // test that the order row contains the desired data
    get('admin-order-2--status-button--done').click(); // change order status
    get('admin-order-2-status-chip').contains('Done'); // test that the order row contains the desired data
    // leave details accordion open

    // test order 3
    get('admin-order-3').click(); // open the order details accordion
    get('admin-order-3--status-button--preparing').click(); // change order status
    get('admin-order-3-status-chip').contains('Preparing'); // test that the order row contains the desired data
    get('admin-order-3--status-button--ready').click(); // change order status
    get('admin-order-3-status-chip').contains('Ready'); // test that the order row contains the desired data
    get('admin-order-3--status-button--done').click(); // change order status
    get('admin-order-3-status-chip').contains('Done'); // test that the order row contains the desired data

    // log user out
    get('navbar-avatar-button').click();
    get('navbar-logout-button').click();
  });

  // -----------------------------------------------------

  // TEST: filtering

  // -----------------------------------------------------

  // TEST: placing a new order works correctly

  // -----------------------------------------------------

  // -----------------------------------------------------
});
