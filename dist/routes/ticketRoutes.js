"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const TicketService_1 = require("../services/TicketService");
const TicketController_1 = require("../controllers/TicketController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validateTicket_1 = __importDefault(require("../middleware/validateTicket"));
const CommentService_1 = require("../services/CommentService");
const User_1 = __importDefault(require("../model/User"));
const Comment_1 = __importDefault(require("../model/Comment"));
const Ticket_1 = __importDefault(require("../model/Ticket"));
const router = (0, express_1.Router)();
const userModel = new User_1.default();
const ticketModel = new Ticket_1.default();
const commentModel = new Comment_1.default();
const ticketService = new TicketService_1.TicketService(ticketModel, userModel);
const commentService = new CommentService_1.CommentService(commentModel, ticketModel);
const ticketController = new TicketController_1.TicketController(ticketService, commentService);
router.use(authMiddleware_1.authTokenValidator);
router.post('/', validateTicket_1.default, ticketController.createTicket.bind(ticketController));
router.patch('/:id', ticketController.updateTicket.bind(ticketController));
router.get('/:id', ticketController.getTicket.bind(ticketController));
router.get('/:id/comment', ticketController.getCommentsForTicket.bind(ticketController));
router.get('/', ticketController.getTickets.bind(ticketController));
router.post('/:id/assign', (0, authMiddleware_1.validateRoleAndNotRole)('customer', true), ticketController.assignTicket.bind(ticketController)),
    router.use(authMiddleware_1.validateIsAdmin);
router.get('/reports/closed', ticketController.generateClosedTicketsReport.bind(ticketController));
router.delete('/:id', ticketController.deleteTicket.bind(ticketController));
exports.default = router;
