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
  cy.clearAllLocalStorage()
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

// describe('Checkout', () => {
//   // -----------------------------------------------------

//   it('should pass', () => {
//     assert(1 === 1);
//   });

//   // -----------------------------------------------------
// });

// ========================================================
// ========================================================
// ========================================================
// ========================================================

// describe('Admin Orders', () => {
//   // -----------------------------------------------------

//   it('should pass', () => {
//     assert(1 === 1);
//   });

//   // -----------------------------------------------------
// });

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

  // TEST: Clicking the close button closes the cart correctly

  // -----------------------------------------------------

  // TEST: Clicking outside the cart clses the cart correctly

  // -----------------------------------------------------

  // TEST: Clicking the open cart button opens it correctly

  // -----------------------------------------------------

  it('should have correct total with multiple items added & test local storage', () => {
  
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

  // TEST: Removing items from cart works correctly

  // -----------------------------------------------------

  // TEST: Changing quantity of items in cart works correctly

  // -----------------------------------------------------
  
  it('should send cart to checkout', () => {
  
    // Add items to cart
    get('product-card-1-add-button').click();

    // 1. test cart opens
    get('cart-drawer').should('be.visible');

    // 2. test item is added to cart with correct quantity
    get('cart-item-1').should('exist');
    get('cart-item-1').should('be.visible');

    // 3. test cart total is correct
    get('cart-total').contains('$1.00');

    // 4. test checkout button is visible
    // get('cart-checkout-button').click();

    // clicking checkout does this:
    //  --1.  notification is displayed
    //  --2.  cart is mapped into the correct form to be sent to the backend:
    // const order_items = cart.map(({ product, qty }) => {
    //   return { product_id: product.id, quantity: qty };
    // });

    //  --3.  [POST] request to /api/orders   (where the order is created in the DB in the pending state)
    //  --4.  Stripe URL is returned
    //  --5.  User is redirected to Stripe checkout (via window.location.href = stripe_url)
    //  --6.  Upon successful credit card transaction, the order is updated in the DB to the 'preparing' state and the user is redirected to the order summary page with the UUID from the order in the DB placed into the URL query parameter
    //  --7.  On the order summary page, the order is fetched from the DB via the UUID and displayed to the user


  });

  // -----------------------------------------------------
});