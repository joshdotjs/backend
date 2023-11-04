Kill processes on a port (npm i -g fkill-cli):
  fkill :5000
Kill all node processes:
  fkill node

=================================================

Stripe Webooks: https://stripe.com/docs/payments/handling-payment-events
stripe login --api-key STRIPE_PRIVATE_KEY
[mac]       stripe listen --forward-to localhost:9000/api/orders/webhook
[windows]   C:/stripe listen --forward-to localhost:9000/api/orders/webhook
npm run dev

=================================================

NOTE: 
  -Must use at least Node version 18 because fetch is used in backend code.

=================================================

npx knex migrate:make init_migrations

=================================================

How to display demo & code on portfolio with project evolution:
  - Code: Different branch
  - Demo: Only have demo for current version

=================================================

Cypress PG: https://dev.to/xvier/connecting-cypress-to-a-postgresql-database-3po5

=================================================

TESTING / DEV SCRIPTS:

  Here is how to make sure the e2e tests use the testing DB:
    -step 1: npm run dev:e2e
    -step 2: npm run e2e

  Run dev DB when NOT doing e2e tests:
    -npm run dev

  Currently, Unit tests and e2e tests interfere with eachother
    -Run unit tests while building out the backend
      --npm run dev
      --npm run test:watch
    -Run e2e tests not while building out the backend
      --npm run dev:e2e
      --npm run e2e

    
=================================================

Web Sockets Description:
- sockets on backend are initialized in  /util/sockets.js,  which is used in the index.js file via initIO( http_server )
- We get the io object from the getIO() function in the controller for updating order status
- on backend, when the admin updates the order status we emmit a message with the name: `message - ${uuid}`
- on frontend, we listen for the `message - ${uuid}` socket even inside the checkout success page and update the status state variable accordingly to display to the user the real time status


TODO: 
  - [X]  Describe web sockets implementation
  - [X]  display the updated orders status on the order summary page
  - [ ]  send email to user when order status updates
  - [ ]  replace polling with web-sockets in admin dashboard