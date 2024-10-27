const axios = require('axios');
const { ethers } = require('ethers');

const fs = require('fs');
const apiKey = "97a8b6ce76cd44f29a3fa61b093524c1"; // Replace with your Infura API key
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

async function checkBalance(address) 
{
    
  const balance = await contract.methods.checkBalance(address).call();

  console.log(`Balance of ${address}: ${balance} Wei`);
}
const addressToCheck = '0x821d63Dc5B2ACBd134Ce2Cd108d3B3543E224155'; // Replace with an address to check

checkBalance(addressToCheck);
