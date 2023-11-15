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
exports.validateRoleAndNotRole = exports.validateIsAdmin = exports.authTokenValidator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const User_1 = __importDefault(require("../model/User"));
const UserService_1 = require("../services/UserService");
var Roles;
(function (Roles) {
    Roles["Customer"] = "Customer";
    Roles["SupportAgent"] = "SupportAgent";
    Roles["Admin"] = "Admin";
})(Roles || (Roles = {}));
function authTokenValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userModel = new User_1.default();
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "Invalid or missing authentication token" });
        }
        const token = authHeader.slice(7); // Remove 'Bearer ' from the token string
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
            const userService = new UserService_1.UserService(userModel); // Create an instance of the UserService
            const user = yield userService.findById(decodedToken.userId);
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            req.user = user; // Set the user object in the request with the fetched user from the database
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    });
}
exports.authTokenValidator = authTokenValidator;
function validateIsAdmin(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            if (!userRole) {
                return res.status(401).json({ error: true, message: 'Unauthorized: User role not found.' });
            }
            if (userRole.toString() !== Roles.Admin) {
                return res.status(403).json({ error: true, message: 'Forbidden: Only Admin users can perform this action.' });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.validateIsAdmin = validateIsAdmin;
function validateRoleAndNotRole(role, notRole) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            if (!userRole) {
                return res.status(401).json({ error: true, message: 'Unauthorized: User role not found.' });
            }
            if (userRole !== Roles.Admin
                || userRole !== Roles.Customer
                || userRole !== Roles.SupportAgent)
                return res.status(403).json({ error: true, message: `Forbidden: Only users with specific user role can perform this action.` });
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.validateRoleAndNotRole = validateRoleAndNotRole;
