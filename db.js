const mysql = require('mysql2'); // db 연결 모듈 따로 뺀 경우
const dotenv = require('dotenv');

dotenv.config();

// .env로 민감한 데이터를 이동
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Promise 기반의 쿼리를 사용
const db = pool.promise();

module.exports = db;
