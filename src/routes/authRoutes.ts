// src/routes/authRoutes.ts
import { Router } from 'express';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { AuthController } from '../controllers/AuthController';
import {
  signUpValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  handleValidationAndExecution
} from '../middleware/authValidationMiddleware';
import { authTokenValidator } from '../middleware/authMiddleware';
import { validationResult } from 'express-validator';
import UserModel from '../model/User';

const router = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

router.post('/signup', signUpValidation, handleValidationAndExecution(signUpValidation, authController.signUp.bind(authController)));
router.post('/login', loginValidation,  handleValidationAndExecution(loginValidation, authController.login.bind(authController)));
router.post('/forgot-password', forgotPasswordValidation, handleValidationAndExecution(forgotPasswordValidation, authController.forgotPassword.bind(authController)));
router.post('/reset-password', resetPasswordValidation,handleValidationAndExecution(resetPasswordValidation, authController.resetPassword.bind(authController)));

// Test authTokenValidator middleware to routes that require authentication
router.get('/protected-route', authTokenValidator, (req, res) => {
  // Access the authenticated user using req.user
  const userId = req.user?.id;
  res.json({ message: 'You accessed a protected route', userId });
});

export default router;
