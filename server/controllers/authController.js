const bcrypt = require("bcrypt");
const pool = require("../dbConfig");
const {
  getUserByUserName,
  addUserByAllValues,
} = require("../queries/authQueries");

const { createJWT } = require("../utils/jwt");
const { createTokenUSer } = require("../utils/createTokenUser");
const { getUserByID, updateUserDB } = require("../queries/users");

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
// Update user
// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, username, password } = req.body;

    // Check if password is provided and meets minimum length requirement
    if (password && password.length < 5) {
      return res
        .status(400)
        .json({ error: "Password must be at least 5 characters" });
    }

    // Check if the user exists
    const existingUser = await pool.query(getUserByID, [id]);
    if (existingUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the new username already exists in the database
    if (username !== existingUser.rows[0].username) {
      const usernameExists = await pool.query(getUserByUserName, [username]);
      if (usernameExists.rows.length > 0) {
        return res.json({ msg: "Username already exists" });
      }
    }

    // Hash the password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user information
    const updateUserQuery = `
      UPDATE users
      SET 
        first_name = $1,
        last_name = $2,
        email = $3,
        username = $4
        ${
          password ? ", password = $5" : ""
        }  -- Only include password update if provided
      WHERE 
        id = $${
          password ? "6" : "5"
        }  -- Adjust the parameter index based on password presence
      RETURNING *;  -- Return all updated columns
    `;

    const updateUserValues = password
      ? [first_name, last_name, email, username, hashedPassword, id]
      : [first_name, last_name, email, username, id];

    const updatedUser = await pool.query(updateUserQuery, updateUserValues);
    const updateData = updatedUser.rows[0];
    delete updateData.password;
    return res.status(200).json({
      success: true,
      msg: "User updated successfully",
      user: updateData,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

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
        const {
          id,
          first_name,
          last_name,
          email,
          username,
          is_blocked,
          img_url,
        } = user;

        const tempUser = {
          id,
          first_name,
          last_name,
          email,
          username,
          is_blocked,
          img_url,
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

module.exports = { login, register, updateUser };
