import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http'; // Import http module for server
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes';
import ticketRoutes from './routes/ticketRoutes';
import commentRoutes from './routes/commentRoutes';
import { swaggerOptions } from './config';
import { seedTickets } from './script/seedDatabase';

dotenv.config();

// Create Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Generate Swagger JSON
const specs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

let server: http.Server | null = null; // Variable to store the server instance

// Connect to MongoDB and return the server instance
async function connectToDatabase(): Promise<http.Server | null> {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error('MongoDB connection string not provided. Please set MONGODB_URI in .env file.');
    return null;
  }

  try {
    await mongoose.connect(mongoURI, {});

     await seedTickets()

    console.log('Connected to MongoDB successfully');


    // Start the server and store the instance
    const port = process.env.PORT || 5000;
    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    return server;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return null;
  }
}

// Function to close the server (for testing purposes)
function closeServer(): void {
  if (server) {
    server.close();
  }
}

connectToDatabase()
// Export the function to close the server and the app (for testing purposes)
export { closeServer, app, connectToDatabase };
