// types/express.d.ts
import { Request as ExpressRequest } from 'express';

// Define the User type (adjust fields according to your application)
export interface User {
  id: string;
  email: string;
  // Other user properties you want to include
}

// Extend the Express Request type to include the user field
declare global {
  namespace Express {
    interface Request {
      user?: User; // Optionally make it non-nullable if you want
    }
  }
}
