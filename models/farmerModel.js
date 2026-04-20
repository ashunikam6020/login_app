const db = require("../config/db");

// ✅ ADD FARMER
const addFarmer = (data, callback) => {
  console.log("📥 Incoming Farmer:", data);

  const {
    farmer_id,
    first_name,
    middle_name,
    last_name,
    phone_no,
    village,
    bank_account_no,
    ifsc_code,
    email_id
  } = data;

  // ✅ STEP 1: CHECK IF farmer_id EXISTS
  const checkSql = "SELECT * FROM farmers WHERE farmer_id = ?";

  db.query(checkSql, [farmer_id], (err, result) => {
    if (err) return callback(err);

    if (result.length > 0) {
      // ❌ ALREADY EXISTS
      return callback({
        message: "Farmer ID already exists"
      });
    }

    // ✅ STEP 2: INSERT IF NOT EXISTS
    const insertSql = `
      INSERT INTO farmers 
      (farmer_id, first_name, middle_name, last_name, phone_no, village, bank_account_no, ifsc_code, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      Number(farmer_id),
      first_name || null,
      middle_name || null,
      last_name || null,
      phone_no || null,
      village || null,
      bank_account_no || null,
      ifsc_code || null,
      email_id || null
    ];

    db.query(insertSql, values, callback);
  });
};
// ✅ GET FARMERS
const getFarmers = (callback) => {
  const sql = `
    SELECT 
      id,
      farmer_Id AS farmer_id,   -- ✅ FIX HERE
      first_name,
      middle_name,
      last_name,
      phone_no,
      village,
      bank_account_no,
      ifsc_code,
      email_id
    FROM farmers
    ORDER BY id DESC
  `;

  db.query(sql, callback);
};

// ✅ DELETE FARMER
const deleteFarmer = (id, callback) => {
  const sql = "DELETE FROM farmers WHERE farmer_id=?";
  db.query(sql, [id], callback);
};

module.exports = {
  addFarmer,
  getFarmers,
  deleteFarmer
};