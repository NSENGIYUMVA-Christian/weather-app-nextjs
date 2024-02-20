const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const pool = require("./dbConfig");
const session = require("express-session");

// Port
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret1",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send(responseData);
});
// Login
app.post("/users/login", (req, res) => {
  res.json({ success: true, msg: "login" });
});

// Register
app.post("/users/register", async (req, res) => {
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
  pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username],
    (error, response) => {
      if (error) throw error; // Throw the error object itself, not a new instance
      // if username exist
      //console.log("res", response.rows);
      if (response.rows.length > 0) {
        return res.json({ msg: "username already exist " });
      } else {
        pool.query(
          `INSERT INTO users (first_name,last_name,email,username,password) VALUES ($1,$2,$3,$4,$5) RETURNING id,password`,
          [first_name, last_name, email, username, hashedPassword],
          (err, result) => {
            if (err) throw err;
            // if true
            console.log("result", result.rows);
            return res.json({ msg: "registered success" });
          }
        );
      }
      /// warning error
    }
  );
});

// Dashboard
app.get("/users/dashboard", (req, res) => {
  res.json({ success: true, msg: "dashboard" });
});
app.listen(port, () =>
  console.log(`The server is listening to port ${port}...`)
);
