const P2PTransaction = require("../Models/P2Ptransaction")



const P2P_sell = async(req,res)=>{
    
    auth=req.headers.Authorization
    secretKey = ""
    const jwt = require("jsonwebtoken");
    token_data=jwt.decode(auth,secretKey)
    account_id=token_data.id
    try{
    if(token_data==undefined){
        res.status(400).send(`Unauthorized Login First`);
    }
    else{
    const peer_to_peer_transaction = new P2PTransaction ({
        seller :account_id,
        buyer: '',
        symbol:req.body.symbol,
        quantity:req.body.qty,
        price:req.body.filled_avg_price,
     //   action:"buy",
        status:'pending'
    })
    peer_to_peer_transaction.save()
    res.json({"response":"sale transaction in progress"})
   }
}catch(error){
    res.status(400).send(`Transaction failed I:`,error);   
}

}
const confirm_sell = async(req,res)=>{
    
    auth=req.headers.Authorization
    secretKey = ""
    const jwt = require("jsonwebtoken");
    token_data=jwt.decode(auth,secretKey)
    account_id=token_data.id
    try{
    if(token_data==undefined){
        res.status(400).send(`Unauthorized Login First`);
    }
    else{
        const filter={_id:req.params.transaction_id}
        const update={
          buyer:req.body.buyer,
          status : "filled"
          }
        const output=await P2PTransaction.findOne(filter)
        if(output){
        await P2PTransaction.findOneAndUpdate(filter, update); 

        res.json("updated")
        }
    res.json({"response":"sale transaction successful"})
   }
}catch(error){
    res.status(400).send(`Transaction failed I:`,error);   
}

}
module.exports = {
    P2P_sell,confirm_sell
}