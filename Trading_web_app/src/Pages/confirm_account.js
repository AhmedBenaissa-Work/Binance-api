import { useState,useEffect,useLocation } from "react";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom"
export default function ConfirmAccount(){

    const [token, setToken] = useState('');
  
  const navigate=useNavigate()
  useEffect(() => {
    const getTokenFromQueryString = () => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get('q');
    };

    const tokenFromQuery = getTokenFromQueryString();
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
      console.log(tokenFromQuery)
      localStorage.setItem('token',tokenFromQuery)
      navigate('/transfer_funds')
    }
  }, [window.location.search]);

}