const db = require("../config/db");

// ✅ FORMAT DATE TO MYSQL (YYYY-MM-DD)
const formatDate = (inputDate) => {
  const d = new Date(inputDate);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// ✅ INSERT
const addMilkEntry = (data, callback) => {
  console.log("📥 Incoming Milk Data:", data); // ✅ DEBUG

  const {
    farmerId,
    name,
    ltr,
    fat,
    snf,
    rate,
    total,
    type,
    date
  } = data;

  const sql = `
    INSERT INTO milk_entries
    (farmer_id, name, ltr, fat, snf, rate, total, type, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    farmerId ? Number(farmerId) : null,  // ✅ FORCE NUMBER
    name || null,
    ltr || 0,
    fat || 0,
    snf || 0,
    rate || 0,
    total || 0,
    type || "cow",
    formatDate(date)
  ];

  db.query(sql, values, callback);
};
// ✅ GET
const getMilkEntries = (callback) => {
  const sql = `
    SELECT 
      id,
      farmer_id,
      name,
      ltr,
      fat,
      snf,
      rate,
      total,
      type,
      date
    FROM milk_entries
    ORDER BY id DESC
  `;
  db.query(sql, callback);
};
exports.getMilk = (req, res) => {
  const sql = `
    SELECT 
      m.*,
      f.first_name
    FROM milk_entries m
    JOIN farmers f 
    ON m.farmer_id = f.farmer_id
    ORDER BY m.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json({
      success: true,
      data: result
    });
  });
};
module.exports = {
  addMilkEntry,
  getMilkEntries,
};