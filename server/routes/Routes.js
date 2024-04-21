const express = require("express");
const { addUser } = require("../controllers/user-controller");
const routes = express.Router();

routes.post("/user", addUser);

module.exports = {
  routes,
};
