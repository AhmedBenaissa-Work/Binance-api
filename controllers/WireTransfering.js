const fs = require('fs');
 // Replace with your Infura API key
const env = require("dotenv");
env.config();
const url = process.env.Infura_network;
const {Web3} = require('web3');
const web3 = new Web3(url);
const path = require('path');
const wallet = require('../Models/wallet');
const artifactPath = path.join(__dirname, '../Contracts/Sandbox/artifacts/WalletAccess.json');
const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

const contractABI = contractArtifact.abi;
console.log(contractABI)
const contractAddress = process.env.sandbox_contract_address;
const contract = new web3.eth.Contract(contractABI, contractAddress);
const withdraw =  async (req,res)=>{
    const auth_token = req.headers.authorization
    token_data=jwt.decode(authToken,'')
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
module.exports = {
    withdraw
}