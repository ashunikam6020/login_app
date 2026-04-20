const express = require("express");
const router = express.Router();
const authModel = require("../models/authModel");
const logger = require("../utils/logger");

// ✅ REGISTER
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  console.log("Register API hit:", req.body);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }

  authModel.registerUser(email, password, (err, result) => {
    if (err) {
      console.log("DB ERROR:", err); // 🔥 important
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Account created successfully"
    });
  });
});


// ✅ LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login API hit:", req.body);  

  logger.info("Login request received");

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }

  authModel.loginUser(email, password, (err, result) => {
    if (err) {
      logger.error("Database error: " + err);
      return res.status(500).json({ success: false });
    }

    if (result.length > 0) {
      logger.info("Login successful for " + email);

      return res.status(200).json({
        success: true,
        message: "Login successful"
      });
    } else {
      logger.warn("Invalid login attempt: " + email);

      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
  });
});

module.exports = router;