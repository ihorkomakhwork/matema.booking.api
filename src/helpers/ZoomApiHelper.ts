import { config } from 'dotenv'
import { sign } from 'jsonwebtoken';

config()

const payload = {
    iss: process.env.API_KEY,
    exp: (new Date()).getTime() + 5000
};

class AuthToken {
    token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjRGN2txU1Q1VFFXOHJhUXc0bFBFd3ciLCJleHAiOjE2MzQxMjI4MDAsImlhdCI6MTYzMTUyNzIyNn0.XW0PwH_-8bhh4_A0WMto5dgg-pqNZdapOebGtbo6tBM"
    static instance: AuthToken;

    constructor() {
        if (typeof AuthToken.instance === 'object') {
            return AuthToken.instance
        }
        try {
            this.token = sign(payload, process.env.API_SECRET as string, {
                algorithm: "HS256"
            });
        } catch (error) {
            console.log(error);
        }
        AuthToken.instance = this
        return AuthToken.instance
    }

    getToken() {
        return this.token
    }
}

export default AuthToken;

