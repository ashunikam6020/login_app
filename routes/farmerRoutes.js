const express = require("express");
const router = express.Router();
const farmerModel = require("../models/farmerModel");


// ✅ ADD FARMER
// ✅ ADD FARMER (WITH DUPLICATE CHECK RESPONSE)
router.post("/farmers", (req, res) => {

  farmerModel.addFarmer(req.body, (err, result) => {

    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "Error inserting farmer"
      });
    }

    res.status(201).json({
      success: true,
      message: "Farmer added successfully"
    });
  });

});
// ✅ GET FARMERS
router.get("/farmers", (req, res) => {
  farmerModel.getFarmers((err, result) => {
    if (err) {
      console.log("❌ DB ERROR:", err);
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      data: result
    });
  });
});


// ✅ DELETE FARMER
router.delete("/farmers/:id", (req, res) => {
  const { id } = req.params;

  farmerModel.deleteFarmer(id, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      message: "Farmer deleted"
    });
  });
});

module.exports = router;