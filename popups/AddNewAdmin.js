import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addNewAdmin} from '../store/slice/userSlice'
import { toggleAddNewAdminPopup } from '../store/slice/popUpSlice';
import closeIcon  from '../assets/close-square.png'
import keyIcon  from '../assets/key.png'
import placeholder  from '../assets/placeholder.jpg'


const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>
    state.user
  )

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

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

  const handleNewAdmin = (e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("name", name)
    data.append("email", email)
    data.append("password", password)
    data.append("avatar", avatar)
    dispatch(addNewAdmin(data))
  }
  const upper = ()=>{
     const hello =  document.querySelector('.admin-container')
     hello.classList.toggle("z-index")
  }
  return (
   
    <>
    <div className='popup-overlay'>
    <div className="admin-container" >
      <div className='admin-header'>
        <div className="admin-content">
          <header className='admin-heading'>
            <div className='admin-img'>
              <img src={keyIcon} alt="key-icon" className='key-icon'/>
              <h3 onClick={upper}>Add new Admin</h3>
            </div>
            <img src={closeIcon} alt="close-icon" onClick={()=>dispatch(toggleAddNewAdminPopup())}/>
          </header>

          <form onSubmit={handleNewAdmin}>
            {/* Avatar selection */}
            <div className='avatar-section'>
              <label htmlFor='avatarInput' className='cursor-pointer'>
                  <img src={avatarPreview? avatarPreview : placeholder } alt="avatar" className='avatar-img' />
                  <input type="file" id='avatarInput' accept='image/*' className='hidden' onChange={handleImageChange}/>
              </label>
            </div>
          <div className="text-content">
            <label className='text'>Name</label>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Admin's Name" className='admin-input' />
          </div>
          <div className="text-content">
            <label className='text'>Email</label>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Admin's Email" className='admin-input' />
          </div>
          <div className="text-content">
            <label className='text'>Password</label>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Admin's Password" className='admin-input' />
          </div>

          <div className="btn-container">
            <button type='button' className='btn3' onClick={()=>dispatch(toggleAddNewAdminPopup())}>Close</button>
            <button type='submit' className='btn3' >Add</button>
          </div>
          
          

          </form>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default AddNewAdmin
