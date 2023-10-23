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

  // TEST: Changing quantity of items in cart and removing items from cart works correctly
  it('should have correct total with multiple items added & test local storage', () => {
  
    // add item to cart
    get('product-card-3-add-button').click(); // click add to cart button
    get('cart-item-3-quantity').contains('1'); // test quantity
    get('cart-total').contains('$3.00'); // test cart total is correct
    get('cart-item-3-quantity-trash').should('exist'); // trash icon SHOULD display
    get('cart-item-3-quantity-minus').should('not.exist'); // minus icon should NOT display
    
    // increase quantity
    get('cart-item-3-quantity-plus').click(); // click plus button
    get('cart-total').contains('$6.00'); // test cart total is correct
    get('cart-item-3-quantity').contains('2'); // test quantity
    get('cart-item-3-quantity-trash').should('not.exist'); // trash icon NOT should display
    get('cart-item-3-quantity-minus').should('exist'); // minus icon SHOULD  display

    // increase quantity
    get('cart-item-3-quantity-plus').click(); // click plus button
    get('cart-total').contains('$9.00'); // test cart total is correct
    get('cart-item-3-quantity').contains('3'); // test quantity
    get('cart-item-3-quantity-trash').should('not.exist'); // trash icon NOT should display
    get('cart-item-3-quantity-minus').should('exist'); // minus icon SHOULD  display

    // decrease quantity
    get('cart-item-3-quantity-minus').click(); // click plus button
    get('cart-total').contains('$6.00'); // test cart total is correct
    get('cart-item-3-quantity').contains('2'); // test quantity
    get('cart-item-3-quantity-trash').should('not.exist'); // trash icon NOT should display
    get('cart-item-3-quantity-minus').should('exist'); // minus icon SHOULD  display

    // decrease quantity
    get('cart-item-3-quantity-minus').click(); // click plus button
    get('cart-total').contains('$3.00'); // test cart total is correct
    get('cart-item-3-quantity').contains('1'); // test quantity
    get('cart-item-3-quantity-trash').should('exist'); // trash icon SHOULD display
    get('cart-item-3-quantity-minus').should('not.exist'); // minus icon should NOT display

    // remove item from cart
    get('cart-item-3-quantity-trash').click(); // click trash can button
    get('cart-total').contains('$0.00'); // test cart total is correct
    get('cart-item-3').should('not.exist'); // test item is removed from cart
    
    // close cart with the (X) close button - NOTE Cart is closed implicitly when all items are removed
    // get('cart-drawer-close-button').click();
  });

  // -----------------------------------------------------

});
