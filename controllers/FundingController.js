
const Web3 = require('web3');
const Wallet = require("../Models/wallet")
const web3 = new Web3("http://127.0.0.1:7545")
const transfer_funds = async (req, res) => {
    const { sender, receiver, amount } = req.body;
    try{
    //sender address taken from metamask (done in front)
    if (!sender || !receiver || !amount) {
      return res.status(400).send('Sender address, receiver address, and amount are required.');
    }
  
   accounts=await web3.eth.getAccounts( (err,docs)=>{

    if(err) console.log(err)
    if(docs) console.log("docs")
  });

    
     
      const nonce = await web3.eth.getTransactionCount(sender, 'latest');
      console.log(nonce)
  
      const transaction = {
        from: sender,
        to: receiver,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gas: 21000,
        gasPrice: web3.utils.toWei('10', 'gwei'),
        nonce: nonce,
      };
      
     
      r=await web3.eth.sendTransaction(transaction)
      const filter={address:receiver}
        const update={ Balance : amount}
        const output=await Wallet.findOne(filter)
        if(output){
        await Wallet.findOneAndUpdate(filter, update); 
        res.status(200).send(`Transaction successful with hash: `+r.transactionHash);
               }
      
    }
     catch (error) {
      console.log(error)
      res.status(400).send(`Transaction failed: ${error.message}`);
    }
    
  }
const create_funding_account = async(req,res)=>{
    try{
    account=web3.eth.accounts.create()

    privateKey=account.privateKey
    const existingAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
    console.log('Existing Account Address:', existingAccount.address);

    // Add the existing account to the web3 instance
    web3.eth.accounts.wallet.add(existingAccount);
    accounts=await web3.eth.getAccounts( (err,docs)=>{

      if(err) console.log(err)
      if(docs) console.log(docs)
    });
    res.send(account)
    }catch(error){
      res.send(error)
    }
}
module.exports={
    transfer_funds,create_funding_account
}