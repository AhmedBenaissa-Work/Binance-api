
import { useEffect, useState } from "react";

import  TextField  from "@mui/material/TextField";
import { jwtDecode } from 'jwt-decode' 

import CheckOut from "./Checkout";
export default function Transfer_Funds(){


  const [amount,setAmount]=useState(0)
  const [rate,setRate]=useState(0)
  async function getEtherToUSDRate() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  const data = await response.json();
  console.log(data)
  setRate(data.ethereum.usd)
  return data.ethereum.usd; // Returns the USD price of Ether
 }


 const handleInputChange = (event) => {
    setAmount(event.target.value);
    
  };
  
  return (
  <div>
    <CheckOut amount={amount}></CheckOut>
       <TextField
        label="Enter a number"
        variant="outlined"
        type="number"
        value={amount}
        onChange={handleInputChange}
       
      />
    

  </div>
  )


}