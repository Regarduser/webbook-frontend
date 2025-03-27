import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { toggleaddBookPopup } from './popUpSlice';
import {toast} from 'react-toastify'

const bookSlice = createSlice({
    name : "book",
    initialState: {
        loading : false,
        error : null,
        message : null,
        books : []
    },
    reducers : {
        fetchBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchBookSuccess(state, action){
            state.loading = false;
            state.books = action.payload;
        },
        fetchBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        addBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addBookSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        addBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        deleteBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteBookSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        deleteBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        resetBookSlice(state){
            state.error = null;
            state.message = null;
            state.loading = false
        },
    },
})

export const fetchAllBooks = () => async(dispatch)=>{
    dispatch(bookSlice.actions.fetchBookRequest());
    await axios.get("http://localhost:4000/api/v1/book/all", {withCredentials : true}).then(res=>{
        dispatch(bookSlice.actions.fetchBookSuccess(res.data.books))
    }).catch(err=>{
        dispatch(bookSlice.actions.fetchBookFailed(err.response.data.message)); 
    })
}

export const addBook = (data) => async (dispatch)=>{
    dispatch(bookSlice.actions.addBookRequest())
    await axios.post("http://localhost:4000/api/v1/book/admin/add", data, {withCredentials : true ,
        headers : {
            "Content-Type" : 'multipart/form-data'
        }
    }).then(res=>{
            dispatch(bookSlice.actions.addBookSuccess(res.data.message));
            
            
    }).catch(err=>{
        const errorMessage = err.response?.data?.message || "Something went wrong";
        dispatch(bookSlice.actions.addBookFailed(errorMessage));
        

    });
};

export const deleteBook = (id) => async (dispatch)=>{
    dispatch(bookSlice.actions.deleteBookRequest())
    await axios.delete(`http://localhost:4000/api/v1/book/delete/${id}`, {withCredentials : true}).then(res=>{
            dispatch(bookSlice.actions.deleteBookSuccess(res.data.message));
            
    }).catch(err=>{
        const errorMessage = err.response?.data?.message || "Something went wrong";
        dispatch(bookSlice.actions.deleteBookFailed(errorMessage));

    });
};





export const resetBookSlice = ()=>(dispatch)=>{
    dispatch(bookSlice.actions.resetBookSlice())
}

export default bookSlice.reducer;