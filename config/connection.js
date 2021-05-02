require('dotenv').config();

const connectionDB = {
    host: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employee_db',
    port: 3318,
};

module.exports = connectionDB;
