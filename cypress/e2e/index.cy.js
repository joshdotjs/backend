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

  // TEST: filtering (change days)
  it('test filtering [days in one month]', () => {

    // -the challenge with testing this is how do I know what times / dates to click in the UI
    //  because the seeding occurs at whatever time the test starts.
    // -I can modify the created_at entry in the tables and then I'll know what days / times to click in the UI

    const query = `
      UPDATE orders
      SET created_at = CASE
          WHEN id = 1 THEN '2023-10-1 12:34:56'
          WHEN id = 2 THEN '2023-10-2 12:35:56'
          WHEN id = 3 THEN '2023-10-3 12:36:56'
          ELSE created_at
      END
      WHERE id IN (1, 2, 3);
    `;

    cy.task('connectDB', query).then((rows) => {
      rows.forEach(row => {
        console.log('row: ', row); // dev console
        cy.log(row.id);         // cypress console
      });
      // const row = rows[3];
      // console.log('row: ', row);

      // expect(row.id).to.be.equal(4);
      // expect(row.uuid).to.be.a('string');
      // expect(row.user_id).to.a('number');
      // expect(row.status).to.be.equal(1);
      // expect(row.total).to.be.equal(700);

      // log user in
      get('navlink-Login-desktop').click();
      get('auth-email-text-field').type('josh@josh.com');
      get('auth-password-text-field').type('josh');
      get('auth-login-button').click();

      // disable real time updates
      get('admin-orders-real-time-checkbox').click();
      get('admin-orders-real-time-checkbox').should('not.be.checked');

      // click the days in the calendars to filter on days
      // get('admin-orders-calendar').click(195, 20); // open calendar
      get('admin-orders-calendar').find('.MuiButtonBase-root.MuiIconButton-root').click(); // open calendar
      // cy.get('#root').should('exist'); // calendar is open
      cy.get('.MuiPickersPopper-root').find('.MuiDayCalendar-root').should('exist'); // calendar is open
      cy.get('div.MuiDayCalendar-weekContainer[role="row"][aria-rowindex="1"]').find('[aria-colindex="1"]').click();




      // NOTE: You need to explicitly change the month to october and year to 2023!
      // NOTE: You need to explicitly change the month to october and year to 2023!
      // NOTE: You need to explicitly change the month to october and year to 2023!
      // NOTE: You need to explicitly change the month to october and year to 2023!
      // NOTE: You need to explicitly change the month to october and year to 2023!
      // NOTE: You need to explicitly change the month to october and year to 2023!
      // NOTE: You need to explicitly change the month to october and year to 2023!
      // NOTE: You need to explicitly change the month to october and year to 2023!
      
      

      // TODO: then, click the day in the calendar

      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE
      // HERE



    }); // cy.task()



  }); // it()

  // TEST: filtering (change months)

  // TEST: filtering (change year)

  // TEST: filtering (change time)

  // TEST: filtering (change status)

  // -----------------------------------------------------

  // TEST: real time updates
  //  -create a way to change the update time in the UI
  //  -change the update time to a short time
  //  -test the update with timers

  // -----------------------------------------------------

  // TEST: placing a new order works correctly

  // -----------------------------------------------------

  // -----------------------------------------------------
});
