
const env = require("dotenv");
env.config();
// Set up your API credentials

// Check account information
const axios = require('axios');



// Function to chunk the symbols into smaller batches
function chunkSymbols(symbols, chunkSize) {
  const chunks = [];
  for (let i = 0; i < symbols.length; i += chunkSize) {
    chunks.push(symbols.slice(i, i + chunkSize));
  }
  return chunks;
}


async function fetchStockData(symbols, chunkSize =200) {
    const BASE_URL = "https://data.alpaca.markets/v2/stocks/bars/latest";
    
    const headers = {
        'APCA-API-KEY-ID':process.env.api_key,
      'APCA-API-SECRET-KEY': process.env.api_secret,
      'accept': 'application/json',
      'content-type': 'application/json'
    };
  
    // Split symbols into chunks
    const symbolChunks = chunkSymbols(symbols, chunkSize);
    const allData = {};
  
    for (const chunk of symbolChunks) {
      const symbolList = chunk.join(",");
      try {
        const response = await axios.get(`${BASE_URL}?symbols=${symbolList}&feed=iex`, { headers });
      
        if (response.data && response.data.bars) {
          Object.assign(allData, response.data.bars);
        }
      } catch (error) {
        console.log(error.message)
        
      }
    }
  
    return allData;
  }
const stock_market_data = async(req,res)=>{
    try{
          data1=await fetchStockData(req.body.symbols,chunkSize=4000)
          const stockList = Object.keys(data1).map(symbol => ({
            symbol,
            current: data1[symbol]['c'],
            high: data1[symbol]['h'],
            low: data1[symbol]['l'],
            open: data1[symbol]['o'],
            volume: data1[symbol]['v'],

          }));
        
          res.json(stockList)
    }catch(error){
        res.status(400).send(error);
    }
}

module.exports= {
    stock_market_data
}