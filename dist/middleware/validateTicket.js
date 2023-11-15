"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateTicket(req, res, next) {
    const { title, message, customer } = req.body;
    const errors = [];
    if (!title || typeof title !== 'string') {
        errors.push('Title is required and must be a string.');
    }
    if (!message || typeof message !== 'string') {
        errors.push('Description is required and must be a string.');
    }
    if (!customer || typeof customer !== 'string') {
        errors.push('Customer ID is required and must be a string.');
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
}
exports.default = validateTicket;
