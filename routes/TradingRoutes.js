const express = require("express");
const route = express.Router();
const TradingController = require("../Controllers/TradingController")
route.post("/buy",TradingController.BuyStock)
route.post("/sell",TradingController.SellStock)
route.get("/orders",TradingController.getOrders)
route.get("/orders/:id",TradingController.getOrderDetails)
route.post("/balance",TradingController.checkBalanceAfterSale)
module.exports=route