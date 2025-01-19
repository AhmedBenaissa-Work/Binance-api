const fs = require('fs');
 // Replace with your Infura API key
const env = require("dotenv");
env.config();
const url = process.env.Infura_network;
const {Web3} = require('web3');
const web3 = new Web3(url);
const path = require('path');
const wallets = require('../Models/wallet');
const accounts = require('../Models/account');
const artifactPath = path.join(__dirname, '../Contracts/Sandbox/artifacts/WalletAccess.json');
const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

const contractABI = contractArtifact.abi;
console.log(contractABI)
const contractAddress = process.env.sandbox_contract_address;
const contract = new web3.eth.Contract(contractABI, contractAddress);
const withdraw =  async (req,res)=>{
    const auth_token = req.headers.authorization
    token_data=jwt.decode(auth_token,'')
    if(auth_token==undefined)
    {
        res.status(401).send("un-authorized")
    }
    else
    {
     
        const recipient = req.body.recipient; // Replace with the recipient's address
  const amount = ethers.utils.parseEther(req.body.amount); // Replace with the amount (in ethers)
  const userId = token_data.id; // Replace with the user ID

  try {
    const tx = await contract.withdraw(recipient, amount, userId);
    console.log("Transaction sent:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
  } catch (error) {
    console.error("Error:", error);
  }
    }
}
const exchange = async(req,res)=>{
    const auth_token = req.headers.authorization
    if(auth_token==undefined){
        res.status(401).send("forbidden")
    }
    else{
    token_data=jwt.decode(auth_token,'')
    
    const sender = token_data.address
    const receiver=req.body.receiver
    const amount=req.body.amount
    
    try{

    
    const doc = await wallets.find({address:sender});
    const doc_0 = await wallets.find({address:receiver});
    sender_wallet=await wallets.findById({address:sender}).updateOne({Balance:doc[0].Balance-amount})
    receiver_wallet=await wallets.findById({address:receiver}).updateOne({Balance:doc_0[0].Balance+amount})
    res.send("Funds Transferred")
    }catch(error){
        res.status(401).send(error)
    }
}

}
module.exports = {
    withdraw,exchange
}