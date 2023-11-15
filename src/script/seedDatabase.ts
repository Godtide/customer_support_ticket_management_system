import { TicketDocument } from "../model/IDocument";
import TicketModel from "../model/Ticket";
import UserModel from "../model/User";
import { TicketService } from "../services/TicketService";



export async function seedTickets(){
    try {
        let message: any ;
        const tickets = [
          {
            title: "Payment Palava",
            message: "I was unable to withdraw on your platform", 
            status: "Open", 
            customer: "f7c1fe6-d669-414e-b066-e9733f0de7a8",
            supportAgent:  "af7c1fe6-d669-414e-b066-e9733f0de7a8",
            isCommented_support_agent: true,
            createdAt: new Date(Date.now())
          },
          {
            title: "payment code",
            message: "I was unable to deposit on your platform", 
            status: "Open", 
            customer: "08c71152-c552-42e7-b094-f510ff44e9c",
            supportAgent:  "08c71152-c552-42e7-b094-f510ff44e9cb",
            isCommented_support_agent: false,
            createdAt: new Date(Date.now())
          }
        ];

       const ticketModel = new TicketModel();
       const userModel = new UserModel();
        const ticketService = new TicketService(ticketModel, userModel);
        if(message !== "I was unable to withdraw on your platform"){
            tickets.forEach((async (ticket) => {
                await ticketService.create(ticket)
                console.log(`ticket customerId: ${ticket.customer}`);
                console.log(`ticket supportAgentId: ${ticket.customer}`);
            } ))
        }
    }
    catch (err) {
      console.error('Error seeding some tickets', err);
    }


}