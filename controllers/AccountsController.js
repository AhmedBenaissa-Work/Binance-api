const Account = require("../Models/account");
const Wallet = require ("../Models/wallet")

const bcrypt = require("bcrypt");

const crypto = require('crypto');
const Web3 = require('web3');

const web3 = new Web3("http://127.0.0.1:7545")
const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const createAccount = async (req, res) => {
  try {
    account=web3.eth.accounts.create()
    privateKey=account.privateKey
    const existingAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(existingAccount);
    const newWallet = new Wallet({
        address: account.address,
  
        
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
  
      res.json(Account);
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
  
  
  module.exports={
      createAccount,
      getAccountDataFromCookie
      ,Login,getAccountDataFromCookie
     }