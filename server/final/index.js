"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
//port
const port = process.env.PORT || 8080;
/// middle ware to allow cors
app.use(cors());
app.get("/", ({ req, res }) => {
    res.json({ success: true, msg: "testing whether" });
});
// login
app.get("/users/login", ({ req, res }) => {
    res.json({ success: true, msg: "login" });
});
// register
app.get("/users/register", ({ req, res }) => {
    res.json({ success: true, msg: "register" });
});
// dashboard
app.get("/users/dashboard", ({ req, res }) => {
    res.json({ success: true, msg: "dashboard" });
});
app.listen(port, () => console.log(`the server is listening to port ${port}...`));
