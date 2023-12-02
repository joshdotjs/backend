const express = require('express');
const router = express.Router();

// ==============================================

// import authController from './controller';
const authController = require('./controller');

// ==============================================

router.post( '/register', authController.register ); // [POST] /api/auth/register
router.post('/login',     authController.login);     // [POST] /api/auth/login
router.get('/logout',     authController.logout);    // [GET]  /api/auth/logout

// ==============================================

module.exports = router;