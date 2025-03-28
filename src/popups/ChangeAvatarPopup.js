import React, { useEffect, useState } from 'react'
import { toggleChangeAvatarPopup } from '../store/slice/popUpSlice'
import { addNewAvatar, fetchAllUsers } from '../store/slice/userSlice'
import closeIcon  from '../assets/close-square.png'
import keyIcon  from '../assets/key.png'
import placeholder  from '../assets/placeholder.jpg'
import { useDispatch, useSelector } from 'react-redux'


const ChangeAvatarPopup = () => {
  const {loading} = useSelector((state)=>state.user)
const [isUploading, setIsUploading] = useState(false);
    const handleAvatar = (e)=>{
            e.preventDefault()
            const data = new FormData();
                data.append("avatar", avatar)
                setIsUploading(true)
                dispatch(addNewAvatar(data)).finally(()=>setIsUploading(false))
              
    }
const {user} = useSelector((state)=>state.auth)

     const [avatar, setAvatar] = useState(null);
    const dispatch = useDispatch()
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || placeholder); 
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(file){
          const reader = new FileReader();
          reader.onload = ()=>{
            setAvatarPreview(reader.result)
          }
          reader.readAsDataURL(file)
          setAvatar(file)
        }
      };

    useEffect(()=>{
        dispatch(fetchAllUsers())
    }, [dispatch, loading])
  return (
    <>
         <div className='popup-overlay' onClick={()=>dispatch(toggleChangeAvatarPopup())}>
         <div className="admin-container" onClick={(e) => e.stopPropagation()} >
           <div className='admin-header'>
             <div className="admin-content">
               <header className='admin-heading'>
                 <div className='admin-img'>
                   <img src={keyIcon} alt="key-icon" className='key-icon'/>
                   <h3>Profile </h3>
                 </div>
                 <img src={closeIcon} alt="close-icon" onClick={()=>dispatch(toggleChangeAvatarPopup())}/>
               </header>
     
               <form onSubmit={handleAvatar} id='form-x'>
                 {/* Avatar selection */}
                 
                 <div className='avatar-section'>
                   <label htmlFor='avatarInput' className='cursor-pointer'>
                       <img src={avatarPreview} alt="avatar" className='avatar-img' />
                       <input type="file" id='avatarInput' accept='image/*' className='hidden' onChange={handleImageChange}/>
                   </label>
                 </div>
               <div className="btn-container">
                 <button type='button' className='btn3' onClick={()=>dispatch(toggleChangeAvatarPopup())}>Close</button>
                 <button type='submit' className='btn3' disabled={isUploading} >Add</button>
               </div>
               </form>
               
               
     
               
             </div>
           </div>
         </div>
         </div>
     
    </>
  )
}

export default ChangeAvatarPopup
