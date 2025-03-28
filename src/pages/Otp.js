import React, { useEffect, useState } from 'react'; 
import { Navigate, useParams, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { OtpVerification, resetAuthSlice } from '../store/slice/authSlice';
import { toast } from 'react-toastify';
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'
import "../css/All.css"


const Otp = ()=> {
  const [isLoading, setIsloading] = useState(false)
  const { email } = useParams();
  const[otp, setOtp] = useState("") 

  const dispatch = useDispatch();

  const {loading ,
      error,
      message,
      user,
      isAuthenticated} = useSelector((state) => state.auth)
  
  const handleOtpVerification = async(e)=>{
      e.preventDefault();
      setIsloading(true)
      await dispatch(OtpVerification({email, otp}))
      setIsloading(false)
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

      const [rloading, setLoading] = useState(true);
    
      useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500); // ✅ Thoda wait karega taaki state load ho jaye
    }, []);
  
    if(isAuthenticated){
      return <Navigate to="/login"/>
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
            <button className="verify-btn">{isLoading ? "Verifying..." : "Verify"}</button>

        </div>
    </div>
    </form>
</div>

    </>
  )
}

export default Otp
