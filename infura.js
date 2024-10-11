const Web3 = require('web3');
const { ethers } = require('ethers');
const axios = require('axios');
// Create a Web3 instance connected to Infura
const infuraProjectId = '97a8b6ce76cd44f29a3fa61b093524c1'; // Replace with your actual Project ID
const infuraUrl = `https://holesky.infura.io/v3/${infuraProjectId}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// Function to test connection to Ethereum network
async function testConnection() {
    try {
        const blockNumber = await web3.eth.getBlockNumber();
        console.log("Latest Block Number:", blockNumber);
    } catch (error) {
        console.error("Connection error:", error);
    }
}

// Call the testConnection function
testConnection();

// Create a new Ethereum account
const newAccount = ethers.Wallet.createRandom();
console.log("New Account Address:", newAccount.address);
console.log("Private Key:", newAccount.privateKey);

// Create an Infura provider for ethers.js


// Hypothetical function to whitelist an address

//whitelistAddress(infuraProjectId,newAccount.address)
const infuraProvider = new ethers.JsonRpcProvider(infuraUrl);
const walletWithProvider = new ethers.Wallet(newAccount.privateKey, infuraProvider);
console.log(walletWithProvider)
// Example: Get balance of the new account
