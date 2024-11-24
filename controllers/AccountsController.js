const Account = require("../Models/account");
const Wallet = require ("../Models/wallet")

const bcrypt = require("bcrypt");

const crypto = require('crypto');
const { Web3 } = require('web3');
const { ethers } = require('ethers');
const CryptoJS=require('crypto-js')
const infuraProjectId = '97a8b6ce76cd44f29a3fa61b093524c1'; // Replace with your actual Project ID
const infuraUrl = `https://holesky.infura.io/v3/${infuraProjectId}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

var jwt=require('jsonwebtoken')


const nodemailer = require("nodemailer")

const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const createAccount = async (req, res) => {
  try {
    
const newAccount = ethers.Wallet.createRandom();
console.log("New Account Address:", newAccount.address);
console.log("Private Key:", newAccount.privateKey);
const infuraProvider = new ethers.JsonRpcProvider(infuraUrl);
const walletWithProvider = new ethers.Wallet(newAccount.privateKey, infuraProvider);
console.log(walletWithProvider)
    const newWallet = new Wallet({
        address: walletWithProvider.address,
        Balance : 0
      });
      const wallet = await newWallet.save();
    if (
      !(
        req.body.name &&
        req.body.email &&
        req.body.password &&
        wallet._id
      )
    ) {
      res.status(400).send("All input is required");
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(req.body.email);
    if(isValid==true){
    const oldAccount = await Account.findOne({ email_address: req.body.email });

    if (oldAccount) {
      return res.status(409).send("Account Already Exist. Please Login");
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newAccount = new Account({
      name: req.body.name,

      
      email_address: req.body.email,
      password: hashedPassword,
      wallet_id:wallet._id
    });
    const account = await newAccount.save();
    res.json(Account)
  }else{res.json("error email  has to be like  xxxx@ff.com")}}
   catch (error) {
    console.log("Got an error", error);

  }
};
const Login= async (req, res) =>{
    try{
     const credentials = {
      email_address: req.body.email,
      password: req.body.password,    
     }
     const salt = 10;
     const hashedPassword = await bcrypt.hash(credentials.password, salt);
     const account = await Account.findOne({ email_address: credentials.email_address  });
     console.log(account)
     const wallet = await Wallet.findOne({_id:account.wallet_id})
     if( bcrypt.compareSync(req.body.password, account.password)==true)
      {
     const secret = generateSecret()
     const jwt = require("jsonwebtoken");
     const token = jwt.sign({
          id: account.id,
          name: account.name,
          email: account.email_address,
          address : wallet.address,
          balance : wallet.Balance
           
        }, secret, { expiresIn: '1h' });
  
      res.cookie("token", token, {
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
        token:token
      });
      console.log(res)
  
  
      console.log("cookie set succesfully");
  
      res.json(token);
    }
    else{
      res.json("password incorrect")
    }
    }catch(error){
      res.json(error)
    }
  }
  
  const getAccountDataFromCookie = (req, res, next) => {
      const AccountDataCookie = req.cookies;
      console.log(req.cookies)
      res.send(AccountDataCookie)
    };
const ConfirmAccount = async(req,res) => {

      try{
              const email=req.body.email
              const name=req.body.name 
              const pass= req.body.password
              
              var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: process.env.Mailing_App_Email,
                    pass: process.env.Mailing_App_Password
                  }
                });
                var hash = CryptoJS.SHA256(req.params.email+pass)
                let jwtSecretKey = hash.toString(CryptoJS.enc.Base64);
                let data = {
                    time: Date(),
                    Email:email,
                    Name:name,
                    Password:pass
                }
                let  init_time=new Date(Date.now())
                let  auth_token_expire=new Date(Date.now()+(0.01)*3600000)
                const auth_token = jwt.sign(data, jwtSecretKey);
                console.log(auth_token)
                console.log("expire=>"+auth_token_expire)
                let link =  'http://localhost:8000/api/accounts/confirm_account_creation'
                var mailOptions = {
                  from: 'baissahmed@gmail.com',
                  to: email,
                  subject: "Confirm Account",
                  text: '<a href="'+link+'"></a>',
                  html:'<h1>Click on the link Below 👇</h1>'+
                  
                  '<p style="color:red ; font-family:verdana;">'+"this link expires in 10 minutes"+'</p>'+
                  ' <form  action="'+link+'"'+ 'method="POST" > '+
                  ' <input type="text" value="'+email+'"' +'id="email" name="email"  style="display:none"> '+
                  '<input type="text" value="'+name+'"' +'id="name" name="name"  style="display:none"> '+
                  '<input type="password" value="'+pass+'"' +'id="password" name="password"  style="display:none"> '+
                  ' <input type="text" value="'+auth_token+'"' +'id="auth_token" name="auth_token"  style="display:none"> '+
                  ' <input  value="'+auth_token_expire+'"' +'id="auth_token_expire" name="auth_token_expire"  style="display:none"> '+ 
                  ' <input  type="submit" value="Submit">'+
                  '</form>'
                };
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    res.send('Email sent: ' + info.response);
                  }
              })
  
  
      }catch(error){
          res.status(400).json({status: 400, message: error.message})
      }
  }
  const confirm_account_creation=async(req,res)=>{

    console.log(req.body)
    const random = Math.floor(Math.random() * 9000 + 1000);
    var hash = CryptoJS.SHA256(req.body.email+random)
    let jwtSecretKey = hash.toString(CryptoJS.enc.Base64);       
    let data = {
        time: Date(),
        email:req.body.email,
        name:req.body.name,
        address:req.body.address,
        id:random
    }
    const token = jwt.sign(data, jwtSecretKey);
    console.log(token)
    let  init_time=new Date(Date.now())
    console.log("init=>"+init_time)
    console.log("expire="+req.body.auth_token)
    console.log("expiredate="+req.body.auth_token_expire)
    if(init_time.getTime()>new Date(req.body.auth_token_expire).getTime()){
        res.send("token expired")
    }
    else {
      const email=req.body.email
      const name=req.body.name 
      const pass= req.body.password
      console.log(req.body)
      const newAccount = ethers.Wallet.createRandom();
      console.log("New Account Address:", newAccount.address);
      console.log("Private Key:", newAccount.privateKey);
      const infuraProvider = new ethers.JsonRpcProvider(infuraUrl);
      const walletWithProvider = new ethers.Wallet(newAccount.privateKey, infuraProvider);
      console.log(walletWithProvider)
      const newWallet = new Wallet({
        address: walletWithProvider.address,
        Balance : 0
      });
      const wallet=await newWallet.save()
      console.log(wallet)
      const salt = 10;
      const hashedPassword = await bcrypt.hash(pass, salt);
      const account_ = new Account({
        name: name,
        email_address: email,
        password: hashedPassword,
        wallet_id:wallet._id
      });
       
       const c = await account_.save();
       
       data={
        email:email,
        address:walletWithProvider.address,
        name:name
       }
       const token1 = jwt.sign(data, jwtSecretKey);
       console.log(token1)
       let link='http://localhost:3000/confirm?q='+token1 
       res.redirect(link)         
    }
};  
  
  module.exports={
      createAccount,
      getAccountDataFromCookie
      ,Login,ConfirmAccount,confirm_account_creation
     }