const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  /// check header
  const authHeader = req.headers.authorization;
  //// if there is no header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authentication invalid");
    throw new Error("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = isTokenValid({ token });
    //destructuring payload
    const { id, first_name, last_name, email, username } = payload;
    req.user = { id, first_name, last_name, email, username };
    next();
  } catch (error) {
    console.log("Authentication invalid");
    throw new Error("Authentication invalid");
  }
};

module.exports = {
  authenticateUser,
};
