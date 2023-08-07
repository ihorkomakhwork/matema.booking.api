"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Lesson_controller_1 = require("../controllers/Lesson.controller");
const router = express_1.Router();
router.patch('/accept', Lesson_controller_1.acceptLesson);
router.patch('/cancel', Lesson_controller_1.cancelLesson);
router.post('/create', Lesson_controller_1.createLesson);
router.delete('/delete', Lesson_controller_1.deleteLesson);
exports.default = router;
//# sourceMappingURL=lessons.js.map