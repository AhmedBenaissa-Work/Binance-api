const express = require('express');
const app = express();
const port = 8000;
const Connection=require("./connect_to_db");
// Middleware to parse JSON bodies
app.use(express.json());
Connection()
// Define a route for the root URL
const TradingRoutes=require("./Routes/TradingRoutes");
const FundingRoutes=require("./Routes/FundingRoutes");
const AccountsRoutes=require("./Routes/AccountsRoutes");
app.use('/api/trading',TradingRoutes);
app.use('/api/fund',FundingRoutes);
app.use('/api/accounts',AccountsRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
