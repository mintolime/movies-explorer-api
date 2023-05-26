require('dotenv').config();

const {
  NODE_ENV, PORT, JWT_SECRET, CONNECT,
} = process.env;

module.exports = {
  NODE_ENV: NODE_ENV || 'development',
  PORT: PORT || 3000,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY',
  CONNECT_DB_PATH: CONNECT || 'mongodb://127.0.0.1:27017/bitfilmsdb',
};
