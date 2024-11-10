
const Web3 = require('web3');
const Wallet = require("../Models/wallet")

const { ethers } = require('ethers');

const fs = require('fs');
 // Replace with your Infura API key
const url = `https://holesky.infura.io/v3/97a8b6ce76cd44f29a3fa61b093524c1`;
const Web3 = require('web3');
const web3 = new Web3(url);
const path = require('path');

const artifactPath = path.join(__dirname, '../Binance-api-main/Contracts/artifacts/WalletAccess.json');
const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));


const contractABI = contractArtifact.abi;
console.log(contractABI)
const contractAddress = "0xba1452fd4ff870a0e986c2ce5898d97656d77115"
const contract = new web3.eth.Contract(contractABI, contractAddress);
const Get_Balance = async(req,res)=>{
  try{
  const address = req.body.address
  const balance = await contract.methods.checkBalance(address).call();
  res.send(balance)
  }
  catch(error){
    res.status(400).send(error);
  }
} 
module.exports={
    Get_Balance
}