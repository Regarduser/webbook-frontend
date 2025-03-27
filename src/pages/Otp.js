import React, { useEffect, useState } from 'react'; 
import { Navigate, useParams, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { OtpVerification, resetAuthSlice } from '../store/slice/authSlice';
import { toast } from 'react-toastify';
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'

const Otp = ()=> {
  const { email } = useParams();
  const[otp, setOtp] = useState("") 

  const dispatch = useDispatch();

  const {loading ,
      error,
      message,
      user,
      isAuthenticated} = useSelector((state) => state.auth)
  
  const handleOtpVerification = (e)=>{
    console.log("Email:", email, "OTP:", otp);
      e.preventDefault();
      dispatch(OtpVerification({email, otp}))
  }
  
  
    useEffect(()=>{
      // if(message){
      //   toast.success(message)
      // }
      if(error){
        toast.error(error)
        dispatch(resetAuthSlice());
      }
    }, [dispatch, isAuthenticated, error, loading])
  
    if(isAuthenticated){
      return <Navigate to="/login"/>
    }

  return (
    <>
    <div className='otp-container'>
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
          <p className='otp-p'>Please enter the otp to proceed</p>
          <div className='otp-form'>
          <form onSubmit={handleOtpVerification}>
            <div className='form2'>
              <input type="number" value={otp} onChange={(e) =>setOtp(e.target.value)} placeholder='OTP' className='form-input' />
          
          <button type='submit' className='btn-2'>Verify</button>
            </div>
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

export default Otp
