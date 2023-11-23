const express = require('express');
const router = express.Router();

// const authMiddleware = required('api/auth/middleware');
// authMiddleware.restricted, 
// authMiddleware.admin,
const Controller = require('./controller');

// ==============================================

router.get('/',                      Controller.get);
router.get('/user/:id',              Controller.getByUserID); // TODO: authorization
router.post('/',                     Controller.create);
router.post('/get-apnt-by-datetime', Controller.getByDateTime);

// ==============================================

// error-handling middleware
router.use('/', (err, req, res, next) => {
  console.yellow('err (in error-handling middleware) [api/apnts/routes.js]');
  next(err)
});

// ==============================================

module.exports = router;