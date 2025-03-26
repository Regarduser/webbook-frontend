import React, { useEffect, useState } from 'react'
import {PiKeyReturnBold} from 'react-icons/pi'
import {FaSquareCheck} from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { togglereturnBookPopup } from '../store/slice/popUpSlice'
import { toast } from 'react-toastify'
import { fetchAllBooks, resetBookSlice } from '../store/slice/bookSlice'
import { fetchAllBorrowedBooks, resetBorrowSlice } from '../store/slice/borrowSlice'
import ReturnBookPopup from '../popups/ReturnBookPopup'
import Header from "../layout/Header";
import {BookA, NotebookPen} from 'lucide-react'



const Catalog = () => {
  const [filter, setFilter] = useState("borrowed")
  const dispatch = useDispatch()
  const {returnBookPopup} = useSelector(state => state.popup)
  const { allBorrowedBooks, loading, error, message } = useSelector((state) => state.borrow);

    const formateDateTime = (timeStamp) => {
      const date = new Date(timeStamp);
      const FormattedDate = `${String(date.getDate()).padStart(2, 0)} - ${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getFullYear())}`;
      const FormattedTime = `${String(date.getHours()).padStart(2, 0)} : ${String(
        date.getMinutes()
      ).padStart(2, "0")} : ${String(date.getSeconds()).padStart(2, "0")}`;
  
      const result = `${FormattedDate} ${FormattedTime}`;
      return result;
    };

    const formateDate = (timeStamp) => {
      const date = new Date(timeStamp);
    
      return `${String(date.getDate()).padStart(2, 0)} - ${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getFullYear())}`;
    };

    const currentDate = new Date()
    // console.log(allBorrowedBooks);


    const borrowedBooks = allBorrowedBooks?.filter((book)=>{
      const dueDate = new Date(book.dueDate);
      return dueDate > currentDate
    })

    const overdueBooks = allBorrowedBooks?.filter((book)=>{
      const dueDate = new Date(book.dueDate);
      return dueDate <= currentDate
    })

    const booksToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;
    
    const [email, setEmail] = useState("")
    const [borrowedBookId, setBorrowedBookId] = useState("")

    const openReturnBookPopup = (bookId, email)=>{
      setBorrowedBookId(bookId)
      setEmail(email)
      dispatch(togglereturnBookPopup())
    }

    useEffect(() => {
      if(message){
        toast.success(message)
        dispatch(fetchAllBooks())
        dispatch(fetchAllBorrowedBooks());  // API Call
        dispatch(resetBookSlice())
        dispatch(resetBorrowSlice())
      }
      if(error){
        toast.error(error)
        dispatch(resetBookSlice())
        dispatch(resetBorrowSlice())
      }
  }, [dispatch, error , loading]);
  return (
    <>
         <main className='sidecontainer'>
        <Header/>

        <header className='user-header borrow-btn'>
            <button className={`btn4 ${filter === "borrowed" ? "" : "btn4-r"}`} onClick={()=>setFilter("borrowed")}>Borrowed Books</button>
            <button className={`btn5 ${filter === "overdue" ? "btn5-r" : ""}`} onClick={()=>setFilter("overdue")}>overdue Borrowers</button>
            
        </header>

        {
          booksToDisplay && booksToDisplay.length > 0 ? (
            <div className='bookToDisplay table-container'>
                 <table className="table">
              <thead className="thead"> 
                <tr className="bg-gray">
                  <th className="table-head">ID</th>
                  <th className="table-head">Username</th>
                  <th className="table-head">Email</th>
                  <th className="table-head">Price</th>
                  <th className="table-head text-center">Due Date</th>
                  <th className="table-head text-center">Date & Time</th>
                  <th className="table-head text-center">Return</th>
                  
                </tr>
              </thead>

              <tbody>
                {
                  booksToDisplay.map((book, index)=>(
                    <tr key={index} className={(index + 1) % 2 === 0 ? "bg-gray" : ""}>
                      <td className='table-head'>{index + 1}</td>
                      <td className='table-head'>{book?.user.name}</td>
                      <td className='table-head'>{book?.user.email}</td>
                      <td className='table-head'>{book.price}</td>
                      <td className='table-head'>{formateDate(book.dueDate)}</td>
                      <td className='table-head'>{formateDateTime(book.createdAt)}</td>
                      <td className='table-head'>{book.returnDate ? (<FaSquareCheck className='fa-check'/>) : (<PiKeyReturnBold onClick={()=>openReturnBookPopup(book.book, book?.user.email)} className='fa-check'/>)}</td>
                      {console.log(book.returnDate)}
                    </tr>
                  ))
                }
              </tbody>
              </table>
            </div>
          ) : (
            <h3 className='sidecontainer usercontainer'> No {filter === "borrowed" ? "borrowed" : "overdue"} Books found</h3>
            
          )
        }

    </main>
    {
      returnBookPopup && <ReturnBookPopup bookId={borrowedBookId} email={email}/>
      
    }
   
    </>
  )
}

export default Catalog
