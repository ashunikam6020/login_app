const express = require("express");
const router = express.Router();
const db = require("../config/db");
const logger = require("../utils/logger");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  logger.info("Login request received");

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        logger.error("Database error: " + err);
        return res.json({ success: false });
      }

      if (result.length > 0) {
        logger.info("Login successful for " + email);
        res.json({ success: true });
      } else {
        logger.warn("Invalid login attempt: " + email);
        res.json({ success: false });
      }
    }
  );
});

module.exports = router;