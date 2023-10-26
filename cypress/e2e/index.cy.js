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

  // TEST: filtering (change time)
  it('test filtering [status]', () => {

    // log user in
    get('navlink-Login-desktop').click();
    get('auth-email-text-field').type('josh@josh.com');
    get('auth-password-text-field').type('josh');
    get('auth-login-button').click();

    
    // unsellect all status options
    get('admin-orders-status-dropdown').click(); // open status dropdown
    get('status-dropdown-option-Pending').click();
    get('status-dropdown-option-Preparing').click();
    get('status-dropdown-option-Ready').click();
    get('status-dropdown-option-Done').click();
    cy.get('body').click(); // close status dropdown
    // cy.wait(500);
    get('admin-order-1').should('not.exist');
    get('admin-order-2').should('not.exist');
    get('admin-order-3').should('not.exist');

    // select only status: Pending
    get('admin-orders-status-dropdown').click(); // open status dropdown
    get('status-dropdown-option-Pending').click();
    get('admin-order-1').should('exist');
    get('admin-order-2').should('exist');
    get('admin-order-3').should('exist');
    cy.get('body').click(); // close status dropdown

    // select all statuses
    get('admin-orders-status-dropdown').click(); // open status dropdown
    get('status-dropdown-option-Preparing').click();
    get('status-dropdown-option-Ready').click();
    get('status-dropdown-option-Done').click();
    get('admin-order-1').should('exist');
    get('admin-order-2').should('exist');
    get('admin-order-3').should('exist');
    cy.get('body').click(); // close status dropdown

    // change status of each order
    get('admin-order-1').click(); // open the order details accordion
    get('admin-order-1--status-button--preparing').click(); // change order status
    get('admin-order-2').click(); // open the order details accordion
    get('admin-order-2--status-button--ready').click(); // change order status
    get('admin-order-3').click(); // open the order details accordion
    get('admin-order-3--status-button--done').click(); // change order status

    // select only the preparing status
    get('admin-orders-status-dropdown').click(); // open status dropdown
    get('status-dropdown-option-Pending').click();
    get('status-dropdown-option-Ready').click();
    get('status-dropdown-option-Done').click();
    get('admin-order-1').should('exist');
    get('admin-order-2').should('not.exist');
    get('admin-order-3').should('not.exist');
    cy.get('body').click(); // close status dropdown
    
  }); // it()  

  // -----------------------------------------------------
});
