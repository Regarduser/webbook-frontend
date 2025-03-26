import React, { useEffect, useState } from 'react'
import { forgotPassword, resetAuthSlice } from '../store/slice/authSlice';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'



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
    <div className='otp-container' id='forgot-container'>
      {/* left side */}
      <div className='otp-left'>
        <Link to={"/login"} className='otp-link'>&larr;  Back</Link>
      <div className='otp-container-left'>
          <div className='otp-text'>
            <div className='otp-img'>
                <img src={logo} alt="logo" />
            </div>
          </div>
          <h1 className='otp-message'>Check your Mailbox</h1>
          <p className='otp-p'>Please enter the email to proceed</p>
          <div className='otp-form'>
          <form onSubmit={handleForgotPassword}>
            <div className='form2'>
              <input type="text" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='Email' className='form-input' required />
            </div>
          <button type='submit' className='btn-2' disabled={loading ? true : false}>Reset Password</button>
          </form>
          </div>
          
      </div>
      </div>

      {/* right side */}
      <div className='md-hidden otp-right ' id='forgot-right'>
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

export default ForgotPassword
