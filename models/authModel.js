const db = require("../config/db");

// ✅ Register user
const registerUser = (email, password, callback) => {
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], callback);
};

// ✅ Login user
const loginUser = (email, password, callback) => {
  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], callback);
};

module.exports = {
  registerUser,
  loginUser
};