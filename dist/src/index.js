"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const token_middleware_1 = require("./middlewares/token.middleware");
const clients_1 = __importDefault(require("./routes/clients"));
const lessons_1 = __importDefault(require("./routes/lessons"));
const students_1 = __importDefault(require("./routes/students"));
const teachers_1 = __importDefault(require("./routes/teachers"));
const bitrix_1 = __importDefault(require("./routes/bitrix"));
const zoom_1 = __importDefault(require("./routes/zoom"));
const google_1 = __importDefault(require("./routes/google"));
const users_1 = __importDefault(require("./routes/users"));
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors());
async function start() {
    try {
        app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
start();
app.use(token_middleware_1.tokenHandlerMiddleware);
app.use('/clients', clients_1.default);
app.use('/students', students_1.default);
app.use('/users', users_1.default);
app.use('/teachers', teachers_1.default);
app.use('/lessons', lessons_1.default);
app.use('/bitrix', bitrix_1.default);
app.use('/zoom', zoom_1.default);
app.use('/google', google_1.default);
app.use(error_middleware_1.errorHandlerMiddleware);
app.use((req, _res, next) => {
    if (req.method !== 'GET') {
        next(http_errors_1.default(405));
        return;
    }
    next(http_errors_1.default(404));
});
//# sourceMappingURL=index.js.map