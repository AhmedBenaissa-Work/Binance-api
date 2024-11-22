const express = require("express");
const route = express.Router();
const accountsController = require("../Controllers/AccountsController")
route.post("/create_account",accountsController.createAccount)
route.post("/login",accountsController.Login)
route.post("/get_cookie_data",accountsController.getAccountDataFromCookie)

module.exports=route