import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    
    const handleLoginForm = async (e)=>{
        e.preventDefault();
        const LoginpostData = {
            userName:userName,
            passcode:password
        }
        axios.post("http://localhost:5000/userLogin",LoginpostData)
        .then((data)=>{
            localStorage.setItem("token",data.data.token);
            navigate("/transactions");
        })
        .catch((err)=>{
        
            alert("login failed");
        })
    }

  return (
    <div className='home' >
        <form className='loginform' onSubmit={handleLoginForm} >
            <h1>Login</h1>
            <input className='inputfield' onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder='username' />
            <input className='inputfield' onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password' />
            <input className='button' type="submit" value="Login" />
        </form>
    </div>
  )
}

export default Login