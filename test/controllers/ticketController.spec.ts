import { expect } from "chai";
import request from 'supertest';
import sinon from 'sinon';
import express, { Application } from "express";
import { TicketController } from   '../../src/controllers/TicketController';
import TicketModel from "../../src/model/Ticket";
import UserModel from "../../src/model/User";
import { TicketService } from "../../src/services/TicketService";

describe('TicketController', () => {
    let app: Application;
    let ticketService: any;
   // Set up the Express app with the TicketController and mock services
    app = express();
   app.use(express.json());

    before(() => {
        
    let commentService: any;
    const ticketModel = new TicketModel();
    const userModel = new UserModel();
    ticketService = new TicketService(ticketModel, userModel);
    const ticketController = new TicketController(ticketService, commentService);

    app.post('/api/tickets', ticketController.createTicket.bind(ticketController));
    app.patch('/api/tickets/:id', ticketController.updateTicket.bind(ticketController));
    app.get('/api/tickets:id', ticketController.getTicket.bind(ticketController));
    app.get('/api/tickets', ticketController.getTickets.bind(ticketController));
    app.get('/api/tickets/{id}/comment', ticketController.getCommentsForTicket.bind(ticketController));
    app.get('/api/tickets/reports/closed', ticketController.generateClosedTicketsReport.bind(ticketController));
    });


  describe('createTicket', () => {
    it('should create a new ticket and return 201', async () => { 
        const newTicketData = { title: 'case_1', message: 'My picture does not display well on aws s3', customer: 'userId' };
         const createdTicketData = { ...newTicketData, _id: 'newTicketData' };
      
      // Mock the TicketService create method
      ticketService.create = sinon.stub().resolves(newTicketData);
      const res = await request(app).post('/api/tickets').send(newTicketData);
      expect(res.status).to.equal(201);
      expect(res.body).to.deep.equal(createdTicketData);
      sinon.assert.calledOnce(ticketService.create);
      sinon.assert.calledWithExactly(ticketService.create, newTicketData);
    });

    it('should not create a new ticket and return 500, when userId is invalid', async () => {

      const newTicketData = { title: 'case_1', message: 'My pictue does not display well on aws s3', customer: 'userId' };
      ticketService.create = async () => newTicketData;
      const res = await request(app).post('/api/tickets').send(newTicketData);
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('error', 'Failed to create ticket.');
    });

    it('should handle errors during ticket creation and return 500', async () => {
        ticketService.create = async () => {
        throw new Error('Failed to create ticket');
      };
      const res = await request(app).post('/api/tickets').send({});

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('error', 'Failed to create comment.');
    });


  describe('getAlltickets', () => {
    it('should fetch all tickets', async () => {

      const tickets = [
        {
        message: "I was unable to withdraw on your platform", 
        status: "Open", 
        customer: "customerId1",
        supportAgent:  "supportAgentId1",
        isCommented_support_agent: true
      },
      {
        message: "I was unable to deposit on your platform", 
        status: "Open", 
        customer: "customerId1",
        supportAgent:  "supportAgentId1",
        isCommented_support_agent: false
      }
    ]

      ticketService.findAll = async () => tickets;

      const res = await request(app).get('/api/tickets');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(tickets);
    });

    it('should handle errors during fetching tickets', async () => {
      ticketService.findAll = async () => {
        throw new Error('Failed to fetch tickets');
      };
      const res = await request(app).get('/api/tickets');

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('error', 'Failed to fetch tickets');
    });
  });
  });

});
 
