"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// src/services/AuthService.ts
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const crypto_1 = require("crypto");
const config_1 = require("../config");
const util_1 = __importDefault(require("util"));
class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcryptjs_1.genSalt)(10);
            return (0, bcryptjs_1.hash)(password, salt);
        });
    }
    comparePasswords(plainPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, bcryptjs_1.compare)(plainPassword, hashedPassword);
        });
    }
    generateAuthToken(user) {
        return (0, jsonwebtoken_1.sign)({ userId: user._id }, config_1.JWT_SECRET, { expiresIn: config_1.JWT_EXPIRES_IN });
    }
    generateRefreshToken(user) {
        return (0, jsonwebtoken_1.sign)({ userId: user._id }, config_1.REFRESH_TOKEN_SECRET, { expiresIn: config_1.REFRESH_TOKEN_EXPIRES_IN });
    }
    signUp(username, first_name, last_name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userService.findBy({ $or: [{ username }, { email }] });
            if (existingUser) {
                return { error: true, statusCode: 409, message: 'Username or email already exists.' };
            }
            const hashedPassword = yield this.hashPassword(password);
            const newUser = yield this.userService.create({
                first_name: first_name,
                last_name: last_name,
                email,
                password: hashedPassword,
                role,
            });
            const authToken = this.generateAuthToken(newUser);
            const refreshToken = this.generateRefreshToken(newUser);
            return { user: newUser, authToken, refreshToken };
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findBy({ username });
            if (!user) {
                return { error: true, statusCode: 401, message: 'Invalid credentials.' };
            }
            const isPasswordValid = yield this.comparePasswords(password, user.password);
            if (!isPasswordValid) {
                return { error: true, statusCode: 401, message: 'Invalid credentials.' };
            }
            const authToken = this.generateAuthToken(user);
            const refreshToken = this.generateRefreshToken(user);
            return { authToken, refreshToken };
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findBy({ email });
            if (!user) {
                return { error: true, statusCode: 404, message: 'User not found.' };
            }
            const resetToken = (yield util_1.default.promisify(crypto_1.randomBytes)(20)).toString('hex');
            user.resetToken = resetToken;
            user.resetTokenExpiration = new Date(Date.now() + 3600000); // Convert the number to a Date object
            yield user.save();
            // Send the reset token to the user via email (implement this part separately)
            return { message: 'Password reset token sent via email.' };
        });
    }
    resetPassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findById(userId);
            if (!user) {
                return { error: true, statusCode: 404, message: 'User not found.' };
            }
            const hashedPassword = yield this.hashPassword(password);
            user.password = hashedPassword;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;
            yield user.save();
            return { message: 'Password reset successful.' };
        });
    }
}
exports.AuthService = AuthService;
