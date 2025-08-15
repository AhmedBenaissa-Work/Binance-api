const Account = require("../Models/account");
const Wallet = require ("../Models/wallet")

const bcrypt = require("bcrypt");

const crypto = require('crypto');
const { Web3 } = require('web3');
const { ethers } = require('ethers');
const CryptoJS=require('crypto-js')


 const env = require("dotenv");
 env.config();
const key=process.env.secret_key;

const infuraUrl = process.env.Infura_network;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
const FintechController=require("./FintechController")
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
   //  const salt = 10;
   //  const hashedPassword = await bcrypt.hash(credentials.password, salt);
     const account = await Account.findOne({ email_address: credentials.email_address  });
     console.log(account)
     const wallet = await Wallet.findOne({_id:account.wallet_id})
     if( bcrypt.compareSync(req.body.password, account.password)=== true)
      {
     const secret = key
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
        secure: false, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
      
        
      },
        );
        res.cookie('user_token',account.sandbox_id,
           {
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: false, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
       
        
      }
          
        //  'user_main_id',account.id
        )
        res.cookie('user_main_id',account.id,{
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: false, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
      
        
      })
        res.cookie('card_id',account.card_id,{
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: false, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
      
        
      })
      console.log(res)
      console.log("cookie set succesfully");
      res.status(200).send({"token":token,"user_token":account.sandbox_id,"user_main_id":account.id,"card_id":account.card_id});
    }
    else{
      res.status(400).send("password incorrect")
    }
    }catch(error){
      res.json(error)
    }
  }
  
  const getAccountDataFromCookie = (req, res, next) => {
    
      const AccountDataCookie = req.cookies;
      console.log(req)
      res.send(AccountDataCookie)
    };
  


const ConfirmAccount = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const pass = req.body.password;

    // ✅ Add this: configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Mailing_App_Email,
        pass: process.env.Mailing_App_Password
      }
    });

    const hash = CryptoJS.SHA256(email + pass);
    const jwtSecretKey = hash.toString(CryptoJS.enc.Base64);

    const data = {
      time: Date(),
      email,
      name,
      password: pass
    };

    const auth_token_expire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const auth_token = jwt.sign(data, jwtSecretKey);

    const frontendLink = `http://localhost:3000/confirm?q=${encodeURIComponent(auth_token)}&expires=${auth_token_expire.toISOString()}`;

    const mailOptions = {
      from: process.env.Mailing_App_Email,
      to: email,
      subject: "Confirm Your Account",
      html: `
        <h1>Click the link below to confirm your account</h1>
        <p style="color:red">This link expires in 10 minutes</p>
        <a href="${frontendLink}">Confirm Account</a>
      `
    };

    await transporter.sendMail(mailOptions);
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
        wallet_id:wallet._id,
        sandbox_id:"",
        card_id:""
      });
              
     
       const c = await account_.save();
       console.log(c)
       try{
        FintechController.createUserAccount(name,"..",email,c._id)
       }catch(error){
        res.status(400).json({ status: 400, message: error.message });
       }
    res.send('Confirmation email sent');
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

    
  const confirm_account_creation=async(req,res)=>{
   try{
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
       try{
       FintechController.createUserAccount(name,"..",email,c._id)
       }catch(error){
        res.status(400).json({ status: 400, message: error.message });
       }
       data={
        email:email,
        address:walletWithProvider.address,
        name:name
       }
       const token1 = jwt.sign(data, jwtSecretKey);
       console.log("token===================",token1)
       let link='http://localhost:3000/confirm?q='+token1 
       res.redirect(link)         
    }}catch(error){
      res.status(400).json({ status: 400, message: error.message });
    }
};  
  
  module.exports={
      createAccount,
      getAccountDataFromCookie
      ,Login,ConfirmAccount,confirm_account_creation
     }