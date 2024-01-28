const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Signup endpoint
router.post("/signup", authController.signup);

// Login endpoint
router.post("/login", authController.login);

module.exports = router;
