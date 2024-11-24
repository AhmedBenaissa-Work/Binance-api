const mongoose = require("mongoose");
const env = require("dotenv");

env.config();
const db_connection = async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
};
module.exports = db_connection;