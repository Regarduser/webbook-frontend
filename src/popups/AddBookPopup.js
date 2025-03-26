import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addBook, fetchAllBooks} from '../store/slice/bookSlice'
import { toggleaddBookPopup } from '../store/slice/popUpSlice'
import { toast } from 'react-toastify'

const AddBookPopup = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [price , setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [description, setDescription] = useState("")

  const {message, loading } = useSelector(state => state.book)

  const handleAddbook = (e)=>{
      e.preventDefault()
      const data = new FormData();
      data.append("title", title)
      data.append("author", author)
      data.append("price", price)
      data.append("quantity", quantity)
      data.append("description", description)
      dispatch(addBook(data))
      dispatch(fetchAllBooks())
  }

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
                <div className="reading-header">
                  <label className='record-label'>Book Price for Borrow</label>
                  <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Book Borrow Price" className='borrow-input'  required/>
    
                </div>
                <div className="reading-header">
                  <label className='record-label'>Book Quantity</label>
                  <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder="Book quantity" className='borrow-input' required/>
    
                </div>
                <div className="reading-header">
                  <label className='record-label'>Book Description</label>
                  <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} className='borrow-input'></textarea>
                </div>

                <div className='borrow-btn'>
                  <button className='btn3' onClick={()=>dispatch(toggleaddBookPopup())}>close</button>
                  <button className='btn3' type='submit'>Add</button>
                </div>
               </form>
           
          </div>
        </div>
        </div>
      
    </>
  )
}

export default AddBookPopup;
