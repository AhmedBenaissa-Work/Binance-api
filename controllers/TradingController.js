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
const getOrderDetails =  async(req,res)=>{
  try 
    {
     const BASE_URL = 'https://paper-api.alpaca.markets'; // Change to the live API URL for live trading
     const orderId = req.params.orderID;
     url=`${BASE_URL}/v2/orders/${orderId}`
     const response = await axios.get(url, {
      headers: {
        'APCA-API-KEY-ID': process.env.api_key,
        'APCA-API-SECRET-KEY': process.env.api_secret,
        'accept': 'application/json',
        'content-type': 'application/json'
      }
      });

     const orderData = response.data;
     const status = orderData.status;
     const qty = orderData.qty;
     const orderType = orderData.side;
     const price = orderData.filled_avg_price;
     res.send({'Status': status, 'Amount': price, 'Type': orderType ,"Quantity": qty});
    } 
    catch (error) 
    {
      res.status(400).send(`Transaction failed: ${error.message}`);
    }
}
const getOrders =  async(req,res)=>{
  try 
    {
   //  const BASE_URL = 'https://paper-api.alpaca.markets'; // Change to the live API URL for live trading
     
     url=`https://paper-api.alpaca.markets/v2/orders?status=all`
     const response = await axios.get(url, {
        headers: {
          'APCA-API-KEY-ID': process.env.api_key,
          'APCA-API-SECRET-KEY': process.env.api_secret,
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      });
      
      console.log(response)
      const mappedOrders = response.data.map(order => ({
        Id:order.id,
        symbol: order.symbol,
        submitted_at: order.submitted_at,
        price: order.filled_avg_price , // Assuming you might want to handle both limit and market orders
        quantity: order.qty,
        status: order.status,
        action: order.side,
        
      }));
      const filteredOrders = mappedOrders.filter(order => 
        order.status === 'filled'
      );
      res.send(filteredOrders)
    } 
    catch (error) 
    {
      res.status(400).send(`Transaction failed: ${error.message}`);
    }
}
const checkBalanceAfterSale = async(req,res)=>{
  
  url=`https://paper-api.alpaca.markets/v2/orders?status=all&symbols=${req.body.symbol}`
  const response = await axios.get(url, {
    headers: {
      'APCA-API-KEY-ID': process.env.api_key,
      'APCA-API-SECRET-KEY': process.env.api_secret,
      'accept': 'application/json',
      'content-type': 'application/json'
    }
   });
   try{
   const order_on_buy = response.data.filter(order => 
    
    order.side === "buy" && order.status==="filled"
    //&&
    //new Date(order.created_at) == new Date(req.body.timestamp)
);

 console.log(order_on_buy)
 let totalPrice_on_buy = 0;
    for (let order of order_on_buy) {
      totalPrice_on_buy += order.filled_avg_price * order.qty; // Assuming price is multiplied by quantity for total
    }
 const BASE_URL2 = 'https://paper-api.alpaca.markets'; // Change to the live API URL for live trading
     
 url2=`https://paper-api.alpaca.markets/v2/orders?status=all&symbols=${req.body.symbol}`
const response2 = await axios.get(url2, {
   headers: 
   {
    'APCA-API-KEY-ID': process.env.api_key,
    'APCA-API-SECRET-KEY': process.env.api_secret,
    'accept': 'application/json',
    'content-type': 'application/json'
  }
 });

   const order_on_sell=response2.data.filter(order => 
    order.status === "filled" &&
    order.side === "sell" )
    
    console.log(order_on_sell)
    let totalPrice_on_sell = 0;
       for (let order of order_on_sell) {
         totalPrice_on_sell += order.filled_avg_price * order.qty; // Assuming price is multiplied by quantity for total
       }
       console.log(totalPrice_on_buy,totalPrice_on_sell)
       res.send({"balance_after_trade":totalPrice_on_sell-totalPrice_on_buy})
    }catch(error){
          
            res.status(400).send(`Transaction failed: ${error.message}`);
          
    }
}
const decrease_on_buy = async(req,res)=>{
  
}
module.exports = {
    BuyStock,SellStock,getOrderDetails,checkBalanceAfterSale,getOrders
}


