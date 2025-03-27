import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Users_logo  from '../assets/user.png'
import setting_logo  from '../assets/setting.png'
import { toggleChangeAvatarPopup, toggleSettingPopup } from '../store/slice/popUpSlice'

import ChangeAvatarPopup from '../popups/ChangeAvatarPopup'


const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const [currentTime, setCurrentTime] = useState("")
    const [currentDate, setCurrentDate] = useState("")
    const [avatar, setAvatar] = useState(user?.avatar?.url || Users_logo);

    const {changeAvatarPopup} = useSelector((state)=>state.popup)
    
    useEffect(()=>{
      // dispatch(fetchAllUsers())
        const updateDateTime = ()=>{
            const now = new Date()
            const hours = now.getHours() % 12 || 12
            const minutes = now.getMinutes().toString().padStart(2, "0")
            const AmPm = now.getHours() >=12 ? "PM" : "AM"
            setCurrentTime(`${hours}:${minutes}:${AmPm}`)

            const options = {month : "short" , year : "numeric"}
            setCurrentDate(now.toLocaleDateString("en-US", options))
        };
        updateDateTime();

        const intervalId = setInterval(updateDateTime, 1000);
        return ()=> clearInterval(intervalId)
    }, [dispatch, user])

    useEffect(() => {
      if (user?.avatar?.url) {
          setAvatar(`${user.avatar.url}?t=${Date.now()}` || Users_logo); // ✅ Cache busting
      }
  }, [user?.avatar?.url]);
  return (
    <>
      <header className='header'>
        {/* left side */}
        <div className='header-left'>
        <img src={avatar} alt="user" onClick={()=>dispatch(toggleChangeAvatarPopup())} />
        <div className='header-leftName'>
            <span>
                {user && user.name}
            </span>

            {/* <span> Ram pareek</span> */}
            <span>{user && user.role}</span>
            {/* <span>Admin</span> */}
        </div>
        </div>
        {/* right side */}
        <div className='md-hidden header-right'>
            <div className=' text-sm lg:text-base item-end font-semibold header-rightTime'>
                <span>{currentTime}</span>
                <span>{currentDate}</span>
            </div>
            <span className='bg-black hight-14, w-2px devider'/>
            <img src={setting_logo} alt="setting" width="200px" onClick={()=>dispatch(toggleSettingPopup())} />
        </div>
      </header>
      {changeAvatarPopup && <ChangeAvatarPopup/>}

    </>
  )
}

export default Header
