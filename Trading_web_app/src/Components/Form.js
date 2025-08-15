
import { Button, FormControl } from '@mui/material';
import { InputLabel,Input,FormHelperText } from '@mui/material';
import React, { useState ,useEffect} from 'react'
import * as apiService from "../Services/Trading_api_service";
import * as apiService1 from "../Services/Financial_management_service";
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
  const Buy_stock = async() => {
    if(q>0){
    
    const ut=sessionStorage.getItem("user_token")
    const authToken=sessionStorage.getItem("token")
    const card_id=sessionStorage.getItem("card_id")
    await apiService1.Balance(ut).then(async(res)=>{
     console.log(res)
     await apiService.buy_stock(authToken,res.balance,data.symbol,q).then(async(res)=>{
      console.log(res)
      const price=data.current*q
      await apiService1.transaction(card_id,price.toFixed(2))
    })  
    })
    }
   
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