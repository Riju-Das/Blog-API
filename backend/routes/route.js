const controller = require("../controllers/controller")
const express = require("express")
const Authcontroller = require("../controllers/Authcontroller")
const authenticateToken = require("../config/authenticate")

const route = express.Router()

app.post("/register", Authcontroller.register);

app.post("/login", Authcontroller.login);

app.post("/refresh", Authcontroller.refresh);

app.post("/logout", authenticateToken, Authcontroller.logout);

route.get("/user-detail", authenticateToken ,controller.getUserDetail)

module.exports = route