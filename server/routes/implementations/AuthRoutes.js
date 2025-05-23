const express = require('express');
const AuthController = require('../../controllers/authController');
const ValidationMiddleware = require('../../middlewares/implementations/ValidationMiddleware');
const authValidator = require('../../validators/authValidators');
const IRoute = require('../IRoute');

class AuthRoutes extends IRoute {
  register(app) {
    const router = express.Router();

    router.post(
      '/login',
      ValidationMiddleware.use({ body: authValidator.loginSchema }),
      AuthController.loginUser
    );
    router.post(
      '/signup',
      ValidationMiddleware.use({ body: authValidator.signupSchema }),
      AuthController.signupUser
    );

    app.use('/api/auth', router);
  }
}

module.exports = AuthRoutes;
