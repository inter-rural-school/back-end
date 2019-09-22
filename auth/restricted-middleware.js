const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if (err) {
        res.status(400).json({ message: "Invalid request" });
      } else {
        req.user = { username: decodeToken };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Login in to access" });
  }
};