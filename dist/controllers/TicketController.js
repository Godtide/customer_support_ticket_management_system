"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const fs = __importStar(require("fs"));
class TicketController {
    constructor(ticketService, commentService) {
        this.ticketService = ticketService;
        this.commentService = commentService;
    }
    /**
     * @swagger
     * /api/tickets:
     *   post:
     *     summary: Create a new ticket
     *     description: Create a new ticket with the provided title, description, and customer ID
     *     tags:
     *       - Tickets
     *     parameters:
     *       - in: body
     *         name: ticket
     *         description: The ticket information to create
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             title:
     *               type: string
     *             message:
     *               type: string
     *             customer:
     *               type: string
     *     responses:
     *       201:
     *         description: Successfully created a new ticket
     *       500:
     *         description: Internal server error
     */
    createTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, message, customer } = req.body;
                const ticketData = {
                    title,
                    message,
                    customer,
                    status: "Open",
                    createdAt: new Date(Date.now())
                };
                const newTicket = yield this.ticketService.create(ticketData);
                res.status(201).json(newTicket);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @swagger
     * /api/tickets/{id}:
     *   patch:
     *     summary: Update a ticket
     *     description: Update an existing ticket with the provided title and description
     *     tags:
     *       - Tickets
     *     parameters:
     *       - in: path
     *         name: id
     *         description: The ID of the ticket to update
     *         required: true
     *         type: string
     *       - in: body
     *         name: ticket
     *         description: The updated ticket information
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             title:
     *               type: string
     *             description:
     *               type: string
     *     responses:
     *       200:
     *         description: Successfully updated the ticket
     *       404:
     *         description: Ticket not found
     *       500:
     *         description: Internal server error
     */
    updateTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const _a = req.body, { title, description } = _a, data = __rest(_a, ["title", "description"]);
                const ticketData = Object.assign({ title,
                    description }, data);
                const updatedTicket = yield this.ticketService.update(ticketId, ticketData);
                if (!updatedTicket) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }
                res.json(updatedTicket);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @swagger
     * /api/tickets/{id}:
     *   delete:
     *     summary: Delete a ticket
     *     description: Delete a ticket by its ID
     *     tags:
     *       - Tickets
     *     parameters:
     *       - in: path
     *         name: id
     *         description: The ID of the ticket to delete
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Successfully deleted the ticket
     *       404:
     *         description: Ticket not found
     *       500:
     *         description: Internal server error
     */
    deleteTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const deleted = yield this.ticketService.delete(ticketId);
                if (!deleted) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }
                res.json({ message: 'Ticket deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @swagger
     * /api/tickets/{id}:
     *   get:
     *     summary: Get a ticket by ID
     *     description: Get a ticket by its ID
     *     tags:
     *       - Tickets
     *     parameters:
     *       - in: path
     *         name: id
     *         description: The ID of the ticket to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Successfully fetched the ticket
     *       404:
     *         description: Ticket not found
     *       500:
     *         description: Internal server error
     */
    getTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const ticket = yield this.ticketService.findById(ticketId);
                if (!ticket) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }
                res.json(ticket);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @swagger
     * /api/tickets:
     *   get:
     *     summary: Get all tickets
     *     description: Get a list of all tickets
     *     tags:
     *       - Tickets
     *     responses:
     *       200:
     *         description: Successfully fetched tickets
     *       500:
     *         description: Internal server error
     */
    getTickets(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tickets = yield this.ticketService.findAll();
                res.json(tickets);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @swagger
     * /api/tickets/{id}/comment:
     *   get:
     *     summary: Get comments for a ticket
     *     description: Get all comments associated with a specific ticket
     *     tags:
     *       - Tickets
     *     parameters:
     *       - in: path
     *         name: id
     *         description: The ID of the ticket to retrieve comments for
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Successfully fetched comments for the ticket
     *       404:
     *         description: Ticket not found
     *       500:
     *         description: Internal server error
     */
    getCommentsForTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                // Retrieve the comments for the specific ticket
                const comments = yield this.commentService.getCommentsForRequest(ticketId);
                // Return the comments in the response
                res.json(comments);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
   * @swagger
   * /api/tickets/reports/closed:
   *   get:
   *     summary: Generate a report of closed tickets within a date range
   *     description: Generate a CSV report containing closed tickets within the specified start and end date
   *     tags:
   *       - Tickets
   *     parameters:
   *       - name: startDate
   *         in: query
   *         description:The start date for the report (format: YYYY-MM-DD)
   *         required: true
   *         schema:
   *           type: string
   *
   *       - name: endDate
   *         in: query
   *         description:The end date for the report (format: YYYY-MM-DD)
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successfully generated the report
   *       400:
   *         description: Invalid date format or missing start/end date
   *       500:
   *         description: Internal server error
   */
    generateClosedTicketsReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = req.query;
                if (!startDate || !endDate) {
                    return res.status(400).json({ message: 'Start date and end date are required.' });
                }
                const startDateObj = new Date(startDate);
                const endDateObj = new Date(endDate);
                if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
                    return res.status(400).json({ message: 'Invalid date format. Please provide dates in valid format (YYYY-MM-DD).' });
                }
                const reportFilePath = yield this.ticketService.generateClosedTicketsReport(startDateObj, endDateObj);
                res.download(reportFilePath, (err) => {
                    if (err) {
                        console.error('Error downloading file:', err);
                        return res.status(500).json({ message: 'Error downloading file.' });
                    }
                    // Delete the report file after it's downloaded
                    fs.unlink(reportFilePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        }
                    });
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @swagger
     * /api/tickets/{id}/assign:
     *   post:
     *     summary: Assign tickets to support agent
     *     description: Assign an existing ticket with the provided title and description
     *     tags:
     *       - Tickets
     *     parameters:
     *       - in: path
     *         name: id
     *         description: The ID of the ticket to assign
     *         required: true
     *         type: string
     *       - in: body
     *         name: ticket
     *         description: The assigned ticket information
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             supportAgent:
     *               type: string
     *     responses:
     *       200:
     *         description: Successfully assigned the ticket
     *       404:
     *         description: Ticket or support agent not found
     *       500:
     *         description: Internal server error
     */
    assignTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const { supportAgent } = req.body;
                const assignedTicket = yield this.ticketService.assignTicketToSupportAgent(ticketId, supportAgent);
                if (!assignedTicket) {
                    return res.status(404).json({ message: 'Assigned Ticket not found' });
                }
                res.status(200).json(assignedTicket);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TicketController = TicketController;
