// Update with your config settings.
require('dotenv').config()
const pg = require('pg')

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}


module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DEV_DATABASE_URL,
    migrations: {
        directory: './data/migrations'
    },
    seeds:{
        directory: './data/seeds'
    },
    // pool: {
    //     afterCreate: (conn, done) => {
    //       conn.run('PRAGMA foreign_keys = ON', done)
    //     },
    // }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds:{
      directory: './data/seeds'
    },
  }

};
