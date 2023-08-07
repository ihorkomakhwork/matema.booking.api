"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controllers/User.controller");
const router = express_1.Router();
router.get(`/`, User_controller_1.getUsersByRole);
router.patch(`/:userId`, User_controller_1.changeUserRole);
exports.default = router;
//# sourceMappingURL=users.js.map