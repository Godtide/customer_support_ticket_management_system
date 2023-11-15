"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateError = void 0;
function generateError(statusCode, message) {
    return {
        error: true,
        statusCode: statusCode,
        message: message,
    };
}
exports.generateError = generateError;
