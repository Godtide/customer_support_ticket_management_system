import { Document } from 'mongoose';

export interface IDocument extends Document {
    createdAt?: Date;
    updatedAt?: Date;
  }
  
export interface TicketDocument extends IDocument {
    title: string,
    message: string,
    status: string,
    customer: string,
    supportAgent: string,
    isCommented_support_agent?: boolean; //boolean to check if agent has commented
}

export interface CommentDocument extends IDocument {
   userId: string;
   requestId: string;
   text: string;
}

export interface UserDocument extends IDocument {
  username: String;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  resetToken?: string ; 
  resetTokenExpiration?: Date ; 
}


