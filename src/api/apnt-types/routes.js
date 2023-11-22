const express = require('express');
const router = express.Router();

const Controller = require('./controller');

// ==============================================

router.get( '/',    Controller.get);
router.post('/',    Controller.create);
router.post('/:id', Controller.update);
router.get( '/:id', Controller.getByID);

// ==============================================

// error-handling middleware
router.use('/', (err, req, res, next) => {
  console.yellow('err (in error-handling middleware) [api/apnt-types/routes.js]');
  next(err)
});

// ==============================================

module.exports = router;