const bcrypt = require("bcrypt");
const pool = require("../dbConfig");
const {
  getUserByUserName,
  addUserByAllValues,
} = require("../querries/authQuerries");

// Register
const register = async (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;
  /// check if all form data are entered
  if (!first_name || !last_name || !email || !username || !password) {
    return res.send("Please fill all fields");
  }
  // validate password
  if (password.length < 5) {
    return res.send("Password must me at least 5 characters");
  }
  ///// hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  /// check if user already exist in db
  pool.query(getUserByUserName, [username], (error, response) => {
    if (error) throw error; // Throw the error object itself, not a new instance
    // if username exist
    //console.log("res", response.rows);
    if (response.rows.length > 0) {
      return res.json({ msg: "username already exist " });
    } else {
      pool.query(
        addUserByAllValues,
        [first_name, last_name, email, username, hashedPassword],
        (err, result) => {
          if (err) throw err;
          // if true
          console.log("result", result.rows);
          return res.json({ msg: "registered success" });
        }
      );
    }
  });
};

// Login
const login = async (req, res) => {
  res.json({ success: true, msg: "login" });
};

module.exports = { login, register };
