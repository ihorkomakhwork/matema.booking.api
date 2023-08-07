import {Router} from 'express';
// import { Teacher } from '../entity/Teacher';
import {getTeachersByLastName, getTeachers, getTeachersFreeSlots} from "../controllers/Teacher.controller";
//
const router = Router();
//
router.get('/', getTeachers);
// router.delete('/', deleteTeacher);
//
router.get('/getTeachersByLastName', async (_req, res, next) => {
    await getTeachersByLastName(_req, res);
});

router.get('/:teacherId/schedule', async (_req, res, next) => {
    await getTeachersFreeSlots(_req, res);
});

export default router;

