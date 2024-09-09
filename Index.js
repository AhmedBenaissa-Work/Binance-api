const express = require('express');
const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root URL
const TradingRoutes=require("./Routes/TradingRoutes");
app.use('/api/trading',TradingRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
