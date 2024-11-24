import web3 from "web3";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { jwtDecode } from 'jwt-decode' 
export default function Transfer_Funds(){

  const [address,setAddress]=useState("")
  const [amount,setAmount]=useState(0)
  const [rate,setRate]=useState(0)
  async function getEtherToUSDRate() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  const data = await response.json();
  console.log(data)
  setRate(data.ethereum.usd)
  return data.ethereum.usd; // Returns the USD price of Ether
 }
 const token = localStorage.token;
 const user = jwtDecode(token)
 console.log(user)

 const handleInputChange = (event) => {
    setAmount(event.target.value);
    
  };
  useEffect(()=>{
    getEtherToUSDRate()
  })
  
  const onBuy=event=>{
    const token = localStorage.token;
    const user = jwtDecode(token)
    console.log(user)
    event.preventDefault()
    console.log(amount)
    getEtherToUSDRate()
    if(rate>0){
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts =  window.ethereum.request({ method: 'eth_accounts' });
        const chainId =  window.ethereum.request({ method: 'eth_chainId'});
        // Check if user is connected to Mainnet
        console.log(accounts)
        if(chainId != '0x1') {
         console.log("6565656sqdqd")
        } else {
          let wallet = accounts[0];
          console.log(wallet)
        }
      }
    else{
      console.log("error")
    }
    
    
    const price = amount / rate
    console.log(price)
    const transactionParameters = {
        
        gasPrice: '10', // customizable by user during MetaMask confirmation.
        gas: '21000', // customizable by user during MetaMask confirmation.
        to: user.address,
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: parseInt(web3.utils.toWei(price,"ether")).toString(16), // Only required to send ether to the recipient from the initiating external account.
         // Optional, but used for defining smart contract creation and interaction.
        chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };
      console.log(transactionParameters.value)
      const txHash =  window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    }else{
        console.log("...................................................")
    }
    }
  return (
  <div>
       <TextField
        label="Enter a number"
        variant="outlined"
        type="number"
        value={amount}
        onChange={handleInputChange}
       
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onBuy}
        style={{ marginLeft: '10px' }}
      >
        Submit
      </Button>

  </div>
  )


}