
import { Button, FormControl } from '@mui/material';
import { InputLabel,Input,FormHelperText } from '@mui/material';
import React, { useState ,useEffect} from 'react'
import * as apiService from "../Services/Trading_api_service";
import { jwtDecode } from 'jwt-decode' 
const BuyStockForm = ({data}) => {
  
  const [q,setQ]=useState(0)
  const  [balance,setBalance]=useState(0)
  const handleChange = event => {
    event.preventDefault()
    setQ(event.target.value)
  }
  useEffect(()=>{
    const token = localStorage.token;
    const user = jwtDecode(token)
    console.log(user)
    setBalance(user.balance)
   
 
})
  const Buy_stock = (row) => {
    console.log(row)
   
    console.log(localStorage.token)
    apiService.buy_stock(localStorage.token,balance,data.symbol,q).then((res)=>{
      console.log(res)
    })
   
  };
  return (
    <div>
        <p>{data.symbol}</p>
        <p >Current Price : {data.current}</p>      
        <p >Lowest Price  : {data.low}</p> 
        <p >Highest Price : {data.high}</p>   
        <p >Open Price    : {data.open}</p>      
        <p >Volume : {data.volume} </p>   
    
        <FormControl>
  <InputLabel htmlFor="my-input">Number of Shares</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" onChange={handleChange} />
  <FormHelperText id="my-helper-text">Submit the number of shares you want to buy</FormHelperText>
  <Button onClick={Buy_stock}>Buy Stock</Button>
</FormControl>

    </div>
  )
}

export default BuyStockForm