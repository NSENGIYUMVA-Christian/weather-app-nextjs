const getUserByUserName = "SELECT * FROM users WHERE username = $1";
const addUserByAllValues =
  "INSERT INTO users (first_name,last_name,email,username,password) VALUES ($1,$2,$3,$4,$5) RETURNING id,password";
module.exports = {
  getUserByUserName,
  addUserByAllValues,
};
