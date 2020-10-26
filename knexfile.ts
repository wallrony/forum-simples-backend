// Importação de bibliotecas externas.
import path from 'path';
require('dotenv-safe').config();

/* Definindo a exportação de configurações da
 * biblioteca Knex.
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      ssl: true
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'data', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'data', 'database', 'seeds'),
    },
    useNullAsDefault: true,
  }
};