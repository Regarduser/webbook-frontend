import React, { useEffect, useState } from 'react'
import {Link, Navigate, Nevigate, useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import { resetAuthSlice, resetPassword } from '../store/slice/authSlice'
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'
import "../css/All.css"

const ResetPasswords = ()=> {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

const { token } = useParams();

const navigate = useNavigate();

const dispatch = useDispatch();

const {loading,
    error,
    message,
    user,
    isAuthenticated} = useSelector((state) => state.auth)

const handleResetPassword = (e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("password", password)
    data.append("confirmPassword", confirmPassword)
    dispatch(resetPassword(data, token))
}

useEffect(()=>{
  if(message){
    toast.success(message)
    dispatch(resetAuthSlice());
    navigate('/login')
  }
  if(error){
    toast.error(error)
    dispatch(resetAuthSlice());
  }
}, [dispatch, error, loading, message, navigate])





  return (
     <>
     <div className='login-body'>
        <div className="back-btn" >
        <Link to="/login" className="back-space"> &larr; Back</Link>
    </div>
    <div className="Main-header">
        <div className="Name-header">
            <header>Reset Password</header>
            <p>Create strong password for <br/>Your account</p>
        </div>
        <form onSubmit={handleResetPassword}>
        <div className="input-box">
        <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='password' className='input-field' />
        
        </div>
        <div className="input-box">
        <input type="password" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} placeholder='confirm password' className='input-field' />
        </div>
        <div className="input-submit">
            <button className="submit-btn" id="submit" >Submit</button>
        </div>
        </form>
        
    </div>
    </div>
          
        </>
  )
}

export default ResetPasswords
