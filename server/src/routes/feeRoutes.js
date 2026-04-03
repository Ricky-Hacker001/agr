import { Router } from 'express';
import { getAllFees, updateFee } from '../controllers/feeController.js';

const router = Router();

router.get('/',  getAllFees);
router.put('/',  updateFee);

export default router;
