const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ashu6020",
  database: "login_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;