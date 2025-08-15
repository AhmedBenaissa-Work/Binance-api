// App.js
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import * as apiService from "../../Services/Financial_management_service";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({amount}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const onSuccess  = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/dashboard", // optional
      },
       redirect: "if_required", // Prevent automatic redirect
    });
    console.log(onSuccess)
    if (onSuccess?.paymentIntent?.status === "succeeded"){
      const ut=sessionStorage.getItem("user_token")
      try{
      const s=await apiService.deposit(ut,amount)
      console.log(s)
      setLoading(false);
      }catch(error){
        alert(error)
      }
    }
    else{
    setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={loading || !stripe || !elements}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default function CheckOut({amount}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if(amount>100){
    const token= sessionStorage.getItem("token")
    fetch("/api/fund/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" , "Authorization": token },
      body: JSON.stringify({amount: amount }), // $10
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));}
  }, [amount]);

  const appearance = { theme: "stripe" };

  return clientSecret ? (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance }}
    >
      <CheckoutForm amount={amount}/>
    </Elements>
  ) : (
    <div>Loading...</div>
  );
}
