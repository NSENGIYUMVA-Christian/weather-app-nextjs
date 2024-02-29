const getUserByID = "SELECT * FROM users WHERE id = $1";
const uploadImageInDb =
  "UPDATE users SET img_url = $1,img_name = $2 WHERE id =$3 ";
const updateIsValid = `UPDATE users SET isValid = $1 WHERE id = $2`;
const updateUserDB = `UPDATE users
SET 
  first_name = $1,
  last_name = $2,
  email = $3,
  username = $4,
  password = $5
WHERE 
  id = $6`;

module.exports = {
  getUserByID,
  updateIsValid,
  updateUserDB,
  uploadImageInDb,
};
