import mysql from 'mysql2/promise';
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    // password: null,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
});

export default connection;
