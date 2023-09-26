Kill processes on a port (npm i -g fkill-cli):
  fkill :5000
Kill all node processes:
  fkill node

=================================================


Stripe Webooks: https://stripe.com/docs/payments/handling-payment-events
stripe login --api-key STRIPE_PRIVATE_KEY
stripe listen --forward-to localhost:9000/api/orders/webhook
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