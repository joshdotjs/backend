const express = require('express');
const router = express.Router();

const authMiddleware = required('api/auth/middleware');
// const authMiddleware = required('../auth/middleware');
const Controller = require('./controller');

// ==============================================

router.get('/', 
  authMiddleware.restricted,
  authMiddleware.admin,
  Controller.get
);
router.post('/get-filtered', 
  authMiddleware.restricted,
  authMiddleware.admin,
  Controller.getFiltered
);
router.post('/', Controller.create);
router.get('/:uuid', Controller.getByUuid);
router.post('/update-status', 
  // authMiddleware.restricted,
  // authMiddleware.admin, // the user updates their status via the stripe webhook
  Controller.updateStatus
);

// ==============================================

const bodyParser = require('body-parser');
router.post('/webhook', 
  bodyParser.raw({type: 'application/json'}), // Use body-parser to retrieve the raw body as a buffer
  Controller.webhook
);

// ==============================================

// error-handling middleware
router.use('/', (err, req, res, next) => {
  // console.yellow('err (in error-handling middleware) [api/orders/routes.js]');
  next(err)
});

// ==============================================

module.exports = router;