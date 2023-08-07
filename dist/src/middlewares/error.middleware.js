"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errorHandlerMiddleware = (err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({ message: err.message });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=error.middleware.js.map