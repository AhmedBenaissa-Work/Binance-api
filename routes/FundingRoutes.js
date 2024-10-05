const express = require("express");
const route = express.Router();
const FundingController = require("../Controllers/FundingController")
route.post("/create_account",FundingController.create_funding_account)
route.post("/transfer_funds",FundingController.transfer_funds)

module.exports=route