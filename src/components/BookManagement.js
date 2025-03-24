import React, { useEffect, useState } from 'react'
import {BookA, NotebookPen} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleaddBookPopup, togglereadBookPopup, togglerecordBookPopup } from '../store/slice/popUpSlice'
import { toast } from 'react-toastify'
import { fetchAllBooks, resetBookSlice } from '../store/slice/bookSlice'
import { fetchAllBorrowedBooks, resetBorrowSlice } from '../store/slice/borrowSlice'
import Header from "../layout/Header";
import AddBookPopup from "../popups/addBookPopup"
import ReadBookPopup from "../popups/ReadBookPopup"
import RecordBookPopup from "../popups/RecordBookPopup"

const BookManagement = () => {
  
  const dispatch = useDispatch()

  const {
    loading,
    error ,
    message,
    books ,
  } = useSelector((state)=> state.book)

  const {
    user,
    isAuthenticated,
  } = useSelector((state)=> state.auth)

  const {
        addBookPopup,
        readBookPopup,
        recordBookPopup,
  } = useSelector((state)=> state.popup)

  const {
 loading : borrowSliceLoading,
        error : borrowSliceError,
        message : borrowSliceMessage,
    
} = useSelector((state)=> state.borrow)


const [readbook, setReadbook] = useState({});

const openReadPopup = (id) => {
  const book = books.find((book)=> book._id === id);
  setReadbook(book)
  dispatch(togglereadBookPopup());
}


const [borrowBookId, setborrowBookId] = useState("")
const openRecordBookPopup = (bookId)=>{
  setborrowBookId(bookId)
  dispatch(togglerecordBookPopup())
}

useEffect(()=>{
  if(message || borrowSliceMessage){
    toast.success(message || borrowSliceMessage)
    dispatch(fetchAllBooks())
    dispatch(fetchAllBorrowedBooks())
    dispatch(resetBookSlice())
    dispatch(resetBorrowSlice())
  }
  if(error || borrowSliceError){
    toast.error(error || borrowSliceError)
    dispatch(resetBookSlice())
    dispatch(resetBorrowSlice())
  }
}, [dispatch, message, error, loading, borrowSliceError, borrowSliceLoading, borrowSliceMessage])

const [searchedKeyword, setSearchKeyword] = useState("")
const handleSearch = (e)=>{
  setSearchKeyword(e.target.value.toLowerCase());

}

const searchedBooks = books.filter((book) => {
   return book.title.toLowerCase().includes(searchedKeyword)
});


  return (
    <>
      <main className='sidecontainer relative flex-1 padding-10 '>
       <Header/>

       {/* subheader */}
       <header className='user-header flex flex-col gap-3'>
        <h2 className='text-xl text-medium'>{user && user.role === "Admin" ? "Book Management" : "Books"}</h2>
        <div className='book-content'>
          {
            isAuthenticated && user?.role === "Admin" && (
              <button onClick={()=>dispatch(toggleaddBookPopup())} className='btn3 btn-book'>
                <span className='btn-span'>+</span>
                 Add book</button>
            )
          }
          <input type="text" placeholder='Search books... ' value={searchedKeyword} onClick={handleSearch} className='search-book' />
        </div>
       </header>

          {/* table  */}
          {
            books && books.length > 0 ? (
              <div className="table-container">
            <table className="table">
              <thead className="thead"> 
                <tr className="bg-gray">
                  <th className="table-head">ID</th>
                  <th className="table-head">Name</th>
                  <th className="table-head">Author</th>
                  {
                    isAuthenticated && user?.role === "Admin" && (
                      <th className="table-head text-center">Quantity</th>
                    )
                  }
                  <th className="table-head text-center">Price</th>
                  <th className="table-head text-center">Availability</th>
                  {
                    isAuthenticated && user?.role === "Admin" && (
                      <th className="table-head text-center">Record Book</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
               {
                searchedBooks.map((book, index)=>(
                  <tr key={book._id} className={(index + 1) % 2 === 0 ? "bg-gray" : ""}>
                    {/* <td className="table-head">{index+1}</td>  */}
                           <td className="table-head">{index + 1}</td> 
                           <td className="table-head">{book.title}</td> 
                           <td className="table-head">{book.author}</td> 
                           {
                    isAuthenticated && user?.role === "Admin" && (
                      <td className="table-head text-center">{book.quantity}</td>
                    )
                  }
                           <td className="table-head text-center">{book.price}</td> 
                           <td className="table-head text-center ">{book.availability ? "available" : "unavailable"}</td> 
                           {
                    isAuthenticated && user?.role === "Admin" && (
                      <td className="table-head text-center"> 
                      <BookA onClick={()=>openReadPopup(book._id)} className='cursor-pointer' />
                        <NotebookPen onClick={()=> openRecordBookPopup(book._id)} className='cursor-pointer'/>
                      </td>
                     
                    )
                  }
                  </tr>
                ))
               }
              </tbody>
            </table>
          </div>
            ): (
              <h3>no books found in library !</h3>
            )
          }
      </main>
      {addBookPopup && <AddBookPopup/>}
      {readBookPopup && <ReadBookPopup book={readbook}/>}
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId}/>}
    </>
  )
}

export default BookManagement
