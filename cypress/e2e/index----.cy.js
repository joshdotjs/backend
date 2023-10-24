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

  // TEST: admin logged in user can see the admin dashboard
  it('admin should be able to view protected pages [orders / users]', () => {
  // cy.get('[data-cy="navlink-Login-desktop"]').click();
  get('navlink-Login-desktop').click();
  cy.location('pathname').should('eq', '/auth/login');

  get('auth-email-text-field').type('josh@josh.com');
  get('auth-password-text-field').type('josh');
  get('auth-login-button').click();

  // Test that admin can view admin dashboard [/admin/orders]
  cy.location('pathname').should('eq', '/admin/orders'); // redirected here after login
  get('navlink-Store-desktop').click();
  get('navlink-Orders-desktop').click();
  cy.location('pathname').should('eq', '/admin/orders');
  
  // Test that admin can view admin dashboard [/admin/users]
  get('navlink-Store-desktop').click();
  get('navlink-Users-desktop').click();
  cy.location('pathname').should('eq', '/admin/users');

  // Test that the user can log out [this is tested in the Auth section]
  get('navbar-avatar-button').click();
  get('navbar-logout-button').click();
});

  // -----------------------------------------------------

  // TEST: non-admin logged in user can NOT see the admin dashboard
  it('NON admin should NON be able to view protected pages [orders / users]', () => {
    // cy.get('[data-cy="navlink-Login-desktop"]').click();
    get('navlink-Login-desktop').click();
    cy.location('pathname').should('eq', '/auth/login');

    get('auth-email-text-field').type('steve@apple.com');
    get('auth-password-text-field').type('steve');
    get('auth-login-button').click();

    // Test user cannot view the protected pages
    // cy.location('pathname').should('eq', '/'); // redirected here after login
    // get('navlink-Users-desktop').should('not.exist');  // protected page navlink should not show
    // get('navlink-Orders-desktop').should('not.exist'); // protected page navlink should not show

    // Trying to navigate to the protected pages should redirect to home page
    // cy.visit('http://localhost:5173/auth/login', (win) => {
    //   // win.location.href = '/admin/orders';
    //   // win.location.href = 'http://localhost:5173/login';
    // });
    // cy.url().then(urlValue => {
    //   console.log('urlValue: ', urlValue);
    //   // cy.visit(urlValue + '/auth/login');

    // });
    cy.window().then((win) => {
      // win is the remote window
      win.location.href = 'http://localhost:5173/josh/login';
      cy.location('pathname').should('eq', '/josh/login'); // redirected here after login
    });

    // get('navlink-Orders-desktop').click();
    // cy.location('pathname').should('eq', '/admin/orders');

    // get('navlink-Store-desktop').click();
    // get('navlink-Users-desktop').click();
    // cy.location('pathname').should('eq', '/admin/users');

  });

  // -----------------------------------------------------

  // TEST: all seeded orders display in the admin dashboard with all desired parts
  it('admin should be able to view protected pages [orders / users]', () => {
  
  // log user in
  get('navlink-Login-desktop').click();
  get('auth-email-text-field').type('josh@josh.com');
  get('auth-password-text-field').type('josh');
  get('auth-login-button').click();
  
  // make sure order rows exist in table
  get('admin-order-1').should('exist');
  get('admin-order-2').should('exist');
  get('admin-order-3').should('exist');
  get('admin-order-4').should('not.exist');

  // test that the order row contains the desired data
  get('admin-order-1-status-chip').contains('Pending');
  get('admin-order-2-status-chip').contains('Pending');
  get('admin-order-3-status-chip').contains('Pending');

  // test that the UUID displays
  get('admin-order-1-uuid').contains(/\.{3}[0-9a-fA-F]{4}/); // ...abcd (4 hex chars)
  get('admin-order-2-uuid').contains(/\.{3}[0-9a-fA-F]{4}/); // ...abcd (4 hex chars)
  get('admin-order-3-uuid').contains(/\.{3}[0-9a-fA-F]{4}/); // ...abcd (4 hex chars)

  // test that the time displays
  get('admin-order-1-time').contains(/[1-9]\d?:[0-5]\d:[0-5]\d [aApP][mM]/); // 5:30:45 pm
  get('admin-order-2-time').contains(/[1-9]\d?:[0-5]\d:[0-5]\d [aApP][mM]/); // 5:30:45 pm
  get('admin-order-3-time').contains(/[1-9]\d?:[0-5]\d:[0-5]\d [aApP][mM]/); // 5:30:45 pm
  
  // test that the count-up timer displays
  get('admin-order-1-timer').contains(/\d+:[0-5]\d/); // 0:16  for the timer
  get('admin-order-2-timer').contains(/\d+:[0-5]\d/); // 0:16  for the timer
  get('admin-order-3-timer').contains(/\d+:[0-5]\d/); // 0:16  for the timer

  // NOTE: We don't click the carrat to open the order details here, and the below elements are still found
  // -This is passing still because we are not clicking anything inside the closed accordion.
  // -If you tried to click the status buttons they only pass if you first open the drawer.

  // test the expected line items exist in each order
  get('admin-order-1--line-item-1').should('exist');
  get('admin-order-1--line-item-2').should('exist');
  get('admin-order-2--line-item-1').should('exist');
  get('admin-order-2--line-item-2').should('exist');
  get('admin-order-3--line-item-1').should('exist');
  get('admin-order-3--line-item-2').should('exist');

  // test that the line items contain the expected order data [order 1 - test general structure]
  get('admin-order-1--line-item-1-product-name').contains(/.*/); // any string
  get('admin-order-1--line-item-2-product-name').contains(/.*/); // any string
  get('admin-order-1--line-item-1-product-price').contains(/\$\d+\.\d{2}/); // $1.00
  get('admin-order-1--line-item-2-product-price').contains(/\$\d+\.\d{2}/); // $2.00
  get('admin-order-1--line-item-1-quantity').contains(/\d+(\.\d+)?/); // non-negative number
  get('admin-order-1--line-item-2-quantity').contains(/\d+(\.\d+)?/); // non-negative number
  get('admin-order-1--line-item-1-cost').contains(/\$\d+\.\d{2}/); // $1.00
  get('admin-order-1--line-item-2-cost').contains(/\$\d+\.\d{2}/); // $2.00

  // test that the line items contain the expected order data [order 2 - test specific data]
  get('admin-order-2--line-item-1-product-name').contains('Hamburger');
  get('admin-order-2--line-item-2-product-name').contains('Pizza');
  get('admin-order-2--line-item-1-product-price').contains('$1.00');
  get('admin-order-2--line-item-2-product-price').contains('$2.00');
  get('admin-order-2--line-item-1-quantity').contains('2');
  get('admin-order-2--line-item-2-quantity').contains('2');
  get('admin-order-2--line-item-1-cost').contains('$2.00');
  get('admin-order-2--line-item-2-cost').contains('$4.00');


  // test that the order total is correct
  get('admin-order-1-total').contains('$3.00');
  get('admin-order-2-total').contains('$6.00');
  get('admin-order-3-total').contains('$9.00');

  // log user out
  get('navbar-avatar-button').click();
  get('navbar-logout-button').click();
  });

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
  
  it('should add items to cart', () => {
  
    // Add items to cart
    get('product-card-1-add-button').click();
    // cy.get('[data-cy=close-cart-button').click();
    // cy.get('[data-cy=product-card-2').find('button').contains('Add to Cart').click();
    // cy.get('[data-cy=close-cart-button').click();
    // cy.get('[data-cy=product-card-2').find('button').contains('Add to Cart').click();

    // 1. test cart opens
    get('cart-drawer').should('be.visible');

    // 2. test item is added to cart with correct quantity
    get('cart-item-1').should('exist');
    get('cart-item-1').should('be.visible');

    // 3. test cart total is correct
    get('cart-total').contains('$1.00');
  });

  // -----------------------------------------------------

  // TEST: Clicking the close button closes the cart correctly as well as clicking outside cart closes it
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

  it('should have correct total with multiple items added & test Local Storage', () => {
  
    // Add items to cart and check quantity and total after each is added
    get('product-card-1-add-button').click();
    get('cart-item-1-quantity').contains('1');
    get('cart-item-1-title').contains('Hamburger');
    get('cart-item-1-quantity-trash').should('exist');
    get('cart-item-1-quantity-minus').should('not.exist');
    get('cart-total').contains('$1.00');
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10); // click backdrop (at top left to make sure click outside on mobile)

    get('product-card-2-add-button').click();
    get('cart-item-2-quantity').contains('1');
    get('cart-item-2-title').contains('Pizza');
    get('cart-item-2-quantity-trash').should('exist');
    get('cart-item-2-quantity-minus').should('not.exist');
    get('cart-total').contains('$3.00');
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10);

    get('product-card-3-add-button').click();
    get('cart-item-3-quantity').contains('1');
    get('cart-item-3-title').contains('Hot Dog');
    get('cart-item-3-quantity-trash').should('exist');
    get('cart-item-3-quantity-minus').should('not.exist');
    get('cart-total').contains('$6.00');
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10);

    get('product-card-4-add-button').click();
    get('cart-item-4-quantity').contains('1');
    get('cart-item-4-title').contains('Taco');
    get('cart-item-4-quantity-trash').should('exist');
    get('cart-item-4-quantity-minus').should('not.exist');
    get('cart-total').contains('$10.00');
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10);

    // Add items to cart after items are already in cart to ensure new total and quantity is correct
    get('product-card-1-add-button').click();
    get('cart-item-1-quantity').contains('2');
    get('cart-total').contains('$11.00');
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10); // click backdrop (at top left to make sure click outside on mobile)

    get('product-card-2-add-button').click();
    get('cart-item-2-quantity').contains('2');
    get('cart-total').contains('$13.00');
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10); // click backdrop (at top left to make sure click outside on mobile)

    get('product-card-3-add-button').click();
    get('cart-item-3-quantity').contains('2');
    get('cart-total').contains('$16.00');
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10); // click backdrop (at top left to make sure click outside on mobile)

    get('product-card-4-add-button').click();
    get('cart-item-4-quantity').contains('2');
    get('cart-total').contains('$20.00');
    // get('cart-drawer').find('.MuiBackdrop-root').click(10, 10); // click backdrop (at top left to make sure click outside on mobile)


    // Check Local Storage:
    cy.getAllLocalStorage().then((result) => {
      // -local storage for our origin exists
      expect(result).to.have.property('http://localhost:5173');
      
      const LS = result['http://localhost:5173'];

      // -local storage for our origin has a user property
      expect(LS).to.have.property('cart');
      const cart = getLS(LS.cart);
      console.log('cart: ', cart);

      // -user property has desired structure
      

      // // -local storage for our origin has a is_admin property of type string
      expect(cart[0].product.id).to.be.equal(1);
      expect(cart[0].product.category).to.be.equal('food');
      expect(cart[0].product.title).to.be.equal('Hamburger');
      expect(cart[0].product.price).to.be.equal(100);
      expect(cart[0].product.units_in_stock).to.be.equal(100);
      expect(cart[0].product.published).to.be.equal(true);
      expect(cart[0].product.status).to.be.equal('available');
      expect(cart[0].product.details_route).to.be.equal('/products/hamburger');
      expect(cart[0].product.description).to.be.a('string');
      expect(cart[0].product.image_url).to.be.a('string');
      expect(cart[0].product.uuid).to.be.a('string');

      expect(cart[1].product.id).to.be.equal(2);
      expect(cart[1].product.category).to.be.equal('food');
      expect(cart[1].product.title).to.be.equal('Pizza');
      expect(cart[1].product.price).to.be.equal(200);
      expect(cart[1].product.units_in_stock).to.be.equal(100);
      expect(cart[1].product.published).to.be.equal(true);
      expect(cart[1].product.status).to.be.equal('available');
      expect(cart[1].product.details_route).to.be.equal('/products/pizza');
      expect(cart[1].product.description).to.be.a('string');
      expect(cart[1].product.image_url).to.be.a('string');
      expect(cart[1].product.uuid).to.be.a('string');

      expect(cart[2].product.id).to.be.equal(3);
      expect(cart[2].product.category).to.be.equal('food');
      expect(cart[2].product.title).to.be.equal('Hot Dog');
      expect(cart[2].product.price).to.be.equal(300);
      expect(cart[2].product.units_in_stock).to.be.equal(100);
      expect(cart[2].product.published).to.be.equal(true);
      expect(cart[2].product.status).to.be.equal('available');
      expect(cart[2].product.details_route).to.be.equal('/products/hot-dog');
      expect(cart[2].product.description).to.be.a('string');
      expect(cart[2].product.image_url).to.be.a('string');
      expect(cart[2].product.uuid).to.be.a('string');

      expect(cart[3].product.id).to.be.equal(4);
      expect(cart[3].product.category).to.be.equal('food');
      expect(cart[3].product.title).to.be.equal('Taco');
      expect(cart[3].product.price).to.be.equal(400);
      expect(cart[3].product.units_in_stock).to.be.equal(100);
      expect(cart[3].product.published).to.be.equal(true);
      expect(cart[3].product.status).to.be.equal('available');
      expect(cart[3].product.details_route).to.be.equal('/products/taco');
      expect(cart[3].product.description).to.be.a('string');
      // expect(cart[3].product.image_url).to.be.a('string'); // this image_url is empty (it uses the fallback image in the UI)
      expect(cart[3].product.uuid).to.be.a('string');
    }); // cy.getAllLocalStorage().then((result) => { ... });
  });

  // -----------------------------------------------------

  // TEST: Changing quantity of items in cart and removing items from cart works correctly
  it('change quantity of items in cart and remove items from cart', () => {
  
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

  // TEST: The order-success route works with a UUID from the seeded orders table
  // -utilize cy.intercept() to mock the response from the backend
  // -first look up the UUID corresponding to the first seeded order in the orders table
  // -then, use this UUID in the url of the response in the interceptor below
  // -then, simply navigate to the order-success route with the UUID in the query parameter
  it('order summary page should work [using seeded order]', async () => {
    // -Don't use the endpoint, because it requires an admin JWT token.
    // const resp = await fetch('http://localhost:9000/api/orders');
    // const data = await resp.json();
    // console.log('data: ', data);

    // -Instead, access the DB directly
    cy.task('connectDB', 'SELECT * FROM orders').then((rows) => {
      rows.forEach(row => {
        console.log('row: ', row); // dev console
        cy.log(row.id);         // cypress console
      });

      // grab the UUID of the first order in the DB
      // -use this in the query parameter of the URL for the order summary page
      const row = rows[0];
      console.log('row: ', row);
      const uuid = row.uuid;

      cy.intercept('POST', '/api/orders', { 
        status: 201,
        body: {
          // Bypass Stripe Checkout for testing (data.url is empty, and data_test_url is set)
          // test_url: 'http://localhost:5173/checkout-success?order_uuid=624a9409d284',
          test_url: `/checkout-success?order_uuid=${uuid}`,
        }
      }).as('subscribe'); // intercept any HTTP request localhost:3000/newsletter?anything      


      // Add items to cart to click checkout (to utilize the interceptor above)
      get('product-card-1-add-button').click();

      // Click checkout button
      get('cart-checkout-button').click();

      // NOTE: Order is in status: 1 (pending) in the DB at this point

      // Test that 1 hamburger and 1 pizza are in the order
      get('order-summary-line-item-1').should('exist');
      get('order-summary-line-item-2').should('exist');
      get('order-summary-line-item-3').should('not.exist');

      get('order-summary-line-item-1-title').contains('Hamburger');
      get('order-summary-line-item-1-title').contains('1 × $1.00 each');

      get('order-summary-line-item-2-title').contains('Pizza');
      get('order-summary-line-item-2-title').contains('1 × $2.00 each');

      get('order-summary-total').contains('$3.00');
    });
  });

  // -----------------------------------------------------
  
  // TEST: The checkout button works correctly
  // -we bypass the actual Stripe checkout by sending a mocked request to the backend
  //  endpoint  [POST]  /api/orders route
  // -this creates the order in the DB in the 'pending' state
  // -we can just ignore that the order is in the 'pending' state for now
  // -we can pass in a paramter in the request object to tell the backend to 
  //  send the user directly to the successful order page with the UUID of the order in the query parameter
  it('should add order to DB when cart checkout button is clicked [using cart data from UI]', async () => {

    // don't redirect the user (to the stripe checkout)
    cy.visit('http://localhost:5173').then((win) => { // cy.visit()  yields the window object / just like cy.get() yields the element
      cy.stub(win.location, 'href').as('redirect'); 
    });
    // NOTE: This stub does not work - the user is still redirected!!!
    // NOTE: This stub does not work - the user is still redirected!!!
    // NOTE: This stub does not work - the user is still redirected!!!
    // NOTE: This stub does not work - the user is still redirected!!!
    // NOTE: This stub does not work - the user is still redirected!!!
    

    // Add items to cart
    get('product-card-1-add-button').click();
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10); // click backdrop (at top left to make sure click outside on mobile)
    get('product-card-2-add-button').click();
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10);
    get('product-card-2-add-button').click();
    get('cart-drawer').find('.MuiBackdrop-root').click(10, 10);
    get('product-card-2-add-button').click();

    // Click checkout button
    get('cart-checkout-button').click();

    // 1. test cart total is correct
    get('cart-drawer').should('be.visible');
    get('cart-total').contains('$7.00');

    // we simply need to check that the order is in the DB in the pending state
    // -we can ignore the whole redirect to teh stripe checkout for now
    // -I can stub the window.location.href = stripe_url with cy.stub() to avoid from being redirected to the stripe checkout

    // 5. Test that the order was added to the DB:
    cy.task('connectDB', 'SELECT * FROM orders').then((rows) => {
      // rows.forEach(row => {
      //   console.log('row: ', row); // dev console
      //   cy.log(row.id);         // cypress console
      // });
      const row = rows[3];
      console.log('row: ', row);


      expect(row.id).to.be.equal(4);
      expect(row.uuid).to.be.a('string');
      expect(row.user_id).to.a('number');
      expect(row.status).to.be.equal(1);
      expect(row.total).to.be.equal(700);
    });
  });

  // -----------------------------------------------------
});
