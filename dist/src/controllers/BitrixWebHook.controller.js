"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDataFromBitrix = exports.bitrixEvent = void 0;
const knex_1 = __importDefault(require("../db/knex"));
const CRMEventEnum_1 = require("../enums/CRMEventEnum");
const BitrixHelper_1 = require("../helpers/BitrixHelper");
require('dotenv').config();
const bitrixToken = process.env.BITRIX_TOKEN_WEBHOOK || '3nfb1rccdksgd51oxa28wiz9ybwbjrt1';
const bitrixEvent = async (req, res) => {
    try {
        const { application_token } = req.body.auth;
        if ((application_token === null || application_token === void 0 ? void 0 : application_token.toString()) !== bitrixToken) {
            return res.status(401).send();
        }
        const { event, data } = req.body;
        const bitrixFieldsId = data.FIELDS.ID;
        switch (event) {
            case CRMEventEnum_1.CRMEvent.addContact:
                await BitrixHelper_1.addContact(bitrixFieldsId);
                break;
            case CRMEventEnum_1.CRMEvent.deleteContact:
                // because we don't know contact type, we need to search on teacher, students, clients table
                await knex_1.default('clients').where('id', bitrixFieldsId).del();
                await knex_1.default('teachers').where('id', bitrixFieldsId).del();
                break;
            case CRMEventEnum_1.CRMEvent.updateContact:
                // const dataFromBitrix = await currentDataById(bitrixApiLink, bitrixFieldsId);
                await BitrixHelper_1.updateContact(bitrixFieldsId);
                break;
            case CRMEventEnum_1.CRMEvent.addDeal:
                await BitrixHelper_1.addDeal(bitrixFieldsId);
                break;
            case CRMEventEnum_1.CRMEvent.deleteDeal:
                await knex_1.default('students').where('id', bitrixFieldsId).del();
                break;
            case CRMEventEnum_1.CRMEvent.updateDeal:
                await BitrixHelper_1.updateDeal(bitrixFieldsId);
                break;
            default:
                res.status(404).send(`Status ${event} not supported`);
                break;
        }
        return res.status(200).send();
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(404).send(error);
    }
};
exports.bitrixEvent = bitrixEvent;
const copyDataFromBitrix = async (req, res) => {
    try {
        await BitrixHelper_1.seedDB();
        return res.status(200).send('Data copied');
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(404).send(error);
    }
};
exports.copyDataFromBitrix = copyDataFromBitrix;
//# sourceMappingURL=BitrixWebHook.controller.js.map