// auth/auth.js

const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, "secret_key", { expiresIn: "1h" });
};

module.exports = {
  generateToken,
};
