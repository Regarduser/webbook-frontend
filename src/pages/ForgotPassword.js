import React, { useEffect, useState } from 'react'
import { forgotPassword, resetAuthSlice } from '../store/slice/authSlice';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'
import "../css/All.css"



const ForgotPassword = ()=> {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")

  const dispatch = useDispatch();

  const {loading,
    error,
    message,
    user,
    isAuthenticated} = useSelector((state) => state.auth)

const handleForgotPassword = (e)=>{
  e.preventDefault();
  dispatch(forgotPassword(email))
}
  useEffect(()=>{
    if(message){
      toast.success(message)
      dispatch(resetAuthSlice());
    }
    if(error){
      toast.error(error)
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading])
  
  if(isAuthenticated){
    return <Navigate to="/"/>
  }


  return (
    <>
      <div className='login-body'>
    <div className="back-btn" >
        <Link to="/login" className="back-space"> &larr; Back</Link>
    </div>
    <div className="logo">
        <i className="fa-solid fa-question" ></i>
    </div>
    <div className="Main-header">
        <div className="Name-header">
            <header>Forget Password</header>
            <p>Enter your registered <br/>E-mail</p>
        </div>
        <form onSubmit={handleForgotPassword}>
        <div className="input-box">
        <input type="text" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='Email' class="input-field" required />
        </div>
        <div className="input-submit">
        <button type='submit' className='Reset-btn' disabled={loading ? true : false}>Reset Password</button>
        </div>
        </form>
        
    </div>
    </div>
      
    </>
  )
}

export default ForgotPassword
