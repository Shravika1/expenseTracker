import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const handleRegister = (e)=>{
        if(userName.length<5 && password.length<5){
            alert("username and password must be of length 8");
            return;
        }
        const userRegisterData = {
            userName:userName,
            passcode:password
        }
        axios.post("http://localhost:5000/userSignup",userRegisterData)
        .then((data)=>{
            localStorage.setItem("token",data.data.token);
            navigate("/transactions");
        })
        .catch((err)=>{
            alert("registration failed");
        })
        e.preventDefault();

    }

  return (
    <div className='home'>
        <form className='loginform' onSubmit={handleRegister} >
            <h1>Register</h1>
        <input className='inputfield' onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder='Username' />
        <input className='inputfield' onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password' />
        <input className='button' type="submit" value="Register" />
        </form>
    </div>
  )
}

export default Register