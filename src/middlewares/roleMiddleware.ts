import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.user?.role; // This should be set by the authMiddleware

  console.log('User Role:', userRole);
  console.log('Allowed Roles:', roles);

  if (userRole && roles.includes(userRole)) {
    next();
  } else {
    console.error('Access denied');
    res.status(403).json({ error: 'Access denied' });
  }
};
