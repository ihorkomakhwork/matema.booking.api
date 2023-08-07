"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.config();
const payload = {
    iss: process.env.API_KEY,
    exp: (new Date()).getTime() + 5000
};
class AuthToken {
    constructor() {
        this.token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjRGN2txU1Q1VFFXOHJhUXc0bFBFd3ciLCJleHAiOjE2MzQxMjI4MDAsImlhdCI6MTYzMTUyNzIyNn0.XW0PwH_-8bhh4_A0WMto5dgg-pqNZdapOebGtbo6tBM";
        if (typeof AuthToken.instance === 'object') {
            return AuthToken.instance;
        }
        try {
            this.token = jsonwebtoken_1.sign(payload, process.env.API_SECRET, {
                algorithm: "HS256"
            });
        }
        catch (error) {
            console.log(error);
        }
        AuthToken.instance = this;
        return AuthToken.instance;
    }
    getToken() {
        return this.token;
    }
}
exports.default = AuthToken;
//# sourceMappingURL=ZoomApiHelper.js.map