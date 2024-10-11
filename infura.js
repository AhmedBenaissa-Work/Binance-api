const Web3 = require('web3');

// Create a Web3 instance connected to Infura
const infuraProjectId = '97a8b6ce76cd44f29a3fa61b093524c1';
const infuraUrl = `https://mainnet.infura.io/v3/${infuraProjectId}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// Create a new account
const newAccount = web3.eth.accounts.create();
console.log("New Account Address:", newAccount.address);
console.log("Private Key:", newAccount.privateKey);

// Note: Keep your private key safe and never expose it in production code!


