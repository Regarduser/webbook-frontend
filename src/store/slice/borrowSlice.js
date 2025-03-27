import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
import { togglerecordBookPopup, togglereturnBookPopup } from './popUpSlice'
import { toast } from "react-toastify";

const borrowSlice = createSlice({
    name : "borrow",
    initialState : {
        loading : false,
        error : null,
        userBorrowedBooks : [],
        allBorrowedBooks : [],
        message : null,
    },
    reducers : {
        fetchUserBorrowedBooksRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchUserBorrowedBooksSuccess(state, action){
            state.loading = false;
            state.userBorrowedBooks = action.payload;
        },
        fetchUserBorrowedBooksFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        recordBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;

        },
        recordBookSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        recordBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        fetchAllBorrowedBooksRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchAllBorrowedBooksSuccess(state, action){
            state.loading = false;
            state.allBorrowedBooks = action.payload;
        },
        fetchAllBorrowedBooksFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        returnBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;

        },
        returnBookSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        returnBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        resetBorrowSlice(state){
            state.loading = false;
            state.error = null;
            state.message = null;
        }
    },
})

export const fetchUserBorrowedBooks = ()=> async(dispatch)=>{
    dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest());
    await axios.get("http://localhost:4000/api/v1/borrow/my-borrowed-book", {withCredentials :true}).then(res=>{
        dispatch(borrowSlice.actions.fetchUserBorrowedBooksSuccess(res.data.borrowedBooks))
    }).catch(err=>{
        dispatch(borrowSlice.actions.fetchUserBorrowedBooksFailed(err.response.data.message))
    })
}

export const fetchAllBorrowedBooks= ()=> async(dispatch)=>{
    dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());

    await axios.get("http://localhost:4000/api/v1/borrow/borrowed-book-by-users", {withCredentials :true}).then(res=>{
    

        dispatch(borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data.borrowedBooks))
        // console.log(res.data.borrowedBooks)
    }).catch(err=>{
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksFailed(err.response.data.message))
    })
}

export const recordBook = (email, id)=> async(dispatch)=>{
    dispatch(borrowSlice.actions.recordBookRequest())
    await axios.post(`http://localhost:4000/api/v1/borrow/record-borrow-book/${id}`, {email}, {withCredentials : true,
        headers : {
            "Content-Type" : "application/json"
        }
        
    }).then(res=>{
    // console.log("✅ API Response:", res.data);

        dispatch(borrowSlice.actions.recordBookSuccess(res.data.message))
        dispatch(fetchAllBorrowedBooks())
        dispatch(fetchUserBorrowedBooks())
        // dispatch(togglerecordBookPopup())

        toast.success(res.data.message)
        
    }).catch(err=>{
        dispatch(borrowSlice.actions.recordBookFailed(err.response?.data?.message || "Something went wrong"));
    })
}


export const returnBook = (id, email)=> async(dispatch)=>{
    dispatch(borrowSlice.actions.returnBookRequest())
    await axios.put(`http://localhost:4000/api/v1/borrow/return-borrowed-book/${id}`, {email}, {withCredentials : true,
        headers : {
            "Content-Type" : "application/json"
        }
        
    }).then(res=>{
        dispatch(borrowSlice.actions.returnBookSuccess(res.data.message))
        dispatch(togglereturnBookPopup())
    }).catch(err=>{
        dispatch(borrowSlice.actions.returnBookFailed(err.response.data.message))
    })
}

export const resetBorrowSlice = () =>(dispatch)=>{
    dispatch(borrowSlice.actions.resetBorrowSlice())
}

export default borrowSlice.reducer