const express = require("express");
const route = express.Router();
const TradingController = require("../Controllers/TradingController")
route.post("/buy",TradingController.BuyStock)
route.post("/sell",TradingController.SellStock)
module.exports=route