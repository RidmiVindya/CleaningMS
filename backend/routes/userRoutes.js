const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Register a new user (admin or customer)
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").isIn(["customer", "admin"]).withMessage("Role must be customer or admin"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { username, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password_hash: hashedPassword,
        role,
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ error: "Error creating user", details: err.message });
    }
  }
);

// Login route
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ error: "Invalid username or password" });

      const token = generateToken(user);
      res.status(200).json({ token, role: user.role });
    } catch (err) {
      res.status(500).json({ error: "Error logging in", details: err.message });
    }
  }
);

module.exports = router;
