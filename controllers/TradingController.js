const Alpaca = require('@alpacahq/alpaca-trade-api');
const env = require("dotenv");
env.config();
// Set up your API credentials
const order = require("../Models/order")
const p2p = require("../Models/P2Ptransaction")
// Check account information
const axios = require('axios');
const get_access = async(req,res) =>{
     const crypto = require('crypto');
     const secret = crypto.randomBytes(64).toString('hex');
     const jwt = require("jsonwebtoken");
     const token = jwt.sign({
          id: req.body.account_id,
          address : req.body.wallet_address,
          balance : req.body.wallet_balance
           
        }, secret, { expiresIn: '1h' });
     res.send(token)
}
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
  const authToken = req.headers.authorization;
   const response = await axios.get('https://data.alpaca.markets/v2/stocks/'+req.body.symbol+'/trades/latest?feed=iex', 
    {
           
       headers: {
   
             'APCA-API-KEY-ID': process.env.api_key,
                
             'APCA-API-SECRET-KEY': process.env.api_secret,
 
             'Accept': 'application/json'
            
      }
     }
  );

         
  console.log('Latest trade data:', response.data.trade.p);
  secretKey = ""
  const jwt = require("jsonwebtoken");
  token_data=jwt.decode(authToken,secretKey)
  console.log(token_data.balance)
  if(token_data != undefined && token_data.balance > response.data.trade.p) //test purpose for now add verify account record in DB later
  {
     axios.request(payload).then( async (response) => {
      const  Order = new order ({
        Account:token_data.account_id,
        symbol:response.data.symbol,
        status:response.data.status,
        id:response.data.id,
        quantity:response.data.qty,
        price:response.data.filled_avg_price,
        action:"buy",
        type:response.data.type
      })
      try{
      await Order.save()
     res.json(response.data);
      }catch(error){
        res.status(400).send(`Transaction failed I:`,error);   
      }
     }).catch(error => {
     res.status(400).send(`Transaction failed II:`,error);
     });
  }
  else
  {
   res.status(400).send(`Transaction failed unsufficient balance`);
  }
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
      axios.request(payload).then( async (response) => {
        const  Order = new order ({
          Account:token_data.account_id,
          id:response.data.id,
          symbol:response.data.symbol,
          status:response.data.status,
          quantity:response.data.qty,
          price:response.data.filled_avg_price,
          action:"sell",
          type:response.data.type
        })
        try{
        await Order.save()
       res.json(response.data);
        }catch(error){
          res.status(400).send(`Transaction failed I:`,error);   
        }
       }).catch(error => {
       res.status(400).send(`Transaction failed II:`,error);
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
const get_and_update_order_status =  async(req,res)=>{
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
     try {
      const result = await Order.updateOne(
        { order_id: orderId }, // Filter condition
        { $set: { status: orderData.status } } // Update operation
      );
      console.log(result);
      res.send({'Status': status, 'Amount': price, 'Type': orderType ,"Quantity": qty});
    } catch (error) {
      console.error(error);
      res.status(400).send(`Transaction failed I: ${error.message}`);
    }
    
    } 
    catch (error) 
    {
      res.status(400).send(`Transaction failed II: ${error.message}`);
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

module.exports = {
    BuyStock,SellStock,getOrderDetails,checkBalanceAfterSale,getOrders,get_access,get_and_update_order_status
}

//if(buyerid=0 and sellerid=0) : retrieve account id from token buyerid=accountid + buy stock case : buy == filled transfer ether to trader account of symbol tsla,aapl,intl....
//if(buyerid!=0 and sellerid=0) sellerid=buyerid  seller is pending case : sale pending +sell stock
//if(buyerid=0 and sellerid!=0) retrieve account id from token buyerid=accountid  case : buy == filled transfer ether from accountid to seller 