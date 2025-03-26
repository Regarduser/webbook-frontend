import React, { useEffect, useState } from 'react'
import logo_with_title from '../assets/logo-with-title-black.png'
import returnIcon from '../assets/redo.png'
import browseIcon from '../assets/pointing.png'
import bookIcon from '../assets/book-square.png'
import {Pie} from 'react-chartjs-2'
import {useDispatch, useSelector} from 'react-redux'
import Header from '../layout/Header'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
} from "chart.js";
import logo from "../assets/black-logo.png"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
)


const UserDashboard = () => {
  const {settingPopup} = useSelector(state => state.popup)
  const {userBorrowedBooks} = useSelector(state => state.borrow)

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0)
  const [totalReturnedBooks, setTotalReturnBooks] = useState(0)

useEffect(()=>{
    let NumberOfTotalBorrowedBooks = userBorrowedBooks.filter((book)=>book.returned === false)
    let NumberOfTotalReturnedBooks = userBorrowedBooks.filter((book)=>book.returned === true)
    setTotalBorrowedBooks(NumberOfTotalBorrowedBooks.length)
    setTotalReturnBooks(NumberOfTotalReturnedBooks.length)
}, [userBorrowedBooks])

const data = {
  labels : ["Total Borrowed Books", "Total Returned Books"],
  datasets : [{
    data : [totalBorrowedBooks, totalReturnedBooks],
    backgroundColor : ["#3D3E3E","#151619"],
    hoverOffset: 4
  

  }]
}
  return (
    <>
    <div className='sidecontainer'>
    <Header/>
    </div>
      <div className='sidecontainer userdashboard-container'>
        
        <div className='user-header userdashboard-left-header'>
          {/* left side */}
          <div className='userdahboard-left-heading  min-h-[85.5vh]'>
              <div className='userdashboard-left-container'>
                <div className='userdashboard-left-content'>
                  <div className='userdashboard-left-text'>
                    <span className='user-span'></span>
                    <span className='user-span2'>
                      <img src={bookIcon} alt="book-icon" width={'25px'} height={'25px'}/>
                    </span>
                    <p className='user-p'>Your Borrowed Books List</p>
                  </div>
                  <div className='userdashboard-left-text'>
                    <span className='user-span'></span>
                    <span className='user-span2'>
                      <img src={returnIcon} alt="book-icon" width={'25px'} height={'25px'}/>
                    </span>
                    <p className='user-p'>Your Return Books List</p>
                  </div>
                </div>
                <div className='user-left-content-2 flex flex-col lg-flex-row gap-7'>
                <div className='userdashboard-left-text'>
                    <span className='user-span'></span>
                    <span className='user-span2'>
                      <img src={browseIcon} alt="book-icon" width={'25px'} height={'25px'}/>
                    </span>
                    <p className='user-p'>let's browse book's inventory</p>
                  </div>
                  <img src={logo_with_title} alt="logo" className='logo_title md-hidden'/>
                </div>
              </div>
          </div>
          <div className='userdashbord-left-heading-2'>
                <h4 className='user-h'>""</h4>
                <p className='user-p2'>~ BookLab Team</p>
              </div>
        </div>
          {/* right side */}
          <div className='user-header userdashboard-right-header'>
            <div className='pi-chart-class'>
              <Pie data={data} options={{cutout : 0}} className='pi-chart'/>
            </div>
            <div className='userdashboard-right-container'></div>
          </div>
      </div>
    </>
  )
}

export default UserDashboard
