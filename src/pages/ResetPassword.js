import React, { useEffect, useState } from 'react'
import {Link, Navigate, Nevigate, useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import { resetAuthSlice, resetPassword } from '../store/slice/authSlice'
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'

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
        <div className='otp-container'>
          {/* left side */}
          <div className='otp-left'>
            <Link to={"/password/forgot"} className='otp-link'>&larr;  Back</Link>
          <div className='otp-container-left'>
              <div className='otp-text'>
                <div className='otp-img'>
                    <img src={logo} alt="logo" />
                </div>
              </div>
              <h1 className='otp-message'>Reset Password</h1>
              <p className='otp-p'>Please enter your new password</p>
              <div className='otp-form'>
              <form onSubmit={handleResetPassword}>
                <div className='form2'>
                  <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='password' className='form-input' />
                  <input type="password" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} placeholder='confirm password' className='form-input' />
              
                </div>
              <button type='submit' className='btn-2'>Reset Password</button>
              </form>
              </div>
              
          </div>
          </div>
    
          {/* right side */}
          <div className='md-hidden otp-right'>
            <div>
              <div className='otp-img2'>
                <img src={logo_with_title} alt="logo" />
              </div>
              <p className='otp-p2'>New to our platform? Sign up now.</p>
              <Link to={"/register"} className='btn-2'>Sign Up</Link>
            </div>
          </div>
        </div>
          
        </>
  )
}

export default ResetPasswords
