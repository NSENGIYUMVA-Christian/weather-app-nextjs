const bcrypt = require("bcrypt");
const pool = require("../dbConfig");
const {
  getUserByUserName,
  addUserByAllValues,
} = require("../queries/authQueries");

// Register
const register = async (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;

  if (!first_name || !last_name || !email || !username || !password) {
    return res.send("Please fill all fields");
  }

  if (password.length < 5) {
    return res.send("Password must be at least 5 characters");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(getUserByUserName, [username], (error, response) => {
    if (error) {
      console.error("Error checking username existence:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (response.rows.length > 0) {
      return res.json({ msg: "Username already exists" });
    } else {
      pool.query(
        addUserByAllValues,
        [first_name, last_name, email, username, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error registering user:", err);
            return res.status(500).json({ error: "Internal server error" });
          }

          return res.json({ msg: "Registration successful" });
        }
      );
    }
  });
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  //// retrieve user from DB based on login form
  pool.query(getUserByUserName, [username], (err, result) => {
    if (err) {
      console.error("Error retrieving user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const user = result.rows[0];
    /// if no user found
    if (!user) {
      return res.json({ msg: "User not found" });
    }
    //// compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (isMatch) {
        return res.json({ msg: "Login successful" });
      } else {
        return res.json({ msg: "Invalid credentials" });
      }
    });
  });
};

module.exports = { login, register };
