require('dotenv').config();

const connectionDB = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db',
};

module.exports = connectionDB;
