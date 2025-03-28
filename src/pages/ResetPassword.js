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
  const [isLoading, setIsLoading] = useState(false)

const handleResetPassword = async(e)=>{
    e.preventDefault();
    setIsLoading(true)
    const data = new FormData();
    data.append("password", password)
    data.append("confirmPassword", confirmPassword)
    await dispatch(resetPassword(data, token))
    setIsLoading(false)

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

 const [rloading, setLoading] = useState(true);
    
      useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500); // ✅ Thoda wait karega taaki state load ho jaye
    }, []);


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
   <div className="Main-header">
       <div className="Name-header">
           <header>Reset Password</header>
           <p>Create strong password for <br/>Your account</p>
       </div>
       <form onSubmit={handleResetPassword}>
       <div className="input-box">
       <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='New Password' className='input-field' />
       
       </div>
       <div className="input-box">
       <input type="password" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='input-field' />
       </div>
       <div className="input-submit">
           <button className="submit-btn" id="submit" >{isLoading ? "Changing..." : "Submit"}</button>
       </div>
       </form>
       
   </div>
   </div>
         
       </>
  )
}

export default ResetPasswords
