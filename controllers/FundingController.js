


const fs = require('fs');
 // Replace with your Infura API key
const url = `https://holesky.infura.io/v3/97a8b6ce76cd44f29a3fa61b093524c1`;
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
  const balance = await contract.methods.checkBalance("0x313915aF61cF3d5e6c8DF07bBab46D4b353957D9").call();
  console.log(`Balance of ${address}: ${balance} wei`);
  x=balance.toString().substr(0, (balance.toString().length))
  const weiPerEth = BigInt(10 ** 18);
  console.log(parseFloat(Number(x)/(10**18)))
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  const data = await response.json();
  
  const filter={address:address}
  console.log(balance)
  const update={

    Balance:data.ethereum.usd*parseFloat(Number(x)/(10**18))
    }
  const output=await Wallet.findOne(filter)
  if(output){
    await Wallet.findOneAndUpdate(filter, update); 
  }

  res.send({"eth":parseFloat(Number(x)/(10**18)),"usd":data.ethereum.usd*parseFloat(Number(x)/(10**18))})
  }
  catch(error){
    console.log(error)
    res.status(400).send(error);
  }
} 
module.exports={
    Get_Balance
}