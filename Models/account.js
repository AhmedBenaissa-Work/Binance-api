const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    name : {
        type: String, 
        required: true 
      },
    email_address : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    wallet_id : {
        ref : "wallets",
        type:Schema.Types.ObjectId,
        required : true 
    },
    sandbox_id : {
       
        type:String 
    },
    card_id : {
       
        type:String 
    },
    stripe_id : {
       
        type:String 
    }

});
const Account = mongoose.model("accounts", AccountSchema);
module.exports = Account;