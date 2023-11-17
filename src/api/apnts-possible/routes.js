const express = require('express');
const router = express.Router();

const Controller = require('./controller');

// ==============================================

router.get('/', Controller.get);
router.post('/update', Controller.update);

// ==============================================

// error-handling middleware
router.use('/', (err, req, res, next) => {
  console.yellow('err (in error-handling middleware) [api/apnts-possible/routes.js]');
  next(err)
});

// ==============================================

module.exports = router;