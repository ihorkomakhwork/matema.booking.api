"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenHandlerMiddleware = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
const tokenHandlerMiddleware = async (req, res, next) => {
    var _a, _b;
    if (req.headers.authorization === process.env.TOKEN ||
        ((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.application_token) === process.env.BITRIX_TOKEN_WEBHOOK) {
        next();
    }
    else {
        res.status(403).json({ message: 'Доступ до даного матеріалу заблоковано' }).send();
    }
};
exports.tokenHandlerMiddleware = tokenHandlerMiddleware;
//# sourceMappingURL=token.middleware.js.map