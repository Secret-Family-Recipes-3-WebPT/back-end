// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './recipe_user_table.db3'
    },
    migrations: {
        directory: './migrations'
      }
    ,pool: {
        afterCreate: (conn, done) => {
          conn.run('PRAGMA foreign_keys = ON', done)
        },
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
