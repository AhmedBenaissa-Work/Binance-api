/**Id:order.id,
symbol: order.symbol,
submitted_at: order.submitted_at,
price: order.filled_avg_price , // Assuming you might want to handle both limit and market orders
quantity: order.qty,
status: order.status,
action: order.side,**/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    account : {
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
    },
    action : {
        type : String , 
        required : true,
        enum : ["sell","buy"]
    }
});
const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;