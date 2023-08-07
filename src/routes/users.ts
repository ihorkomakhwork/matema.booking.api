import { Router } from 'express';
import {getUsersByRole, changeUserRole} from '../controllers/User.controller';

const router = Router();

router.get(`/`, getUsersByRole);
router.patch(`/:userId`, changeUserRole);

export default router;