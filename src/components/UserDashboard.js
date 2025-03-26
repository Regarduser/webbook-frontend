import React, { useEffect, useState } from 'react'
import img from '../assets/the book thief.jpeg'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAllBooks } from '../store/slice/bookSlice'
import { togglereadBookPopup } from '../store/slice/popUpSlice'
import { Link } from 'react-router-dom'
import Header from '../layout/Header'


const UserDashboard = () => {

  const dispatch = useDispatch()

  const {books} = useSelector((state)=>state.book)

  

  const [readbook, setReadbook] = useState({});
  const [delbook, setDelbook] = useState("");
  const [save, setSave] = useState("notsave")
  


  useEffect(()=>{
    dispatch(fetchAllBooks())
  },[])
  

  return (
    <>
    <div className='sidecontainer'>
    <Header/>

   
    <div className=" main">
      <div className='sidecontaier all'>
        <div className=" dashboard-container">
            <div className="dashboard-content">
                <h2 className="text-center">books for you</h2>
            </div>
        </div>
        <div className="dashboard-card">
            <div className="card-container">   
            {
    books && books.map((book, index)=>(

      <div className="card" key={index}>
                    <div className="card-img">
                        <img src={img} alt="img"/>
                    </div>
                    <h3 className="text-center">{book.title}</h3>
                    <Link to={'https://drive.google.com/file/d/17DS59Fo_gPjLC6mmY0gJhmw6nk1R8vCi/view?usp=drive_link'}>
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
