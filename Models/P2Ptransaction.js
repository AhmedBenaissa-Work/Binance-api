/**Id:order.id,
symbol: order.symbol,
submitted_at: order.submitted_at,
price: order.filled_avg_price , // Assuming you might want to handle both limit and market orders
quantity: order.qty,
status: order.status,
action: order.side,**/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const P2PTransactionSchema = new Schema({
    buyer : {
        type : Schema.Types.ObjectId ,
        ref : "accounts", 
        
    },
    seller : {
        type : Schema.Types.ObjectId ,
        ref : "accounts", 
        required : true
    },
    symbol : {
        type : String , 
        required : true
    },
    submitted_at : {
        type : Date , 
        default : Date.now(),
        required : true
    },
    price : {
        type : Number , 
        required : true
    },
    quantity : {
        type : Number , 
        required : true
    },
    status : {
        type : String , 
        required : true,
        enum : ["filled","done"]
    }
});
const P2PTransaction = mongoose.model("P2PTransactions", P2PTransactionSchema);
module.exports = P2PTransaction;