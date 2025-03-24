import React, { useState } from 'react'
import {BookA, NotebookPen} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { togglereadBookPopup } from '../store/slice/popUpSlice';
import Header from "../layout/Header"


const MyBorrowedBooks = () => {
    const dispatch = useDispatch();

    const {books} = useSelector(state => state.book)
    const {userBorrowedBooks} = useSelector(state => state.borrow)
    const {addBookPopup} = useSelector(state => state.popup)

    const [readbook, setReadbook] = useState({});
    
    const openReadPopup = (id) => {
      const book = books.find((book)=> book._id === id);
      setReadbook(book)
      dispatch(togglereadBookPopup());
    }
    

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

      const [filter, setFilter] = useState("returned");
      const returnedBooks = userBorrowedBooks?.filter((book)=>
        book.returned === true)
      const nonreturnedBooks = userBorrowedBooks?.filter((book)=>
        book.returned === false)

    const booksToDisplay = filter === "returned" ? returnedBooks : nonreturnedBooks;
     
  return (
    <>
    <main className='sidecontainer relative flex'>
        <Header/>
        <header className='user-header flex flex-col gap-3'>
            <h2>Borrowed Books</h2>
        </header>

        <header className='user-header borrow-btn'>
            <button className={`btn4 ${filter === "returned" ? "btn4-r" : "btn4-r"}`} onClick={()=>setFilter("returned")}>Returned Books</button>
            <button className={`btn5 ${filter === "nonreturned" ? "btn5-r" : "btn5-r"}`} onClick={()=>setFilter("nonreturned")}>Non-Returned Books</button>
            
        </header>
    </main>
      
    </>
  )
}

export default MyBorrowedBooks
