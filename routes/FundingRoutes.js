const express = require("express");
const route = express.Router();
const FundingController = require("../Controllers/FundingController")

route.post("/balance",FundingController.Get_Balance)

module.exports=route