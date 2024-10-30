import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware'
import { getAllUsers, deleteUser } from '../controllers/adminController';

const router = Router();

// Admin-only routes
router.get('/users', authMiddleware, roleMiddleware(['admin', 'superadmin']), getAllUsers);
router.delete('/user/:id', authMiddleware, roleMiddleware(['admin', 'superadmin']), deleteUser);

export default router;
