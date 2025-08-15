const axios = require('axios');
 const env = require("dotenv");
 env.config();
 const Account = require("../Models/account");
 const credentials_ = process.env.marqetta_app_token;
 const key=process.env.secret_key;

 const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Replace with your secret key
const createGpaOrder = async(req,res)=>{

  const credentials = credentials_;

  const data = {
    user_token: req.headers.authorization,
    amount: req.body.amount,
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
const createStripePayment = async(req,res)=>{
  const { amount } = req.body;
  const user= req.headers.authorization
  const jwt = require("jsonwebtoken");
  const secretKey=key;
  token_data=jwt.decode(user,secretKey)
  const user_id=token_data.id
 
  
  
  currency="usd"
  customer_=""
  try {
    
    const s =await Account.findById({_id:user_id})
  if (!s) {
  // If s is null or not found
   const name=token_data.name 
  const email=token_data.email
   const customer=await stripe.customers.create({
    email: email, // or use another identifier
    name: name || undefined, // optional
  });
    await Account.updateOne(
    { _id: user_id },
    { $set: { stripe_id: customer.id } }
  );
  customer_=customer.id
  console.log("Account not found");
  // handle accordingly
} else {
  
  if(s.stripe_id.length==0){
    const name=token_data.name 
  const email=token_data.email
   const customer=await stripe.customers.create({
    email: email, // or use another identifier
    name: name || undefined, // optional
  });
    await Account.updateOne(
    { _id: user_id },
    { $set: { stripe_id: customer.id } }
  );
    customer_=customer.id
  }else{
    customer_=s.stripe_id
  }
  // If account is found
  //console.log(customer)
  // proceed with s
}  
    console.log("customer==",customer_)
    const paymentIntent = await stripe.paymentIntents.create({
        customer : customer_,
        amount: amount,
        currency: currency,
        automatic_payment_methods: { enabled: true },
      });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  
}
const createUserAccount = async(first_name,last_name,email,Account_id)=>{

  const credentials = credentials_;
  console.log(Account_id)
  const data = {
    "first_name": first_name,
  "last_name": "doe",
  "active": true,
  "gender": "M",
  "email": email
  };
 console.log(data)
  const config = {
    method: 'post',
    url: 'https://sandbox-api.marqeta.com/v3/users',
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
    user_token=response.data.token;
    try{
    
     
     
     const b = {
  "name":  `My Virtual Card ${data.first_name}`,
  "start_date": "2025-07-21", 
  "config": {
    "fulfillment": {
      "payment_instrument": "VIRTUAL_PAN"
    },
    "card_life_cycle": {
      "activate_upon_issue": true
    }
  }
  
  
}
const config2 = {
    method: 'post',
    url: 'https://sandbox-api.marqeta.com/v3/cardproducts',
    maxBodyLength: Infinity,
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
    data: b
  };
  const response2 = await axios.request(config2);
  card_token=response2.data.token
  const params={
    "user_token": r,
    "card_product_token": card_token,
    "token": card_token
  }
  const config3= {
    method: 'post',
    url: 'https://sandbox-api.marqeta.com/v3/cards',
    maxBodyLength: Infinity,
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
    data: params
  };
   const response3 = await axios.request(config3);
   const r=await Account.updateOne(  { _id: Account_id },
     { $set: { sandbox_id: user_token , card_id:card_token } })
    return ({'account':response.data,"user_sandbox_account":r,"card_assigned":response3})
    }catch(error){
      console.log(error)
      return error
    }

  } catch (error) {
    console.log(error.response)
    console.error('❌ User Creation Failed:', error.response?.data || error.message);
    return error;
  }
}
const getUserBalance = async(req,res)=>{

 const credentials = credentials_;
 user_token=req.headers.authorization

  const config = {
    method: 'get',
    url: `https://sandbox-api.marqeta.com/v3/balances/${user_token}`,
    maxBodyLength: Infinity,
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
  
  };

  try {
    const response = await axios.request(config);
    res.status(200).send({"balance" :response.data.gpa.ledger_balance})
    
    
  } catch (error) {
    console.log(error.response)
    console.error('❌ User Creation Failed:', error.response?.data || error.message);
    return error;
  }
}
const transaction = async(req,res)=>{
  const credentials = credentials_;
  try{
const params={
  "card_token": req.headers.authorization,
  "amount": req.body.amount,
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
module.exports={
 createGpaOrder , createUserAccount , createStripePayment , getUserBalance , transaction
}
