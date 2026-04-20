const express = require("express");
const router = express.Router();
const milkModel = require("../models/milkModel");


// ✅ ADD MILK ENTRY
router.post("/milk-entry", (req, res) => {

  console.log("Milk Entry:", req.body);

  milkModel.addMilkEntry(req.body, (err, result) => {

    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    console.log("✅ Data inserted successfully");

    res.status(201).json({
      success: true,
      message: "Milk entry saved"
    });
  });
});


// ✅ GET ALL MILK ENTRIES (IMPORTANT FOR UI)
router.get("/milk-entry", (req, res) => {

  milkModel.getMilkEntries((err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      data: result
    });
  });
});


module.exports = router;