if (!process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_NAME) {
  throw new Error('FATAL: Database configuration is missing. Check your .env file.');
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
};
