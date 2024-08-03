import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: string; // or more detailed type if needed
}
