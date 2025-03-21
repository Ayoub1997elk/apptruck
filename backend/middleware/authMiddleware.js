// Example in your auth middleware
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure this includes the role
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

const isHR = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ 
        error: "Authentication required",
        details: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.user || decoded.user.role !== 'hr_manager') {
      return res.status(403).json({ 
        error: "Access denied",
        details: "HR manager role required"
      });
    }

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ 
      error: "Authentication failed",
      details: err.message
    });
  }
};

module.exports = { verifyToken, isHR };