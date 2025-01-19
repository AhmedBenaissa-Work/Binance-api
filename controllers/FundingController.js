


const fs = require('fs');
 // Replace with your Infura API key
 const env = require("dotenv");
 env.config();
 const url = process.env.Infura_network;
 const {Web3} = require('web3');

 

const web3 = new Web3(url);
const path = require('path');

const artifactPath = path.join(__dirname, '../Contracts/artifacts/WalletAccess.json');
const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

const Wallet = require("../Models/wallet");
const contractABI = contractArtifact.abi;
console.log(contractABI)
const contractAddress = "0xba1452fd4ff870a0e986c2ce5898d97656d77115"
const contract = new web3.eth.Contract(contractABI, contractAddress);
const Get_Balance = async(req,res)=>{
  try{
  const address = req.body.address
  console.log(address)
  console.log(web3.utils.toChecksumAddress(address));
  const balance = await contract.methods.checkBalance(address).call();
  console.log(`Balance of ${address}: ${balance} wei`);
  x=balance.toString().substr(0, (balance.toString().length))
  const weiPerEth = BigInt(10 ** 18);
  console.log(parseFloat(Number(x)/(10**18)))
  const filter={address:req.body.address}
  const output=await Wallet.findOne(filter)
  console.log(output)  
  

  res.send({"eth":parseFloat(Number(x)/(10**18)),'usd':output.Balance})
  }
  catch(error){
    console.log(error)
    res.status(400).send(error);
  }
}
const update_balance_once_funded = async(req,res)=>{
  const filter={address:req.body.address}
  console.log(balance)
  const update={

    Balance:req.body.Balance
    }
  const output=await Wallet.findOne(filter)
  if(output){
    await Wallet.findOneAndUpdate(filter, update); 
  }
} 
module.exports={
    Get_Balance,update_balance_once_funded
}