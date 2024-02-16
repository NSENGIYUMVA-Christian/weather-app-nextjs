const express = require("express");

const app = express();

//port
const port = 8080;

app.get("/", (req, res) => {
  res.send("testing whether");
});

app.listen(port, () => console.log(`server is listening to port ${port}...`));
