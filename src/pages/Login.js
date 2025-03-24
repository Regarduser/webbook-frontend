import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Login, resetAuthSlice } from '../store/slice/authSlice';
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'
import "../css/All.css"

const Logins = ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();


  const {loading ,
    error,
    message,
    user,
    isAuthenticated} = useSelector((state) => state.auth)

  
    useEffect(() => {
      if (message) {
        toast.success(message);
        setTimeout(() => {
          dispatch(resetAuthSlice());
        }, 1000);
      }
  
      if (error) {
        toast.error(error);
        dispatch(resetAuthSlice());
      }
    }, [message, error, dispatch]);
  
  

const handleLogin = (e)=>{
  e.preventDefault();
  const data = new FormData();
  data.append("email", email)
  data.append("password", password)
  dispatch(Login(data))
}

if(isAuthenticated){
  return <Navigate to="/"/>
}

  return (
    <>
    <div className='login-body'>

    <div className="Main-header">
        <div className="Name-header">
            <header>Login<span className="dando">|</span> BOOK LAB </header>
        </div>
        <form onSubmit={handleLogin}>
        <div className="input-box">
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="input-field" placeholder="E-mail" autocomplete="off" required/>
        </div>
        <div className="input-box">
            <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} className="input-field" placeholder="password" autocomplete="off" required/>
        </div>
        <div className="forget">
            <section>
                <Link to="/password/forgot">Forget Password ?</Link>
            </section>
        </div>

        <div className="input-submit">
            <button className="submit-btn" id="submit">Login</button>
        </div>

        </form>
        <div className="page-link">
        <p>Don't have account? <Link to="/register">Sign Up</Link></p>
        </div>
    </div>
    </div>
    </>
  )
}

export { Logins }
