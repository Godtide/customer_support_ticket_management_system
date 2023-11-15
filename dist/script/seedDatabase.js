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
exports.seedTickets = void 0;
const Ticket_1 = __importDefault(require("../model/Ticket"));
const User_1 = __importDefault(require("../model/User"));
const TicketService_1 = require("../services/TicketService");
function seedTickets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let message;
            const tickets = [
                {
                    title: "Payment Palava",
                    message: "I was unable to withdraw on your platform",
                    status: "Open",
                    customer: "f7c1fe6-d669-414e-b066-e9733f0de7a8",
                    supportAgent: "af7c1fe6-d669-414e-b066-e9733f0de7a8",
                    isCommented_support_agent: true,
                    createdAt: new Date(Date.now())
                },
                {
                    title: "payment code",
                    message: "I was unable to deposit on your platform",
                    status: "Open",
                    customer: "08c71152-c552-42e7-b094-f510ff44e9c",
                    supportAgent: "08c71152-c552-42e7-b094-f510ff44e9cb",
                    isCommented_support_agent: false,
                    createdAt: new Date(Date.now())
                }
            ];
            const ticketModel = new Ticket_1.default();
            const userModel = new User_1.default();
            const ticketService = new TicketService_1.TicketService(ticketModel, userModel);
            if (message !== "I was unable to withdraw on your platform") {
                tickets.forEach(((ticket) => __awaiter(this, void 0, void 0, function* () {
                    yield ticketService.create(ticket);
                    console.log(`ticket customerId: ${ticket.customer}`);
                    console.log(`ticket supportAgentId: ${ticket.customer}`);
                })));
            }
        }
        catch (err) {
            console.error('Error seeding some tickets', err);
        }
    });
}
exports.seedTickets = seedTickets;
