const controller = require("../controllers/controller")
const express = require("express")
const Authcontroller = require("../controllers/Authcontroller")
const authenticateToken = require("../config/authenticate")

const route = express.Router()

route.post("/register", Authcontroller.register);

route.post("/login", Authcontroller.login);

route.post("/refresh", Authcontroller.refresh);

route.post("/logout", authenticateToken, Authcontroller.logout);

route.get("/user-detail", authenticateToken ,controller.getUserDetail)

route.get("/posts", controller.getPosts)


module.exports = route