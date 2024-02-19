"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
// Port
const port = process.env.PORT || 8080;
/// type and interface
// interface ResponseData {
//   success?: boolean;
//   msg?: string;
// }
// Middleware to allow CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send(responseData);
});
// Login
app.get("/users/login", (req, res) => {
    res.json({ success: true, msg: "login" });
});
// Register
app.post("/users/register", (req, res) => {
    const { first_name, last_name, email, username, password } = req.body;
    /// check if all form data are entered
    if (!first_name || !last_name || !email || !username || !password) {
        res.send("Please fill all fields");
    }
    res.json({ success: true, msg: `${first_name} register` });
});
// Dashboard
app.get("/users/dashboard", (req, res) => {
    res.json({ success: true, msg: "dashboard" });
});
app.listen(port, () => console.log(`The server is listening to port ${port}...`));
