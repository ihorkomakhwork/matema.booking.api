"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserRole = exports.getUsersByRole = void 0;
const knex_1 = __importDefault(require("../db/knex"));
const getUsersByRole = async (req, res) => {
    try {
        const telegramUserId = req.headers['x-user-id'];
        const role = req.query.roleId;
        const resSuperUser = await knex_1.default('users').select('isSuperUser').where('telegramId', telegramUserId);
        if (!resSuperUser[0].isSuperUser)
            return res.status(403).json({ message: `Request forbidden` });
        const result = await knex_1.default('users').where('role', role);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return error;
    }
};
exports.getUsersByRole = getUsersByRole;
const changeUserRole = async (req, res) => {
    try {
        const userId = req.params.userId;
        const role = req.body.roleId;
        await knex_1.default('users')
            .where('id', '=', userId)
            .update({ role: role });
        return res.status(200).json({ message: `Role for user ${userId} has been changed to ${role}` });
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return error;
    }
};
exports.changeUserRole = changeUserRole;
//# sourceMappingURL=User.controller.js.map