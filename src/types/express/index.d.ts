// This file extends Express's Request type to include user info after authentication
// It allows TypeScript to recognize req.user in routes and middleware
import { UserRole } from '../../models/user/user.entity';

declare global {
  namespace Express {
    // Adds a user property to the Request object
    export interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}

export {};
