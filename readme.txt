Kill processes on a port (npm i -g fkill-cli):
  fkill :5000
Kill all node processes:
  fkill node

=================================================

stripe listen --forward-to localhost:9000/api/checkout/webhook
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

Error Handling:

POST: Write out all cases
  - With description of what happens in each case.

Edge cases to handle via Error Handling:
  - Edit / Delete:
    -- [DONE] user with id not found
      --- num_rows_updated OR num_rows_deleted === 0 => ID not found
  - Create:
    -- [TODO] if user already exists in DB then do not create
      --- Need to first look up the user by email, then, if user is already in DB then throw error

==============================================

Validation

POST: Write out all cases
  - With description of what happens in each case.

  - Frontend
    -- library: ???
  - Backend
    -- library: ??? [node.js]
      --- Create:
        --- [DONE] fields cannot be empty
        --- password cannot be less than 4-characters


TODO: Mon
  1. get by ID errors