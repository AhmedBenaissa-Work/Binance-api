const WebSocket = require("ws"); // we need the 'ws' package
const path = require("path");
require("dotenv").config();


const socket = new WebSocket('wss://stream.data.alpaca.markets/v2/iex');


socket.onopen = () => {
  console.log('Connected to Alpaca WebSocket');
  socket.send(JSON.stringify({
    action: 'auth',
    
      
    key_id: "PKPVXY0PWT9PXPE8DDF6",

    secret_key: "GSt5ARgfjJegZGGlawJpizg8ilfTrCF5IHYww6bb",
  }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(event)
  if (data.type === 'trade') {
    console.log('Trade data:', data);
  } else if (data.type === 'quote') {
    console.log('Quote data:', data);
  }
};

socket.onerror = (error) => {
  console.error('WebSocket Error:', error);
};

socket.onclose = () => {
  console.log('Disconnected from WebSocket');
};
