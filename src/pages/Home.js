import '../css/Home.css'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Navigate } from 'react-router-dom'
import { Sidebar } from '../layout/Sidebar'
import UserDashboard from '../components/UserDashboard'
import AdminDashboard from '../components/AdminDashboard'
import BookManagement from '../components/BookManagement'
import Catalog from '../components/Catalog'
import MyBorrowedBooks from '../components/MyBorrowedBooks'
import Users from '../components/Users'

function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [selectComponent, setSelectComponent] = useState("")
  // const [user, setUser] = useState({ role: "Admin" });  //local use



  const { user, isAuthenticated } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
 

  // ✅ Function to handle component rendering
  const renderComponent = () => {
    switch (selectComponent) {
      case "Dashboard":
        return user?.role === "user" ? (
          <UserDashboard />
        ) : (
          <AdminDashboard />
        )

      case "Books":
        return <BookManagement />

      case "Catalog":
        if (user.role === "Admin") {
          return <Catalog />
        }
        break

      case "Users":
        if (user?.role === "Admin") {
          return <Users />
        }
        break

      case "My Borrow Books":
        return <MyBorrowedBooks />

      default:
        return user?.role === "user" ? (
          <UserDashboard />
        ) : (
          <AdminDashboard />
        )
    }
  }

  return (
    <>
      <div className='menu-btn'>
        <GiHamburgerMenu 
          className='hemburger' 
          onClick={() => setIsSideBarOpen(!isSideBarOpen)} 
        />
      </div>

      {/* ✅ Sidebar */}
      <Sidebar 
        isSideBarOpen={isSideBarOpen} 
        setIsSideBarOpen={setIsSideBarOpen} 
        setSelectComponent={setSelectComponent} 
      />

      {/* ✅ Render Component */}
      {renderComponent()}
    </>
  )
}

export default Home
