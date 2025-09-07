const controller = require("../controllers/controller")
const express = require("express")
const route = express.Router()

route.get("/user-detail" ,controller.getUserDetail)

module.exports = route