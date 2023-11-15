// src/middleware/validateTicket.ts
import { Request, Response, NextFunction } from 'express';

function validateTicket(req: Request, res: Response, next: NextFunction) {


  const { title, message, customer } = req.body;
  const errors: string[] = [];

  if (!title || typeof title !== 'string') {
    errors.push('Title is required and must be a string.');
  }

  if (!message || typeof message !== 'string') {
    errors.push('Description is required and must be a string.');
  }

  if (!customer || typeof customer !== 'string') {
    errors.push('Customer ID is required and must be a string.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

export default validateTicket;
