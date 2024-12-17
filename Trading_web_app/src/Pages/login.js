import { useState,useEffect } from "react"
import * as apiService from "../Services/Auth_api_service";
import {Navigate, useNavigate} from "react-router-dom"
export default function Login(){
   
    const  [email,setEmail]=useState("")
    const  [pass,setPass]=useState("")
    const navigate=useNavigate()
    const handleChangePass = event => {
        event.preventDefault()
        setPass(event.target.value)
    }
    const handleChangeEmail = event => {
        event.preventDefault()
        setEmail(event.target.value)
    }
    const onClick = event => {
        event.preventDefault()
        let userData = {
            "email":email,
            "password":pass,
            
        }
        
        console.log(userData)
        apiService.login(userData).then((response)=>{
           
           console.log(response)
           
                localStorage.setItem('token',response)
                navigate('/dashboard')
              
           
            
            
        })
    }
    return (

<div class="bg-gradient-primary" >

<div class="container">

    <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
            
            <div class="row">
                <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div class="col-lg-7">
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Sign In</h1>
                        </div>
                        <form class="user">
                           
                            <div class="form-group">
                                <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                    placeholder="Email Address" onChange={handleChangeEmail}/>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="password" class="form-control form-control-user"
                                        id="exampleInputPassword" placeholder="Password" onChange={handleChangePass}/>
                                </div>
                                <div class="col-sm-6">
                                    
                                </div>
                            </div>
                            <a href="login.html" class="btn btn-primary btn-user btn-block" onClick={onClick}>
                                sign in
                            </a>
                            <hr/>
                            <a href="index.html" class="btn btn-google btn-user btn-block">
                                <i class="fab fa-google fa-fw"></i> Sign in with Google
                            </a>
                            <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                <i class="fab fa-facebook-f fa-fw"></i> Sign in with Facebook
                            </a>
                        </form>
                        <hr/>
                        <div class="text-center">
                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                        <div class="text-center">
                            <a class="small" href="login.html">Already have an account? Login!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</div>
    )
}