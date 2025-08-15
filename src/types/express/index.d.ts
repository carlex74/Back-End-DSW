import { UserRole } from '../../models/user/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}

export {};
