import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks, recordBook, resetBorrowSlice } from '../store/slice/borrowSlice'
import { togglerecordBookPopup } from '../store/slice/popUpSlice'
import { toast } from 'react-toastify'
import { fetchAllBooks, resetBookSlice } from '../store/slice/bookSlice'


const RecordBookPopup = ({bookId, gmail}) => {
  const dispatch = useDispatch()
  const handleRecordBook = (e)=>{
    e.preventDefault()
    dispatch(recordBook(gmail,  bookId))
  }
  const {message, error} = useSelector((state)=>state.borrow)
  useEffect(()=>{
      
    if(message){

      toast.success(message)
      setTimeout(() => {
        dispatch(fetchAllBorrowedBooks());
        dispatch(fetchAllBooks());
        dispatch(fetchUserBorrowedBooks());
        dispatch(resetBookSlice());
        dispatch(resetBorrowSlice()); // ✅ Thoda delay se reset karo
      }, 500); 
  
    }
    if(error){
      toast.error(error)
      dispatch(resetBookSlice())
      dispatch(resetBorrowSlice())
    }
  }, [dispatch, message, error])
   

const {user} = useSelector((state)=>state.auth)
  return (
    <>
    <div className='popup-overlay'>
    <div className='admin-container'>
      <div className='reading-content'>
        
           <h3 className='text-xl'> Save Book</h3>
           <form onSubmit={handleRecordBook}>
            <div className="reading-header">
              <label className='record-label'>User email</label>
              <input type="email" defaultValue={gmail}  className='borrow-input' required disabled={user?.role === "user"}/>

            </div>
            <div className='borrow-btn'>
              <button className='btn3' onClick={()=>dispatch(togglerecordBookPopup())}>close</button>
              <button className='btn3' type='submit'>Save</button>
            </div>
           </form>
       
      </div>
    </div>
    </div>
      
    </>
  )
}

export default RecordBookPopup
