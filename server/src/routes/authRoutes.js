import { Router } from 'express';
import { parentLogin, adminLogin } from '../controllers/authController.js';

const router = Router();

router.post('/parent-login', parentLogin);
router.post('/admin-login', adminLogin);

export default router;
