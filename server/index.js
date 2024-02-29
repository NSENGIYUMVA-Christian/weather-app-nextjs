require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const fileUpload = require("express-fileupload");
///// routers imports
const authRouter = require("./routers/authRouter");
const imageRouter = require("./routers/uploadRouter");

// Port
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("testing success");
});
/// auth route middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/image", imageRouter);

app.listen(port, () =>
  console.log(`The server is listening to port ${port}...`)
);
