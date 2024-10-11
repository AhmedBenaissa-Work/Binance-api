const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    address : {
        type: String, 
        required: true 
      },
    Balance : {
        type : Number,
        required : true
    }
});
const Wallet = mongoose.model("wallets", WalletSchema);
module.exports = Wallet;