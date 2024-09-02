const Alpaca = require('@alpacahq/alpaca-trade-api');
const env = require("dotenv");
env.config();
// Set up your API credentials

// Check account information
const axios = require('axios');

const options = {
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
    symbol: 'AAPL',
    qty: '2'
  }
};

axios.request(options).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
