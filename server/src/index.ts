const express = require("express");
const cors = require("cors");
const app = express();

/////////// app types and interface
type resAndReqType = {
  req:any,
  res:any
}

//port
const port = 8080;

/// middle ware to allow cors
app.use(cors());

app.get("/", ({req, res}:resAndReqType) => {
  res.json({ success: true, msg: "testing whether" });
});

app.listen(port, () => console.log(`the server is listening to port ${port}...`));





