import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addBook, fetchAllBooks} from '../store/slice/bookSlice'
import { toggleaddBookPopup } from '../store/slice/popUpSlice'
import { toast } from 'react-toastify'
import placeholder  from '../assets/upload.png'

const AddBookPopup = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [price , setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [description, setDescription] = useState("")

  const {message, loading } = useSelector(state => state.book)
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false)
  const [bookurl, setBookurl] = useState("")
  const handleAddbook = async(e)=>{
      e.preventDefault()
      const data = new FormData();
      data.append("title", title)
      data.append("author", author)
      data.append("description", description)
      data.append("bookcover", avatar)
      data.append("source", bookurl)
      setIsUploading(true)
      console.log([...data])
      await dispatch(addBook(data))
      dispatch(fetchAllBooks())
      setIsUploading(false)
  }

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
    if(message){
      toast.success(message)
      dispatch(fetchAllBooks())
    }
  }, [dispatch, loading, message])
  return (
    <>
        <div className='popup-overlay'>
        <div className='admin-container'>
          <div className='reading-content'>
            
               <h3 className='text-xl'> Add Book</h3>
               <form onSubmit={handleAddbook}>
                <div className="reading-header">
                  <label className='record-label'>Book Title</label>
                  <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Book title" className='borrow-input' required/>
    
                </div>
                <div className="reading-header">
                  <label className='record-label'>Book Author</label>
                  <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} placeholder="Book Author" className='borrow-input' required/>
    
                </div>
                <div className='avatar-section'>
                              <label htmlFor='avatarInput' className='cursor-pointer'>
                                  <img src={avatarPreview? avatarPreview : placeholder } alt="avatar" className='avatar-img' />
                                  <input type="file" id='avatarInput' accept='image/*' className='hidden' onChange={handleImageChange}/>
                              </label>
                            </div>
              <div className="reading-header">
                  <label className='record-label'>Book Url</label>
                  <input type="text" value={bookurl} onChange={(e)=>setBookurl(e.target.value)} placeholder="Book url" className='borrow-input' required/>
    
                </div>
                <div className="reading-header">
                  <label className='record-label'>Book Description</label>
                  <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} className='borrow-input'></textarea>
                </div>
                

                <div className='borrow-btn'>
                  <button className='btn3' onClick={()=>dispatch(toggleaddBookPopup())}>close</button>
                  <button className='btn3' disabled={isUploading} type='submit'>Add</button>
                </div>
               </form>
           
          </div>
        </div>
        </div>
      
    </>
  )
}

export default AddBookPopup;
