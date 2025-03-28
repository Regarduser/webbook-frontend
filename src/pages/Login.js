import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Login, resetAuthSlice } from '../store/slice/authSlice';
import logo  from '../assets/black-logo.png'
import logo_with_title  from '../assets/logo-with-title.png'
import "../css/All.css"

const Logins = ()=> {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();


  const {loading ,
    error,
    message,
    user,
    isAuthenticated} = useSelector((state) => state.auth)
    const [rloading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    }, 1500); // ✅ Thoda wait karega taaki state load ho jaye
}, []);

  
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
  
  

const handleLogin = async(e)=>{
  e.preventDefault();
  setIsLoading(true)
  const data = new FormData();
  data.append("email", email)
  data.append("password", password)
  await dispatch(Login(data))
  setIsLoading(false)
}

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

    <div className="Main-header">
        <div className="Name-header">
            <header>Login<span className="dando">|</span> BOOK LAB </header>
        </div>
        <form onSubmit={handleLogin}>
        <div className="input-box">
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="input-field" placeholder="E-mail" required/>
        </div>
        <div className="input-box">
            <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} className="input-field" placeholder="password" required/>
        </div>
        <div className="forget">
            <section>
                <Link to="/password/forgot">Forget Password ?</Link>
            </section>
        </div>

        <div className="input-submit">
            <button className="submit-btn" id="submit">{isLoading ? "Loggin..." : "Login"}</button>
        </div>

        </form>
        <div className="page-link">
        <p>Don't have account? <Link to="/register">Sign Up</Link></p>
        </div>
    </div>
    </div>
    </>
  )
}

export { Logins }
