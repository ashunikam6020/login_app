const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/milk-entry", (req, res) => 
{
  const 
  {
    agentId,
    name,
    can,
    ltr,
    fat,
    snf,
    rate,
    total,
    type,
    date
  } = req.body;

  console.log("Milk Entry:", req.body);

  db.query(
    "INSERT INTO milk_entries (agentId,name,can,ltr,fat,snf,rate,total,type,date) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [agentId, name, can, ltr, fat, snf, rate, total, type, date],
    (err, result) => 
    {
      if (err) {
        console.log("DB Error:", err);
        return res.json({
          success: false,
          message: "Database error"
        });
      }

      res.json({
        success: true,
        message: "Milk entry saved"
      });
      console.log("Milk entry saved:", result); 
    }
  );
});

module.exports = router;