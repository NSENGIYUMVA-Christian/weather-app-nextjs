const bcrypt = require("bcrypt");
const pool = require("../dbConfig");
const {
  getUserByUserName,
  addUserByAllValues,
} = require("../queries/authQueries");
const { createJWT } = require("../utils/jwt");
const { createTokenUSer } = require("../utils/createTokenUser");
const { getUserByID } = require("../queries/users");

// Register
const register = async (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;

  if (!first_name || !last_name || !email || !username || !password) {
    return res.json({ msg: "Please fill all fields" });
  }

  if (password.length < 5) {
    return res.json({ msg: "Password must be at least 5 characters" });
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

          return res.json({ msg: "Registration successful", success: true });
        }
      );
    }
  });
};

/// update user
const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;
    if (password.length < 5) {
      return res.json({ msg: "Password must be at least 5 characters" });
    }
  } catch (error) {}
};

// Login
// const login = async (req, res) => {
//   const { username, password } = req.body;
//   let numberOfLoginTries = 0;
//   //// retrieve user from DB based on login form
//   pool.query(getUserByUserName, [username], (err, result) => {
//     if (err) {
//       console.error("Error retrieving user:", err);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     const user = result.rows[0];
//     const { id, first_name, last_name, email, username, isvalid } = user;
//     const tempUser = { id, first_name, last_name, email, username, isvalid };
//     /// if no user found
//     if (!user) {
//       return res.json({ msg: "User not found" });
//     }
//     //// compare password
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         console.error("Error comparing passwords:", err);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//       if (isMatch) {
//         // if everything is correct
//         // payload to send on token
//         const tokenUser = createTokenUSer(tempUser);
//         const token = createJWT({ payload: tokenUser });
//         return res.json({ msg: "Login successful", tempUser, token });
//       } else {
//         // increment number of tries by one
//         numberOfLoginTries++;
//         /// if user try to login in 3 or more than 3 times
//         if (numberOfLoginTries >= 3) {
//           /// block account
//           pool.query(getUserByID, [id], (err, response) => {
//             if (err) throw err;
//             //
//             return res.send("account is blocked");
//           });
//         }
//         return res.json({ msg: "Invalid credentials" });
//       }
//     });
//   });
// };

// Login
const login = async (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from DB based on login form
  pool.query(getUserByUserName, [username], (err, result) => {
    if (err) {
      console.error("Error retrieving user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const user = result.rows[0];

    // If no user found
    if (!user) {
      return res.json({ msg: "User not found" });
    }

    // Initialize or retrieve login attempts count
    let loginAttempts = user.login_attempts || 0;

    // If account is blocked
    if (user.is_blocked) {
      return res.json({
        msg: "Your Account has been blocked",
        isAccountBlocked: true,
        user,
      });
    }

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (isMatch) {
        // If login successful, reset login attempts
        loginAttempts = 0;

        // Update the database to reset login attempts count
        pool.query(
          "UPDATE users SET login_attempts = 0 WHERE id = $1",
          [user.id],
          (err, result) => {
            if (err) {
              console.error("Error updating login attempts:", err);
            }
          }
        );

        // Payload to send on token
        const { id, first_name, last_name, email, username, is_blocked } = user;

        const tempUser = {
          id,
          first_name,
          last_name,
          email,
          username,
          is_blocked,
        };
        const tokenUser = createTokenUSer(tempUser);
        const token = createJWT({ payload: tokenUser });
        return res.json({
          msg: "Login successful",
          tempUser,
          token,
          success: true,
        });
      } else {
        // If login fails, increment login attempts count
        loginAttempts++;

        // If login attempts exceed threshold (3 in this case)
        if (loginAttempts >= 3) {
          // Block the account
          pool.query(
            "UPDATE users SET is_blocked = true WHERE id = $1",
            [user.id],
            (err, result) => {
              if (err) {
                console.error("Error blocking account:", err);
              }
            }
          );
          return res.json({
            msg: "Account is blocked",
            isAccountBlocked: true,
          });
        } else {
          // Update the login attempts count in the database
          pool.query(
            "UPDATE users SET login_attempts = $1 WHERE id = $2",
            [loginAttempts, user.id],
            (err, result) => {
              if (err) {
                console.error("Error updating login attempts:", err);
              }
            }
          );
          return res.json({ msg: "Invalid credentials" });
        }
      }
    });
  });
};

module.exports = { login, register };
