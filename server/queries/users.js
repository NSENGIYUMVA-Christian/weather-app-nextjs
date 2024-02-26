const getUserByID = "SELECT * FROM users WHERE id = $1";
const updateIsValid = `UPDATE users SET isValid = $1 WHERE id = $2`;

module.exports = {
  getUserByID,
  updateIsValid,
};
