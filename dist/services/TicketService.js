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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
// src/services/TicketService.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const http_status_codes_1 = require("http-status-codes");
const csv = __importStar(require("fast-csv"));
const error_utils_1 = require("../error.utils");
class TicketService {
    constructor(TicketModel, userModel) {
        this.ticketModel = TicketModel;
        this.userModel = userModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketModel.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketModel.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketModel.delete(id);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketModel.findById(id);
        });
    }
    findBy(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketModel.findBy(filter);
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketModel.findAll(filter);
        });
    }
    findClosedTicketsInRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ticketModel.findAll({
                status: 'Closed',
                updatedAt: { $gte: startDate, $lte: endDate },
            });
        });
    }
    generateClosedTicketsReport(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const closedTickets = yield this.findClosedTicketsInRange(startDate, endDate);
            const formattedClosedTickets = closedTickets.map(ticket => ({
                title: ticket.title,
                message: ticket.message,
                status: ticket.status,
                customer: ticket.customer,
                supportAgent: ticket.supportAgent,
                createdAt: ticket.createdAt,
                updatedAt: ticket.updatedAt,
            }));
            // Create the 'reports' directory if it doesn't exist
            const reportsDir = (0, path_1.join)(__dirname, '..', 'reports');
            if (!fs_1.default.existsSync(reportsDir)) {
                fs_1.default.mkdirSync(reportsDir);
            }
            const fileName = `closed_tickets_report_${Date.now()}.csv`;
            const filePath = (0, path_1.join)(reportsDir, fileName);
            const ws = fs_1.default.createWriteStream(filePath);
            const csvStream = csv.format({ headers: true });
            csvStream.pipe(ws);
            for (const ticket of formattedClosedTickets) {
                csvStream.write(ticket);
            }
            csvStream.end();
            return new Promise((resolve, reject) => {
                ws.on('finish', () => {
                    resolve(filePath);
                });
                ws.on('error', (error) => {
                    reject(error);
                });
            });
        });
    }
    assignTicketToSupportAgent(ticketId, supportAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!supportAgent) {
                const errorResponse = (0, error_utils_1.generateError)(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Support Agent missing.');
                return errorResponse;
            }
            const ticket = yield this.ticketModel.findById(ticketId);
            const supportAgentData = yield this.userModel.findById(supportAgent);
            if (!supportAgentData) {
                const errorResponse = (0, error_utils_1.generateError)(http_status_codes_1.StatusCodes.NOT_FOUND, 'Support Agent not found.');
                return errorResponse;
            }
            if (!ticket) {
                const errorResponse = (0, error_utils_1.generateError)(http_status_codes_1.StatusCodes.NOT_FOUND, 'Ticket not found.');
                return errorResponse;
            }
            if (ticket.status === 'Open') {
                ticket.status = 'Active';
            }
            ticket.supportAgent = supportAgent;
            return this.update(ticketId, ticket);
        });
    }
}
exports.TicketService = TicketService;
