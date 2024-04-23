const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Connection } = require("./database/db");
const { routes } = require("./routes/Routes");
const { Server } = require("socket.io");
const { handleSocket } = require("./controllers/socket-controller");
const app = express();
const port = 3001;
require("dotenv").config();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://whatsapp-web-client-phi.vercel.app",
    ],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

Connection(
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_URL,
  process.env.DB_NAME
);

app.use("/", routes);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", handleSocket);
