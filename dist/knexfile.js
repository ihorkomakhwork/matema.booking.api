"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
require('dotenv').config();
const development = {
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || '5438',
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DB || 'postgres',
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        directory: './src/db/migrations',
    },
    seeds: {
        directory: './src/db/seeds',
    },
};
exports.default = development;
//# sourceMappingURL=knexfile.js.map