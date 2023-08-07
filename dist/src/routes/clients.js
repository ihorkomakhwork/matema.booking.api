"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getConnection } from 'typeorm';
// import { Client } from '../entity/Client';
const Client_controller_1 = require("../controllers/Client.controller");
const router = express_1.Router();
router.post('/', Client_controller_1.createClient);
router.get('/:phone', Client_controller_1.getClientByTel);
exports.default = router;
//# sourceMappingURL=clients.js.map