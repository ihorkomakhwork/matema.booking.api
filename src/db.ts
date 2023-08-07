
import {ConnectionOptions} from 'typeorm';

require('dotenv').config();

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgers',
    database: process.env.POSTGRES_DB || 'postgres',
    entities: ['dist/src/entity/**/*.js'],
    synchronize: true
};

export default config;
