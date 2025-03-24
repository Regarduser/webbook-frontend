import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {resetAuthSlice, updatePassword} from '../store/slice/authSlice'
import closeIcon  from '../assets/close-square.png'
import setting  from '../assets/setting.png'
import placeholder  from '../assets/placeholder.jpg'
import { toggleSettingPopup } from '../store/slice/popUpSlice'
import { toast } from 'react-toastify'

const SettingPopup = () => {
  const [currentPassword, SetcurrentPassword] = useState("") 
  const [newPassword, SetnewPassword] = useState("") 
  const [confirmNewPassword, SetconfirmNewPassword] = useState("") 

  const dispatch = useDispatch()
  const {loading, message} = useSelector((state)=> state.auth);
  const handleUpdatePassword = (e)=>{
    e.preventDefault()
    const data = new FormData()
    data.append("currentPassword", currentPassword)
    data.append("newPassword", newPassword)
    data.append("confirmNewPassword", confirmNewPassword)

    dispatch(updatePassword(data))
    
      
  }
  useEffect(()=>{
    if(message){
      toast.success(message)
      dispatch(resetAuthSlice())
    }
  }, [dispatch , loading, message])
  return (
    <div>
       <div className='popup-overlay'>
          <div className="admin-container">
            <div className='admin-header'>
              <div className="admin-content">
                <header className='admin-heading'>
                  <div className='admin-img'>
                    <img src={setting} alt="key-icon" className='key-icon'/>
                    <h3>Update Password</h3>
                  </div>
                  <img src={closeIcon} alt="close-icon" onClick={()=>dispatch(toggleSettingPopup())} className='icon'/>
                </header>
      
                <form onSubmit={handleUpdatePassword}>
                  {/* Avatar selection */}
           
                <div className="text-content">
                  {/* <label className='text'>current Password</label> */}
                  <input type="password" value={currentPassword} onChange={(e)=> SetcurrentPassword(e.target.value)} placeholder="current password" className='admin-input' />
                </div>
                <div className="text-content">
                  {/* <label className='text'>Email</label> */}
                  <input type="password" value={newPassword} onChange={(e)=> SetnewPassword(e.target.value)} placeholder="new Password" className='admin-input' />
                </div>
                <div className="text-content">
                  {/* <label className='text'>Password</label> */}
                  <input type="password" value={confirmNewPassword} onChange={(e)=> SetconfirmNewPassword(e.target.value)} placeholder="confirm Password" className='admin-input' />
                </div>
      
                <div className="btn-container">
                  <button type='button' className='btn3' onClick={()=>dispatch(toggleSettingPopup())}>Close</button>
                  <button type='submit' className='btn3' >Add</button>
                </div>
                
                
      
                </form>
              </div>
            </div>
          </div>
          </div>
    </div>
  )
}

export default SettingPopup
