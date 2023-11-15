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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
// src/services/CommentService.ts
const http_status_codes_1 = require("http-status-codes");
const error_utils_1 = require("../error.utils");
class CommentService {
    constructor(commentModel, TicketModel) {
        this.commentModel = commentModel;
        this.ticketModel = TicketModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentModel.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentModel.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentModel.delete(id);
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commentModel.findAll(filter);
        });
    }
    createComment(requestId, userId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the Request based on the given RequestId
            const Request = yield this.ticketModel.findById(requestId);
            // Check if the Request exists and if a support agent has commented on the Request
            if (!Request || !Request.isCommented_support_agent) {
                const errorResponse = (0, error_utils_1.generateError)(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Request not found or a support agent must comment on the Request before a customer can comment.');
                return errorResponse;
            }
            // Create the comment
            const newComment = yield this.commentModel.create({ requestId: Request._id, userId, text });
            return newComment;
        });
    }
    getCommentsForRequest(RequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get all comments associated with the given Request ID
            const comments = yield this.commentModel.findAll({ Request: RequestId });
            return comments;
        });
    }
}
exports.CommentService = CommentService;
