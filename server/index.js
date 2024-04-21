const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Connection } = require("./database/db");
const { routes } = require("./routes/Routes");

const app = express();
const port = 3001;

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());

Connection(
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_URL,
  process.env.DB_NAME
);

app.use("/", routes);

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
