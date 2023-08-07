"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BitrixWebHook_controller_1 = require("../controllers/BitrixWebHook.controller");
const router = express_1.Router();
router.post(`/event`, BitrixWebHook_controller_1.bitrixEvent);
router.get(`/copyDataFromBitrix`, BitrixWebHook_controller_1.copyDataFromBitrix);
exports.default = router;
//# sourceMappingURL=bitrix.js.map