const express = require("express");
const route = express.Router();
const TradingController = require("../controllers/TradingController")
const stock_market_controller=require("../controllers/stock_marketDataController")
route.post("/buy",TradingController.BuyStock)
route.post("/sell",TradingController.SellStock)
route.get("/orders",TradingController.getOrders)
route.get("/orders/:id",TradingController.getOrderDetails)
route.post("/balance",TradingController.checkBalanceAfterSale)
route.post("/access",TradingController.get_access)
route.post("/get_and_update_order_status/:id",TradingController.get_and_update_order_status)
route.post("/assets",TradingController.getAllAssets)
route.post("/stocks",stock_market_controller.stock_market_data)
module.exports=route