import React from 'react'
import { useDispatch } from 'react-redux'
import { returnBook } from '../store/slice/borrowSlice'
import { togglereturnBookPopup } from '../store/slice/popUpSlice'

const ReturnBookPopup = ({bookId, email}) => {
  const dispatch = useDispatch()
  const handleReturnBook = (e)=>{
    e.preventDefault();
    dispatch(returnBook(bookId , email))
    dispatch(togglereturnBookPopup())
  }
  return (
    <>
     <div className='popup-overlay'>
         <div className='admin-container'>
           <div className='reading-content'>
             
                <h3 className='text-xl'> Return Book</h3>
                <form onSubmit={handleReturnBook}>
                 <div className="reading-header">
                   <label className='record-label'>User email</label>
                   <input type="email" defaultValue={email}  placeholder="return book email" className='borrow-input' required/>
     
                 </div>
                 <div className='borrow-btn'>
                   <button className='btn3' onClick={()=>dispatch(togglereturnBookPopup())}>close</button>
                   <button className='btn3' type='submit'>Return</button>
                 </div>
                </form>
            
           </div>
         </div>
         </div>
    </>
  )
}

export default ReturnBookPopup
