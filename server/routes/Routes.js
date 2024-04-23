const express = require("express");
const { addUser, getUsers } = require("../controllers/user-controller");
const { getOnlineUsers } = require("../controllers/socket-controller");
const routes = express.Router();

routes.post("/user", addUser);
routes.get("/user", getUsers);
routes.get("/onlineusers", getOnlineUsers);
routes.get("/", (req, res) => {
  res.send(process.env.CLIENT_URL);
});

module.exports = {
  routes,
};
