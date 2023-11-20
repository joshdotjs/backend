const express = require('express');
const router = express.Router();

const Controller = require('./controller');

// ==============================================

router.get('/', Controller.get);
router.post('/', Controller.create);
router.post('/get-apnt-by-datetime', Controller.getByDateTime);

// ==============================================

// error-handling middleware
router.use('/', (err, req, res, next) => {
  console.yellow('err (in error-handling middleware) [api/apnts/routes.js]');
  next(err)
});

// ==============================================

module.exports = router;