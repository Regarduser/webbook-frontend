import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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

function App() {
  const {
    user,
    isAuthenticated} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // const [user, setUser] = useState({ role: "Admin" }); 
  

  

  useEffect(()=>{
    dispatch(getUser());
    dispatch(fetchAllBooks())
    if(isAuthenticated && user?.role === "Admin"){
      dispatch(fetchAllUsers())
    }
  }, [isAuthenticated])
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
