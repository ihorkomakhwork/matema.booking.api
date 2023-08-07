import { Router } from 'express';
import { deleteLesson, acceptLesson, cancelLesson, createLesson} from '../controllers/Lesson.controller';

const router = Router();

router.patch('/accept', acceptLesson)
router.patch('/cancel', cancelLesson)
router.post('/create', createLesson); 
router.delete('/delete',deleteLesson)


export default router;