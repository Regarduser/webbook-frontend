import React, { useEffect, useState } from 'react'; 
import { Navigate, useParams, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { OtpVerification, resetAuthSlice } from '../store/slice/authSlice';
import { toast } from 'react-toastify';
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'
import "../css/All.css"

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
      return <Navigate to="/"/>
    }

  return (
    <>
    <div className='login-body'>
      <div className="main">
    <form onSubmit={handleOtpVerification}>
        
        <div className="icon text-center ">
            <span className="material-symbols-outlined" id="icon">
                mark_email_read
                </span>
        </div>
           
    <h1 className="block">Verification code</h1>
    <div className="Otp text-center">
        <input type="text" maxLength={5} value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='Enter Code' id="i1" inputmode="numeric"/>
        {/* <input type="text" id="i2" maxlength="1" inputmode="numeric"/>
        <input type="text" id="i3" maxlength="1" inputmode="numeric"/>
        <input type="text" id="i4" maxlength="1" inputmode="numeric"/>
        <input type="text" id="i5" maxlength="1" inputmode="numeric"/> */}
        <div className="resend">
            <section>
                <Link href="#">Resend Otp</Link>

            </section>
        </div>
        <div className="btn">
            <button className="verify-btn">Verify</button>

        </div>
    </div>
    </form>
</div>
</div>
    </>
  )
}

export default Otp
