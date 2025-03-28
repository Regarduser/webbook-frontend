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
    const [isLoading, setIsLoading] = useState(false)
  

  const dispatch = useDispatch();

  const {loading,
    error,
    message,
    user,
    isAuthenticated} = useSelector((state) => state.auth)

const handleForgotPassword = async(e)=>{
  e.preventDefault();
  setIsLoading(true)
  await dispatch(forgotPassword(email))
  setIsLoading(false)
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
    const [rloading, setLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
          setLoading(false);
      }, 1500); // ✅ Thoda wait karega taaki state load ho jaye
  }, []);
  
  if(isAuthenticated){
    return <Navigate to="/"/>
  }

  if (rloading) {
    return (
      <>
          <div className="wrapper">
        <div className="loader">
            <span style={{"--i":1}}></span>
            <span style={{"--i":2}}></span>
            <span style={{"--i":3}}></span>
            <span style={{"--i":4}}></span>
            <span style={{"--i":5}}></span>
            <span style={{"--i":6}}></span>
            <span style={{"--i":7}}></span>
        </div>
         <svg className='svg2'>
            <filter id="liquid">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                <feColorMatrix type="matrix" values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10
                "/>
            </filter>
        </svg>
    </div>  
      </>
    ); 
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
        <button type='submit' className='Reset-btn' disabled={loading ? true : false}>{isLoading? "send mail..." : "Reset Password"}</button>
        </div>
        </form>
        
    </div>
    </div>
      
    </>
  )
}

export default ForgotPassword
