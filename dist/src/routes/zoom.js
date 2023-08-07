"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ZoomApi_controller_1 = require("../controllers/ZoomApi.controller");
const router = express_1.Router();
router.post('/create_meet', ZoomApi_controller_1.createMeet);
router.post('/get_meet', ZoomApi_controller_1.get_meet);
exports.default = router;
//# sourceMappingURL=zoom.js.map