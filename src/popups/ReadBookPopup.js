import React from 'react'
import { useDispatch } from 'react-redux'
import { togglereadBookPopup } from '../store/slice/popUpSlice'

const ReadBookPopup = ({book}) => {
  const dispatch = useDispatch()
  return (
    <>
    <div className='popup-overlay' onClick={()=>dispatch(togglereadBookPopup())}>
      <div className='admin-container' onClick={(e) => e.stopPropagation()}>
        <div className='readbook-content'>
          <h2 className='readbook-text' >view Book info</h2>
          <button className='btn3' onClick={()=>dispatch(togglereadBookPopup())}>&times;</button>
        </div>
        <div className='reading-content'>
          <div className='reading-header'>
            <label>Book Title</label>
            <p className='reading-p'>{book && book.title? book.title : book.bookTitle}</p>
          </div>
          <div className='reading-header'>
            <label>Author</label>
            <p className='reading-p'>{book && book.author}</p>
          </div>
          <div className='reading-header'>
            <label>Description </label>
            <p className='reading-p'>{book && book.description}</p>
          </div >
          <div className='read-close'>
        <button className='btn3' onClick={()=>dispatch(togglereadBookPopup())}> close</button>

          </div>
         
        </div>

       
      </div>
    </div>
    </>
  )
}

export default ReadBookPopup
