import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetAuthSlice, Register } from '../store/slice/authSlice'
import logo_with_title  from '../assets/logo-with-title.png'
import logo  from '../assets/black-logo.png'
import { Link } from 'react-router-dom'

function Registers() {
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

  const handleRegister = (e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("name",name)
    data.append("email",email)
    data.append("password", password)
    dispatch(Register(data))
  }

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

  return (
    <>
      <div className='register-main'>

        {/* left side */}
        <div className='md-hidden register-left'>
          <div className='text'>
            <div className='otp-img2'>
              <img src={logo_with_title} alt="logo" />
            </div>
            <p className='otp-p2'>already have Account ? sign in now.</p>
            <Link to={"/login"} className='btn'>SIGN IN</Link>
          </div>
        </div>
        {/* right  side */}
        <div className='register-right'>
          <div >
            <div className='right-text'>
            <div className='right-heading'>
            <h3 className='sign-text'>SIGN UP</h3>
            <img className='logo-right' src={logo} alt="logo" />
            </div>
            </div>
            <p className='right-p'>Please provide your information to Sign Up</p>
            <form onSubmit={handleRegister}>
              <div className='form'>
                <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder='Full Name'
                className='form-input'
                />
              </div>
              <div className='form'>
                <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='email Address'
                className='form-input'
                />
                </div>
                <div className='form'>
                <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Password'
                className='form-input'
                />
              </div>
              <div className='login-to-register form-text'>
              <p>Already have account ?
                <Link to='/login' className='form-text'> Sign In</Link>
              </p>
              </div>
              <button type='submit' className='btn-2'>Sign Up</button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Registers
