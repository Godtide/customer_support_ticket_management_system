"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const AuthService_1 = require("../services/AuthService");
const UserService_1 = require("../services/UserService");
const AuthController_1 = require("../controllers/AuthController");
const authValidationMiddleware_1 = require("../middleware/authValidationMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const User_1 = __importDefault(require("../model/User"));
const router = (0, express_1.Router)();
const userModel = new User_1.default();
const userService = new UserService_1.UserService(userModel);
const authService = new AuthService_1.AuthService(userService);
const authController = new AuthController_1.AuthController(authService);
router.post('/signup', authValidationMiddleware_1.signUpValidation, (0, authValidationMiddleware_1.handleValidationAndExecution)(authValidationMiddleware_1.signUpValidation, authController.signUp.bind(authController)));
router.post('/login', authValidationMiddleware_1.loginValidation, (0, authValidationMiddleware_1.handleValidationAndExecution)(authValidationMiddleware_1.loginValidation, authController.login.bind(authController)));
router.post('/forgot-password', authValidationMiddleware_1.forgotPasswordValidation, (0, authValidationMiddleware_1.handleValidationAndExecution)(authValidationMiddleware_1.forgotPasswordValidation, authController.forgotPassword.bind(authController)));
router.post('/reset-password', authValidationMiddleware_1.resetPasswordValidation, (0, authValidationMiddleware_1.handleValidationAndExecution)(authValidationMiddleware_1.resetPasswordValidation, authController.resetPassword.bind(authController)));
// Test authTokenValidator middleware to routes that require authentication
router.get('/protected-route', authMiddleware_1.authTokenValidator, (req, res) => {
    var _a;
    // Access the authenticated user using req.user
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    res.json({ message: 'You accessed a protected route', userId });
});
exports.default = router;
