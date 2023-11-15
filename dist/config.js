"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = exports.PORT = exports.REFRESH_TOKEN_EXPIRES_IN = exports.REFRESH_TOKEN_SECRET = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
// src/config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 60;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret';
exports.REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '20h';
exports.PORT = process.env.PORT || 5000;
exports.swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Customer Support Request System API',
            version: '1.0.0',
            description: 'API documentation for the Customer Support Request System',
        },
        servers: [
            {
                url: `http://localhost:${exports.PORT}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['src/controllers/*.ts'], // Path to the Swagger-annotated files
};
