import { Router } from 'express';
import { signup }  from '../controllers/authController';
import { login } from '../controllers/authController';
 const router =Router();

router.post('/signup', signup);
router.post('/login', login);

export default router
