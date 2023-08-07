require('dotenv').config();

const knex = require('knex')({
    client: process.env.DB_CLIENT || 'pg',
    connection: {
      host : process.env.POSTGRES_HOST || 'localhost',
      user : process.env.POSTGRES_USER || 'postgres',
      password : process.env.POSTGRES_PASSWORD || 'postgres',
      database : process.env.POSTGRES_DB || 'postgres',
      port : process.env.POSTGRES_PORT || '5438'
    }
  })


export default knex;
