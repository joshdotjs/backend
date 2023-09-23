const express = require('express');
const router = express.Router();

// const authMiddleware = require('../auth/middleware');
const Controller = require('./controller');

// ==============================================

router.get('/', 
  // authMiddleware.restricted,
  // authMiddleware.admin,
  Controller.get
);

// ==============================================

router.post('/', Controller.create);

// ==============================================

router.get('/:id', 
  // authMiddleware.restricted,
  // authMiddleware.admin,
  Controller.getByID
);

// ==============================================

router.delete('/:id', 
  // authMiddleware.restricted,
  // authMiddleware.admin,
  Controller.deleteByID
);

// ==============================================

router.put('/:id', 
  // authMiddleware.restricted,
  // authMiddleware.admin,
  Controller.update
);

// ==============================================

// error-handling middleware
router.use('/', (err, req, res, next) => {
  console.yellow('err (in error-handling middleware) [api/users/routes.js]');
  next(err)
});

// ==============================================

module.exports = router;