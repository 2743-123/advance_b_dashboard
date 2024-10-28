import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { promoteToAdmin } from '../controllers/superadminController';

const router = Router();

// Superadmin-only routes
router.put('/promote/:id', authMiddleware, roleMiddleware(['superadmin']), promoteToAdmin);

export default router;
