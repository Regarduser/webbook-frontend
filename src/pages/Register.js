import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetAuthSlice, Register } from '../store/slice/authSlice'
import logo_with_title  from '../assets/logo-with-title.png'
import logo  from '../assets/black-logo.png'
import { Link } from 'react-router-dom'
import "../css/All.css"

function Registers() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const {loading ,
    error,
    message,
    user,
    isAuthenticated} = useSelector((state) => state.auth)

  const navigateTo = useNavigate();

  const handleRegister = (e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("name",name)
    data.append("email",email)
    data.append("password", password)
    dispatch(Register(data))
  }

  useEffect(()=>{
    if(message){
      toast.success(message)
      dispatch(resetAuthSlice());
      navigateTo(`/otp-verification/${email}`)
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

<div class="Main-header">
        <div class="Name-header">
            <header>Sign Up<span class="dando">|</span> BOOK LAB </header>
        </div>
        <form onSubmit={handleRegister}>
        <div class="input-box">
        <input type="text" class="input-field" placeholder="Your Name" autocomplete="off" required onChange={(e) => setName(e.target.value)}/>
        </div>
        
        <div class="input-box">
        <input type="text" class="input-field" placeholder="E-mail" autocomplete="off" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="input-box">
        <input type="password" class="input-field" placeholder="password" autocomplete="off" required onChange={(e) => setPassword(e.target.value)}  />
        </div>
        <div class="input-submit">
            <button class="submit-btn" id="submit">Sign Up</button>
            
        </div>
        </form>
        <div class="page-link">
            <p>Have an account? <Link to="/login">Login</Link></p>
        </div>
        
    </div>
</div>
        

    </>
  )
}

export default Registers
