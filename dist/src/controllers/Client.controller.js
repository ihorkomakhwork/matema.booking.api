"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientByTel = exports.createClient = void 0;
const validator_1 = __importDefault(require("validator"));
const knex_1 = __importDefault(require("../db/knex"));
const createClient = async (req, res, next) => {
    try {
        const { name, last_name, second_name, phones, emails, role } = req.body;
        const newClient = await knex_1.default('clients').insert({
            name,
            last_name,
            second_name,
            role,
            emails,
            phones
        });
        return res.status(201).json(newClient);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
exports.createClient = createClient;
//
// export const deleteClient = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response> => {
//   try {
//     const result = await getRepository(Client).delete(req.params.id);
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(404).send(`Information not Found with This Id, ${error}`);
//   }
// };
//
const getClientByTel = async (req, res, next) => {
    try {
        const { phone } = req.params;
        if (!validator_1.default.isMobilePhone(phone, 'any', {
            strictMode: true,
        })) {
            throw new Error('Inavalid telphone number');
        }
        const result = await knex_1.default('clients').whereRaw('? = any(phones)', [
            phone,
        ]);
        return res.status(200).send(result);
    }
    catch (error) {
        return res
            .status(404)
            .send(`Information not Found with This phone number, ${error}`);
    }
};
exports.getClientByTel = getClientByTel;
//# sourceMappingURL=Client.controller.js.map