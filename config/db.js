const ssl = process.env.NODE_ENV === 'production';

const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: ssl ? { require: true, rejectUnauthorized: false } : false,
    },
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: ssl ? { require: true, rejectUnauthorized: false } : false,
      },
    },
};
