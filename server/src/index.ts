const express = require("express");
const cors = require("cors");
const app = express();

/////////// app types and interface
type resAndReqType = {
  req:any,
  res:any
}

//port
const port = process.env.PORT || 8080;

/// middle ware to allow cors
app.use(cors());

app.get("/", ({req, res}:resAndReqType) => {
  res.json({ success: true, msg: "testing whether" });
});
// login
app.get("/users/login", ({req, res}:resAndReqType) => {
  res.json({ success: true, msg: "login" });
});
// register
app.get("/users/register", ({req, res}:resAndReqType) => {
  res.json({ success: true, msg: "register" });
});
// dashboard
app.get("/users/dashboard", ({req, res}:resAndReqType) => {
  res.json({ success: true, msg: "dashboard" });
});

app.listen(port, () => console.log(`the server is listening to port ${port}...`));





