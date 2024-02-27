require("dotenv").config();

const jwt = require("jsonwebtoken");
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: process.env.jwtLife,
  });
  return token;
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.jwtSecret);
};

module.exports = { createJWT, isTokenValid };
