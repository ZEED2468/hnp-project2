const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("Decoded token:", decoded)
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};
