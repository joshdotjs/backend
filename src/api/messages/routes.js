const express = require('express');
const router = express.Router();

const authMiddleware = required('api/auth/middleware');
const Controller = require('./controller');

// ==============================================

router.get('/',         authMiddleware.restricted, authMiddleware.admin, Controller.get);
router.get('/user/:id', authMiddleware.restricted, authMiddleware.admin, Controller.getByUserID);
router.post('/',        authMiddleware.restricted,                       Controller.create);

// ==============================================

// error-handling middleware
router.use('/', (err, req, res, next) => {
  console.yellow('err (in error-handling middleware) [api/messages/routes.js]');
  next(err)
});

// ==============================================

module.exports = router;