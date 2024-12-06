const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = {
  // Generate Token
  generateToken: (user) => {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );
  },

  // Verify Token Middleware
  verifyToken: (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
      }

      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to the request object
      next(); // Pass control to the next middleware or route handler
    } catch (err) {
      res.status(401).json({
        error: "Invalid or expired token",
        details: err.message, // Provide more error details for debugging
      });
    }
  },

  // Role Authorization Middleware
  authorizeRoles: (...roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }
      next();
    };
  },
};

module.exports = authMiddleware;
