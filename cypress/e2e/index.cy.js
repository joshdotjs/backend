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
  it('test filtering [time]', () => {

    const date = new Date();
    const current_month = date.getMonth() + 1; // zero based
    const current_year = date.getFullYear();
    const current_day = date.getDate();
    const query = `
      UPDATE orders
      SET created_at = CASE
        WHEN id = 1 THEN '${current_year}-${current_month}-${current_day} 01:34:56'
        WHEN id = 2 THEN '${current_year}-${current_month}-${current_day} 02:35:56'
        WHEN id = 3 THEN '${current_year}-${current_month}-${current_day} 03:36:56'
        ELSE created_at
      END
      WHERE id IN (1, 2, 3)
      RETURNING *;
    `;

    cy.task('connectDB', query).then((rows) => {
    // cy.task('connectDB', "      UPDATE orders SET created_at = CASE WHEN id = 1 THEN '2023-10-1 12:34:56' WHEN id = 2 THEN '2023-10-2 12:35:56' WHEN id = 3 THEN '2023-10-3 12:36:56' ELSE created_at END WHERE id IN (1, 2, 3);").then((rows) => {
      rows.forEach(row => {
        console.log('row: ', row); // dev console
        cy.log(row.id);         // cypress console
      });

      // log user in
      get('navlink-Login-desktop').click();
      get('auth-email-text-field').type('josh@josh.com');
      get('auth-password-text-field').type('josh');
      get('auth-login-button').click();

      // disable real time updates
      get('admin-orders-real-time-checkbox').click();
      get('admin-orders-real-time-checkbox').should('not.be.checked');

      
      const setClocks = ({ hr_lo, min_lo, hr_hi, min_hi }) => {
        // set left clock:
        get('admin-orders-time-lo').find('.MuiButtonBase-root.MuiIconButton-root').click();                                  // time-LO: open time picker
        cy.get('.MuiPickersPopper-root').find('.MuiMultiSectionDigitalClock-root').should('exist');                          // time-LO: time-picker is open
        cy.get('.MuiPickersPopper-root').find('.MuiMultiSectionDigitalClock-root').find(`[aria-label="${hr_lo} hours"]`).click();   // time-LO: click hour
        cy.get('.MuiPickersPopper-root').find('.MuiMultiSectionDigitalClock-root').find(`[aria-label="${min_lo} minutes"]`).click(); // time-LO: click minute
        get('admin-orders-time-lo').find('.MuiButtonBase-root.MuiIconButton-root').click();                                  // close time picker
        cy.wait(500); // Wait for animation or any delay [both open clocks are found without this!]
  
        // set right clock:
        get('admin-orders-time-hi').find('.MuiButtonBase-root.MuiIconButton-root').click();                                  // time-HI: open time picker
        cy.get('.MuiPickersPopper-root').find('.MuiMultiSectionDigitalClock-root').should('exist');                          // time-HI: time-picker is open
        cy.get('.MuiPickersPopper-root').find('.MuiMultiSectionDigitalClock-root').find(`[aria-label="${hr_hi} hours"]`).click({ force: true });    // time-HI: click hour // time-HI: click hour
        cy.get('.MuiPickersPopper-root').find('.MuiMultiSectionDigitalClock-root').find(`[aria-label="${min_hi} minutes"]`).click({ force: true }); // time-HI: click minute
        // must force click in case the user needs to scroll down in order to see the hour / nimute
        get('admin-orders-time-hi').find('.MuiButtonBase-root.MuiIconButton-root').click();                                  // close time picker
        cy.wait(500); // Wait for animation or any delay [both open clocks are found without this!]
      };


      let order_id = 1;
      setClocks({ hr_lo: 1, min_lo: 5, hr_hi: 2, min_hi: 30 });


      // cy.get('.MuiPickersPopper-root').find('.MuiMultiSectionDigitalClock-root').find('[aria-label="6 hours"]').click();   // time-HI: click hour
      // cy.get('.MuiPickersPopper-root').find('.MuiMultiSectionDigitalClock-root').find('[aria-label="5 minutes"]').click(); // time-HI: click minute



      // get('admin-orders').should('have.length', 1); // test number of orders == 1
      // get(`admin-order-${order_id}--line-item-1-product-name`).contains('Hamburger');
      // get(`admin-order-${order_id}--line-item-2-product-name`).contains('Pizza');
      // get(`admin-order-${order_id}--line-item-1-quantity`).contains('1');
      // get(`admin-order-${order_id}--line-item-2-quantity`).contains('1');

    }); // cy.task()
  }); // it()  

  // -----------------------------------------------------
});
