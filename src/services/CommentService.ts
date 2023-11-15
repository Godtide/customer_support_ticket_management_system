// src/services/CommentService.ts
import { StatusCodes } from 'http-status-codes';
import CommentModel from '../model/Comment';
import { CommentDocument, TicketDocument } from "../model/IDocument";
import TicketModel from '../model/Ticket';
import { CustomError, generateError } from '../error.utils';


export class CommentService {
  private commentModel: CommentModel;
  private ticketModel: TicketModel;

  constructor(commentModel: CommentModel, TicketModel: TicketModel) {
    this.commentModel = commentModel;
    this.ticketModel = TicketModel;
  }

  async create(data: Partial<CommentDocument>) {
    return this.commentModel.create(data);
  }

  async update(id: string, data: Partial<CommentDocument>) {
    return this.commentModel.update(id, data);
  }

  async delete(id: string) {
    return this.commentModel.delete(id);
  }

  async findAll(filter?: object) {
    return this.commentModel.findAll(filter);
  }

  async createComment(requestId: string, userId: string, text: string){

    // Find the Request based on the given RequestId
    const Request: TicketDocument | null = await this.ticketModel.findById(requestId);

    // Check if the Request exists and if a support agent has commented on the Request
    if (!Request || !Request.isCommented_support_agent) {
      const errorResponse: CustomError = generateError(StatusCodes.BAD_REQUEST,'Request not found or a support agent must comment on the Request before a customer can comment.' );
      return errorResponse;
    }

    // Create the comment
    const newComment = await this.commentModel.create({ requestId: Request._id, userId, text });

    return newComment;
  }

  async getCommentsForRequest(RequestId: string): Promise<CommentDocument[]> {
    // Get all comments associated with the given Request ID
    const comments = await this.commentModel.findAll({ Request: RequestId });

    return comments;
  }
}
