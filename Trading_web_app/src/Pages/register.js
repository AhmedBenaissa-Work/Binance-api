import { useState,useEffect } from "react"
import * as apiService from "../Services/Auth_api_service";
export default function Register(){
    const  [name,setName]=useState("")
    const  [email,setEmail]=useState("")
    const  [pass,setPass]=useState("")
    const handleChangeName = event => {
        event.preventDefault()
        setName(event.target.value)
    }
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
            "name":name
        }
    
        console.log(userData)
        apiService.confirm_user_creation(userData).then((response)=>{
            console.log(response)
            
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
                            <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                        </div>
                        <form class="user">
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                        placeholder="username" onChange={handleChangeName}/>
                                </div>
                               
                            </div>
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
                                Register Account
                            </a>
                            <hr/>
                            <a href="index.html" class="btn btn-google btn-user btn-block">
                                <i class="fab fa-google fa-fw"></i> Register with Google
                            </a>
                            <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
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