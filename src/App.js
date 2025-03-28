import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import {Logins } from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Otp from './pages/Otp'
import { ToastContainer } from 'react-toastify'
import ResetPasswords from './pages/ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slice/authSlice';
import { fetchAllUsers } from './store/slice/userSlice';
import { fetchAllBooks } from './store/slice/bookSlice';
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from './store/slice/borrowSlice';

const App = ()=> {
  
  const {
    user,
    isAuthenticated} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    }, 1500); // ✅ Thoda wait karega taaki state load ho jaye
}, []);



  // const [user, setUser] = useState({ role: "Admin" }); 
  

  

  // useEffect(()=>{
  //   dispatch(getUser());
  //   dispatch(fetchAllBooks())
  //   if(isAuthenticated && user?.role === "user"){
  //     dispatch(fetchUserBorrowedBooks())
  //   }
  //   if(isAuthenticated && user?.role === "Admin"){
  //     dispatch(fetchAllUsers())
  //     dispatch(fetchAllBorrowedBooks())
  //   }
  // }, [isAuthenticated, dispatch])
  // document.addEventListener("dblclick", (event) => {
  //   event.preventDefault();
  // });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(fetchAllBooks());
      if (user.role === "user") {
        dispatch(fetchUserBorrowedBooks());
      }
      if (user.role === "Admin") {
        dispatch(fetchAllUsers());
        dispatch(fetchAllBorrowedBooks());
      }
    }
  }, [isAuthenticated, user, dispatch]);

  if (loading) {
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
    <Router>
      <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Logins/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/password/forgot" element={<ForgotPassword/>}/>
    <Route path="/otp-verification/:email" element={<Otp/>}/>
    <Route path="/password/reset/:token" element={<ResetPasswords/>}/>
      </Routes>
      <ToastContainer theme='dark'/>
    </Router>
    </>
  );
}

export default App;
