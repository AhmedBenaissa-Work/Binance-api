const Alpaca = require('@alpacahq/alpaca-trade-api');
const env = require("dotenv");
env.config();
// Set up your API credentials

// Check account information
const axios = require('axios');

const BuyStock = async(req,res)=>{
  const payload  = {
    method: 'POST',
    url: 'https://paper-api.alpaca.markets/v2/orders',
    headers: {
      'APCA-API-KEY-ID': process.env.api_key,
      'APCA-API-SECRET-KEY': process.env.api_secret,
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    data: {
      side: 'buy',
      type: 'market',
      time_in_force: 'day',
      symbol: req.body.symbol,
      qty: req.body.quantity
    }
  };
  axios.request(payload).then(response => {
    res.json(response.data);
  }).catch(error => {
    res.status(400).send(`Transaction failed:`,error);;
  });
}
const SellStock= async (req,res)=>{
    const payload  = {
        method: 'POST',
        url: 'https://paper-api.alpaca.markets/v2/orders',
        headers: {
          'APCA-API-KEY-ID': process.env.api_key,
          'APCA-API-SECRET-KEY': process.env.api_secret,
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        data: {
          side: 'sell',
          type: 'market',
          time_in_force: 'gtc',
          symbol: req.body.symbol,
          qty: req.body.quantity
        }
      };
      axios.request(payload).then(response => {
        res.json(response.data);
      }).catch(error => {
        res.status(400).send(`Transaction failed: ${error.message}`)
      });    
}
module.exports = {
    BuyStock,SellStock
}


