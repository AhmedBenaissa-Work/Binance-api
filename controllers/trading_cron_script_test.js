const orders = require("../Models/order")
const accounts = require("../Models/account")
const mongoose = require("mongoose");
// Check account information
const axios = require('axios');

const db_connection = async () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/TradingDB")
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
};
credentials="NTFkOGQ2YjktYjQ0OC00N2VhLWE1ZWQtY2E2ZjAxMDhiMjk4OmE0OGM5NzYzLWQxOTgtNGM4NC05MzY4LWIyNGI1MmY4NWRmNg=="
const transaction = async(card_token,amount)=>{
  const credentials = credentials;
  try{
const params={
  "card_token": card_token,
  "amount": amount,
  "mid": "merchant001"
}
  const config3= {
    method: 'post',
    url: 'https://sandbox-api.marqeta.com/v3/simulate/authorization',
    maxBodyLength: Infinity,
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
    data: params
  };
   const response3 = await axios.request(config3);
    res.status(200).send({"response":response3.data});
    }
    catch(error){
      console.log(error)
      res.status(400).send({"response":error});
    }
}

const createGpaOrder = async(user_token,amount)=>{

  const credentials = credentials;

  const data = {
    user_token:user_token,
    amount: amount,
    currency_code: 'USD',
    funding_source_token: 'sandbox_program_funding',
    memo: 'User top-up via Stripe'
  };

  const config = {
    method: 'post',
    url: 'https://sandbox-api.marqeta.com/v3/gpaorders',
    maxBodyLength: Infinity,
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    console.log('✅ GPA Order Success:', response.data);
   
    res.send({'account':response.data})
  } catch (error) {
    console.error('❌ GPA Order Failed:', error.response?.data || error.message);
    res.status(400).send(error);
  }
}

const UpdateOrdersStatus = async()=>{
  try{
 
  const pendingOrders =await orders.find({
  status: { $nin: ["filled", "accepted","canceled"] }
  })
  const BASE_URL = "https://paper-api.alpaca.markets";
  const trades=[]
  if(pendingOrders.length===0){
    console.log("No pending orders")
    return []
  }
for (const order of pendingOrders) {
    try {
      const res = await axios.get(`${BASE_URL}/v2/orders/${order.order_id}`, {
        headers: {
          'APCA-API-KEY-ID': 'PKPVXY0PWT9PXPE8DDF6',
          'APCA-API-SECRET-KEY': 'GSt5ARgfjJegZGGlawJpizg8ilfTrCF5IHYww6bb',
        },
      });

      const alpacaOrder = res.data;
      console.log(alpacaOrder.status)
      const filter = { order_id: order.order_id }
      const update = {
        $set: {
         status: alpacaOrder.status,
        },
     };
        const s = await orders.updateOne(filter, update)
        console.log(order.Account)
        console.log(order.price*order.quantity)
        console.log(order.action)
        console.log(s)
        if(alpacaOrder.status==="filled"){
          trades.push({"Account":order.Account,"amount":order.price*order.quantity,"action":order.action})
        }
      console.log(`✅ Updated ${order.order_id} -> ${alpacaOrder.status}`);
    } catch (err) {
      console.error(`Error updating order ${order.order_id}:`, err.message);

    }
  }

  return trades
  }catch(error){
    console.log(error)
    return []
  }
}
const CheckBalances = async()=>{
const trades=await UpdateOrdersStatus()
//users=trades.map((e)=>e.Account)

if(trades.length>0){
    const users =  [...new Set(trades.map(e => e.Account.toString()))];

    console.log(users)
    user_profits=[]
    for(const u of users){
         console.log(u)
         user_trades=trades.filter((e)=>e.Account.toString()===u)
         profits=0
         
         for (const k of user_trades){
            console.log(k["action"])
            console.log(k["amount"])
            if(k["action"]==="sell"){profits+=k["amount"]}
            else{profits-=k["amount"]}
            
        }
        user_profits.push({"user":u,"profits":profits})
        if(profits>0){
          const a = await accounts.findById({_id:u})
          
          const s=await createGpaOrder(a.sandbox_id,profits)
          console.log(s)
        }
        else if (profits<0){
            const p=-profits
            const s=await transaction(a.sandbox_id,p)
          console.log(s)
        }
    }
    console.log(user_profits)
}
}
(async () => {
  await db_connection();
  await CheckBalances();
  await mongoose.disconnect(); // 👈 closes the DB connection so Node exits
})();