const express = require("express");
const route = express.Router();
const accountsController = require("../controllers/AccountsController")
route.post("/create_account",accountsController.createAccount)
route.post("/login",accountsController.Login)
route.post("/get_cookie_data",accountsController.getAccountDataFromCookie)
route.post("/confirm_account",accountsController.ConfirmAccount)
route.post("/confirm_account_creation",accountsController.confirm_account_creation)
//http://localhost:8000/api/accounts/confirm_account_creation
module.exports=route