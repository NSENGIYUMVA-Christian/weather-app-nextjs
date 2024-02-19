"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
//port
const port = 8080;
/// middle ware to allow cors
app.use(cors());
app.get("/", ({ req, res }) => {
    res.json({ success: true, msg: "testing whether" });
});
app.listen(port, () => console.log(`the server is listening to port ${port}...`));
