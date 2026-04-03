import { Router } from 'express';
import { getAchievements, getAchievementById, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievementController.js';

const router = Router();

router.get('/',       getAchievements);
router.get('/:id',    getAchievementById);
router.post('/',      createAchievement);
router.put('/:id',    updateAchievement);
router.delete('/:id', deleteAchievement);

export default router;
