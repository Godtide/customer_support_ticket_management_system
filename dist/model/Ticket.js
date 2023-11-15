"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CrudModel_1 = require("./CrudModel");
const ticketSchema = new mongoose_1.Schema({
    title: { type: String,
        // required: true 
    },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['Open', 'Active', 'Closed'],
        default: 'Open',
    },
    customer: { type: String, required: true },
    supportAgent: { type: String },
    isCommented_support_agent: { type: String }
});
class TicketModel extends CrudModel_1.CrudModel {
    constructor() {
        super((0, mongoose_1.model)('Ticket', ticketSchema));
    }
}
exports.default = TicketModel;
