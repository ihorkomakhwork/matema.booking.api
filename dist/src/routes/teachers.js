"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { Teacher } from '../entity/Teacher';
const Teacher_controller_1 = require("../controllers/Teacher.controller");
//
const router = express_1.Router();
//
router.get('/', Teacher_controller_1.getTeachers);
// router.delete('/', deleteTeacher);
//
router.get('/getTeachersByLastName', async (_req, res, next) => {
    await Teacher_controller_1.getTeachersByLastName(_req, res);
});
router.get('/:teacherId/schedule', async (_req, res, next) => {
    await Teacher_controller_1.getTeachersFreeSlots(_req, res);
});
exports.default = router;
//# sourceMappingURL=teachers.js.map