import { Router } from 'express';
import { getAllMarks, getStudentMarks, addMarks } from '../controllers/marksController.js';

const router = Router();

router.get('/',               getAllMarks);
router.get('/:studentId',     getStudentMarks);
router.post('/',              addMarks);

export default router;
