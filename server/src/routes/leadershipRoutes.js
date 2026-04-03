import { Router } from 'express';
import { getLeaders, getLeaderById, createLeader, updateLeader, deleteLeader } from '../controllers/leadershipController.js';

const router = Router();

router.get('/',       getLeaders);
router.get('/:id',    getLeaderById);
router.post('/',      createLeader);
router.put('/:id',    updateLeader);
router.delete('/:id', deleteLeader);

export default router;
