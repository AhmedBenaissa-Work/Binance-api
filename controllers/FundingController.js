
const{ Web3 }= require('web3');

const web3 = new Web3("http://127.0.0.1:8545")
const transfer_funds = async (req, res) => {
    const { sender, receiver, amount } = req.body;
    try{
    //broker_address=reciever
    if (!sender || !receiver || !amount) {
      return res.status(400).send('Sender address, receiver address, and amount are required.');
    }
  
    try {
      const authToken = req.headers.authorization;
      const jwt = require('jsonwebtoken');
  
      const secretKey = ``; // Using this as a secret key
      const token1  = authToken // paste token here
  
      token_data=jwt.decode(token1,secretKey) 
      if(token_data.role=="customer" && token_data.id!=undefined)
      {
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
      console.log(web3.eth.accounts.wallet.entries.toString())
     
      r=await web3.eth.sendTransaction(transaction)
     
      res.status(200).send(`Transaction successful with hash: `+r.transactionHash);
    }} catch (error) {
      console.log(error)
      res.status(400).send(`Transaction failed: ${error.message}`);
    }
    }catch(error){
      res.status(400).send(`Transaction Unauthorized`);
    }
  }

module.exports={
    transfer_funds
}