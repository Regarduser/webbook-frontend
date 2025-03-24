import React, { useEffect, useState } from 'react'
import logo_with_title  from '../assets/logo-with-title.png'
import Dashboard_logo  from '../assets/element.png'
import Book_logo  from '../assets/book.png'
import Close_logo  from '../assets/white-close-icon.png'
import setting_logo  from '../assets/setting-white.png'
import logout_logo  from '../assets/logout.png'
import Catalog_logo  from '../assets/catalog.png'
import {RiAdminFill} from 'react-icons/ri'
import Users_logo  from '../assets/people.png'
import { useDispatch, useSelector } from 'react-redux'
import { Logout, resetAuthSlice } from '../store/slice/authSlice';
import { toggleAddNewAdminPopup, toggleSettingPopup } from '../store/slice/popUpSlice';
import { toast } from 'react-toastify';
import AddNewAdmin from '../popups/AddNewAdmin'
import SettingPopup from '../popups/SettingPopup'

const Sidebar = ({isSideBarOpen, setIsSideBarOpen, setSelectComponent}) => {
const dispatch = useDispatch();
const { addNewAdminPopup, settingPopup } = useSelector((state) => state.popup)


const {loading,
  error,
  message,
  user ,
  isAuthenticated} = useSelector(state => state.auth)
  const handleLogout = ()=>{
    dispatch(Logout())
  }

  // const [user, setUser] = useState({ role: "Admin" });  //local use


  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(resetAuthSlice())
    }
    if(message){
      // toast.success(message)
      dispatch(resetAuthSlice())
    }
  }, [dispatch, isAuthenticated, error , loading, message])
  return (
    <>
      <aside className={`sidebar ${isSideBarOpen ? "left-0" : "left-full"}`}>
 
      <div className='sidemain'>
      <img src={logo_with_title} alt="logo" />
      </div>
      <nav className='sideNav'>
        <button className='sideNavbtn' onClick={()=>setSelectComponent("Dashboard")}>
          <img src={Dashboard_logo} alt="dashboard" />
          <span>Dashboard</span>
        </button>
        <button className='sideNavbtn' onClick={()=>setSelectComponent("Books")}>
          <img src={Book_logo} alt="dashboard" />
          <span>Books</span>
        </button>
        {
          isAuthenticated && user?.role === "Admin" && ( 
            <>
            <button className='sideNavbtn' onClick={()=>setSelectComponent("Catalog")}>
          <img src={Catalog_logo} alt="dashboard" />
          <span>Catalog</span>
        </button>
        <button className='sideNavbtn' onClick={()=>{
          setSelectComponent("Users")}} >
          <img src={Users_logo} alt="Users" />
          <span>Users</span>
        </button>
        <button className='sideNavbtn ' onClick={()=>dispatch(toggleAddNewAdminPopup())} >
          
          <RiAdminFill className="Riadmin" /> <span>Add new admin</span>
        </button>
            </>
          )
        }
      {
        isAuthenticated && user?.role === "user" && (
          <>
          <button className='sideNavbtn' onClick={()=>setSelectComponent("My Borrow Books")}>
          <img src={Catalog_logo} alt="Users" />
          <span>My Borrowed Books</span>
        </button>
          </>
        )
      }
      <button className='sideNavbtn' onClick={()=>dispatch(toggleSettingPopup())}>
          <img src={setting_logo} alt="Users" />
          <span>Update Credentials</span>
        </button>
      </nav>
      <button className='sidelogout' onClick={handleLogout}>
        <img src={logout_logo} alt="logout"/>
        <span>Logout</span>
      </button>
      <img className='close-btn' src={Close_logo} alt="close" onClick={()=>setIsSideBarOpen(!isSideBarOpen)}/>
      </aside>
      <div className="sidecontainer">
         {addNewAdminPopup && <AddNewAdmin/>}
         {settingPopup && <SettingPopup/>}
      </div>
    </>
  )
}

export {Sidebar}
