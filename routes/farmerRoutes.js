const express = require("express");
const router = express.Router();
const db = require("../config/db");
const logger = require("../utils/logger");

router.post("/farmer", (req, res) => {
  const { name, village, phone } = req.body;

  logger.info(`Farmer Data: ${name} ${village} ${phone}`);

  db.query(
    "INSERT INTO farmers (name,village,phone) VALUES (?,?,?)",
    [name, village, phone],
    (err, result) => {
      if (err) {
        logger.error("Database error: " + err);
        return res.json({ success: false });
      }

      logger.info("Farmer added successfully");
      res.json({ success: true });
    }
  );
});

module.exports = router;