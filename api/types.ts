import { Request } from "express";

 export interface AuthenticatedRequest extends Request {
    user?: {
      id: string;
      role: string;
    };
  }

  export interface UserPayload {
    id: string;      // Unique identifier for the user
    role: string;    // Role of the user (admin, superadmin, etc.)
    iat: number;     // Issued at timestamp
    exp: number;     // Expiration timestamp
}