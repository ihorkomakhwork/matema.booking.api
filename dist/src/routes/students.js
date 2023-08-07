"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Student_controller_1 = require("../controllers/Student.controller");
const router = express_1.Router();
router.post('/create', Student_controller_1.createStudent);
router.delete('/deleteStudent', Student_controller_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=students.js.map