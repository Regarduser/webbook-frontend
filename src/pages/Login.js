import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Login, resetAuthSlice } from '../store/slice/authSlice';
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'

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
    <div className='otp-container'>
      {/* left side */}
      <div className='otp-left'>
      <div className='otp-container-left'>
          <div className='otp-text'>
            <div className='otp-img'>
                <img src={logo} alt="logo" />
            </div>
          </div>
          <h1 className='otp-message'>Welcome Back !!</h1>
          <p className='otp-p'>Please enter your credentails to log in</p>
          <div className='otp-form'>
          <form onSubmit={handleLogin}>
            <div className='form2'>
              <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='Email' className='form-input' />
              <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='Password' className='form-input' />
            </div>
          <Link to={"/password/forgot"} className='login-link'>Forgot Password ?</Link>
          <div className='login-to-register'>
            <p>New to our platform ? <Link to={"/register"} className='otp-p'>Sign Up</Link></p>
          </div>
          <button type='submit' className='btn-2'>Login</button>
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

export { Logins }
