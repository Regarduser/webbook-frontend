import React, { useEffect, useState } from 'react'
import {BookA, NotebookPen} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { togglereadBookPopup, togglereturnBookPopup } from '../store/slice/popUpSlice';
import Header from "../layout/Header"
import ReadBookPopup from '../popups/ReadBookPopup';
import RecordBookPopup from '../popups/RecordBookPopup';
import {toast} from 'react-toastify'
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks, resetBorrowSlice } from '../store/slice/borrowSlice';
import { fetchAllBooks, resetBookSlice } from '../store/slice/bookSlice';



const MyBorrowedBooks = () => {
    const dispatch = useDispatch();

    const {books} = useSelector(state => state.book)
    const {userBorrowedBooks, message, error} = useSelector(state => state.borrow)
    const {readBookPopup} = useSelector(state => state.popup)

    const [readbook, setReadbook] = useState({});
    
    const openReadPopup = (id) => {
      const book = userBorrowedBooks.find((b) => b.bookId === id); // ✅ Corrected: userBorrowedBooks se search karo
      if (book) {
        setReadbook(book);
        console.log("Selected Book:", book); // ✅ Debugging ke liye
        dispatch(togglereadBookPopup());
      } else {
        console.error("Book not found for ID:", id); // ❌ Agar book nahi mili
      }
    };
    

    

    const formateDate = (timeStamp) => {
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

      const [filter, setFilter] = useState("nonreturned");
      const nonreturnedBooks = userBorrowedBooks?.filter((book)=>
        book.returned === false)

    const booksToDisplay = filter === "nonreturned" ? nonreturnedBooks : "" ;

    
  return (
    <>
    
    <main className='sidecontainer'>
      <Header/>
        
        <header className='user-header borrow-header'>
            <h2>Borrowed Books</h2>
        </header>

        <header className='user-header borrow-btn'>
            <button className={`btn5 ${filter === "nonreturned" ? "btn5-r" : ""}`} onClick={()=>setFilter("nonreturned")}>Saved Books</button>
            
        </header>

        {
          booksToDisplay && booksToDisplay.length > 0 ? (
            <div className='bookToDisplay table-container'>
                 <table className="table">
              <thead className="thead"> 
                <tr className="bg-gray">
                  <th className="table-head">ID</th>
                  <th className="table-head">Book Title</th>
                  <th className="table-head">Date & Time</th>
                  <th className="table-head">Due Date</th>
                  <th className="table-head text-center">Returned</th>
                  <th className="table-head text-center">view</th>
                </tr>
              </thead>

              <tbody>
                {
                  booksToDisplay.map((book, index)=>(
                    <tr key={index} className={(index + 1) % 2 === 0 ? "bg-gray" : ""}>
                      <td className='table-head'>{index + 1}</td>
                      <td className='table-head'>{book.bookTitle}</td>
                      <td className='table-head'>{formateDate(book.borrowedDate)}</td>
                      <td className='table-head'>{book.dueDate}</td>
                      <td className='table-head'>{book.returned ? "Yes" : "No"}</td>
                      <td className='table-head cursor-pointer text-center'>
                      <i className="fa-solid fa-book-open " onClick={()=>openReadPopup(book.bookId)}  ></i>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              </table>
            </div>
          ) : (
            <h3 className='sidecontainer usercontainer'> No nonreturned books found !</h3>
            
          )
        }

    </main>
    
    {
      readBookPopup && <ReadBookPopup book={readbook}/>
    }

      
    </>
  )
}

export default MyBorrowedBooks
