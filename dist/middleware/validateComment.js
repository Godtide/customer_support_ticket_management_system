"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateComment(req, res, next) {
    const { text, ticketId, user } = req.body;
    const errors = [];
    if (!text || typeof text !== 'string') {
        errors.push('Text is required and must be a string.');
    }
    if (!ticketId || typeof ticketId !== 'string') {
        errors.push('Ticket ID is required and must be a string.');
    }
    if (!user || typeof user !== 'string') {
        errors.push('User ID is required and must be a string.');
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
}
exports.default = validateComment;
