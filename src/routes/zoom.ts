import { Router } from 'express';
import { createMeet, get_meet } from '../controllers/ZoomApi.controller';

const router = Router();

router.post('/create_meet', createMeet) 
router.post('/get_meet', get_meet)

export default router;