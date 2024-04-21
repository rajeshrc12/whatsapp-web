const express = require("express");
const { addUser } = require("../controllers/user-controller");
const { getOnlineUsers } = require("../controllers/socket-controller");
const routes = express.Router();

routes.post("/user", addUser);
routes.get("/onlineusers", getOnlineUsers);

module.exports = {
  routes,
};
