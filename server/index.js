const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(bodyParser.json());

app.use("/", (req, res) => {
  res.send(`Server listening on port ${port}`);
});

app.post("/", (req, res) => {
  res.send(`from server ${JSON.stringify(req.body)}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
