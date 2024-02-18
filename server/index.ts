// const express = require("express");
// const cors = require("cors");

// const app = express();

// //port
// const port = 8080;

// /// middle ware to allow cors
// app.use(cors());

// app.get("/", (req, res) => {
//   res.json({ success: true, msg: "testing whether" });
// });

// app.listen(port, () => console.log(`server is listening to port ${port}...`));

////////testing
console.log("hello you");

const addNumber = (a:number,b:number)=>{
  return a + b
}

console.log("answer is",addNumber(1,3))


