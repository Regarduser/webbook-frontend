import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetAuthSlice, Register } from '../store/slice/authSlice'
import logo_with_title  from '../assets/logo-with-title.png'
import logo  from '../assets/black-logo.png'
import { Link } from 'react-router-dom'

function Registers() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const {loading ,
    error,
    message,
    user,
    isAuthenticated} = useSelector((state) => state.auth)

  const navigateTo = useNavigate();

  const handleRegister = async(e)=>{
    e.preventDefault();
    setIsLoading(true)
    const data = new FormData();
    data.append("name",name)
    data.append("email",email)
    data.append("password", password)
    await dispatch(Register(data))
    setIsLoading(false)
  }

    const [rloading, setLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
          setLoading(false);
      }, 1500); // ✅ Thoda wait karega taaki state load ho jaye
  }, []);

  useEffect(()=>{
    if(message){
      toast.success(message)
      dispatch(resetAuthSlice());
      navigateTo(`/otp-verification/${email}`)
    }
    if(error){
      toast.error(error)
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading])

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
            <header>Sign Up<span className="dando">|</span> BOOK LAB </header>
        </div>
        <form onSubmit={handleRegister}>
        <div className="input-box">
        <input type="text" className="input-field" placeholder="Your Name" autocomplete="off" required onChange={(e) => setName(e.target.value)}/>
        </div>
        
        <div className="input-box">
        <input type="text" className="input-field" placeholder="E-mail" autocomplete="off" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-box">
        <input type="password" className="input-field" placeholder="password" autocomplete="off" required onChange={(e) => setPassword(e.target.value)}  />
        </div>
       
        <div className="input-submit">
            <button className="submit-btn" id="submit">{isLoading ? "signing up..." : "Sign up"}</button>
            
        </div>
        </form>
       
        <div className="page-link2">
            <p>Have an account? <Link to="/login">Login</Link></p>
        </div>
        
    </div>
</div>
        

    </>
  )
}

export default Registers
