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

describe('Cart / Checkout', () => {
  // -----------------------------------------------------

  // it('should pass', () => {
  //   assert(1 === 1);
  // });

  // -----------------------------------------------------

  // TEST: Clicking the oclose button closes the cart correctly as well as clicking outside cart closes it
  it('should have correct total with multiple items added & test local storage', () => {
  
    // Add items to cart and check quantity and total after each is added
    get('product-card-1-add-button').click();

    // test cart opens
    get('cart-drawer').should('be.visible');

     // click backdrop (at top left to make sure click outside on mobile)
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10);

    // cart should not be open
    get('cart-drawer').should('not.exist');

    // open cart with the cart button in navbar
    get('navbar-open-cart-button').click();

    // close cart with the (X) close button
    get('cart-drawer-close-button').click();

    // cart should not be open
    get('cart-drawer').should('not.exist');
  });

  // -----------------------------------------------------
});
