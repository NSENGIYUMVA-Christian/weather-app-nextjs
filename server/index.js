require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
///// routers imports
const authRouter = require("./routers/authRouter");

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
  res.send("testing success");
});
/// auth route middleware
app.use("/api/v1/auth", authRouter);

app.listen(port, () =>
  console.log(`The server is listening to port ${port}...`)
);
