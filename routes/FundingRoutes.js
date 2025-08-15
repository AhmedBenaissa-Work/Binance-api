const express = require("express");
const route = express.Router();

const FintechController = require("../controllers/FintechController")
route.post("/balance",FintechController.getUserBalance)
route.post('/deposit',FintechController.createGpaOrder)
route.post('/transaction',FintechController.transaction)
route.post('/create-payment-intent',FintechController.createStripePayment)
module.exports=route