// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { UserPayload } from '../types';
// import { AuthenticatedRequest } from '../types';



// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     res.status(401).json({ error: 'Unauthorized, token missing or invalid' });
//   } else {
//     const token = authHeader.split(' ')[1];
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(403).json({ error: 'Invalid token' });
//     }
//   }
// };

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//        res.status(401).json({ error: 'Unauthorized, token missing or invalid' });
//   }else{
//     const token = authHeader.split(' ')[1];
//     console.log("Token",token)
//     try {
      
//       const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key')as { role: string }; // Make sure JWT_SECRET is defined correctly
//       console.log('decode token', decoded)
//       req.user = decoded; // Set user information in request
//       next();
//   } catch (error) {
//       res.status(403).json({ error: 'Invalid token' });
//   }
//   }

 

// };

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types'; // Ensure this type has the role property defined

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET = 'your-secret-key';
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.error('Unauthorized, token missing or invalid');
    res.status(401).json({ error: 'Unauthorized, token missing or invalid' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key') as UserPayload;
    (req as any).user = decoded; // Set `user` on `req`
    console.log('Decoded Token:', decoded);
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
};
