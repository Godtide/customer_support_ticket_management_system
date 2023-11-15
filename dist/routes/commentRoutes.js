"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const CommentService_1 = require("../services/CommentService");
const CommentController_1 = require("../controllers/CommentController");
const validateComment_1 = __importDefault(require("../middleware/validateComment"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const Ticket_1 = __importDefault(require("../model/Ticket"));
const Comment_1 = __importDefault(require("../model/Comment"));
const router = (0, express_1.Router)();
const commentModel = new Comment_1.default();
const ticketModel = new Ticket_1.default();
const commentService = new CommentService_1.CommentService(commentModel, ticketModel);
const commentController = new CommentController_1.CommentController(commentService);
router.use(authMiddleware_1.authTokenValidator);
router.post('/', validateComment_1.default, commentController.createComment.bind(commentController));
router.patch('/:id', validateComment_1.default, commentController.updateComment.bind(commentController));
router.get('/', commentController.getAllComments.bind(commentController));
router.use(authMiddleware_1.validateIsAdmin);
router.delete('/:id', commentController.deleteComment.bind(commentController));
exports.default = router;
