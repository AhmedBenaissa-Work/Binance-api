const express = require("express");
const route = express.Router();
const FundingController = require("../controllers/FundingController")

route.post("/balance",FundingController.Get_Balance)

module.exports=route