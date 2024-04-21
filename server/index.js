const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());

app.post("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
