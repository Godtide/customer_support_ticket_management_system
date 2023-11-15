
import { Schema, model } from 'mongoose';
import { CrudModel } from './CrudModel';
import { TicketDocument } from './IDocument';

const ticketSchema = new Schema({
    title: {  type: String, 
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


class TicketModel extends CrudModel<TicketDocument>{
    constructor() {
        super(model<TicketDocument>('Ticket', ticketSchema));
      }
}

export default TicketModel;


