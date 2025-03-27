import React, { useEffect, useState } from 'react'
import img from '../assets/the book thief.jpeg'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAllBooks } from '../store/slice/bookSlice'
import { togglereadBookPopup } from '../store/slice/popUpSlice'
import { Link, Navigate } from 'react-router-dom'
import Header from '../layout/Header'
import ProtectedRoutes from "../ProtectedRoutes"




const UserDashboard = () => {

  const dispatch = useDispatch()

  const {books} = useSelector((state)=>state.book)
  const {isAuthenticated} = useSelector((state)=>state.auth)

  

  const [readbook, setReadbook] = useState({});
  const [delbook, setDelbook] = useState("");
  const [save, setSave] = useState("notsave")
  

    useEffect(()=>{
      if(!isAuthenticated){
        return <Navigate to="/login"/>
      }
      dispatch(fetchAllBooks())
    },[dispatch, isAuthenticated])
  
    
  return (
    <>
      <ProtectedRoutes/>

     <div className='sidecontainer'>
    <Header/>

   
    <div className=" main">
      <div className='sidecontaier all'>
       
        <div className="dashboard-card">
            <div className="card-container">   
            {
    books && books.map((book, index)=>(

      <div className="card" key={index}>
                    <div className="card-img">
                        <img src={book.bookcover.url} alt="img"/>
                    </div>
                    <h3 className="text-center">{book.title}</h3>
                    <Link to={book.source}>
                    <button className="btn btn-view" >view</button>
                    </Link>
                </div>
    ))
  }
            </div>
        </div>
    </div>
     </div>
     </div>
    </>
  )
}

export default UserDashboard
