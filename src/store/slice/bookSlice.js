import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

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
        resetBookSlice(state){
            state.error = null;
            state.message = null;
            state.loading = false
        },
    },
})

export const fetchAllBooks = () => async(dispatch)=>{
    dispatch(bookSlice.actions.fetchBookRequest());
    await axios.get(`${process.env.REACT_APP_BACKENDLINK}/api/v1/book/all`, {withCredentials : true}).then(res=>{
        dispatch(bookSlice.actions.fetchBookSuccess(res.data.books))
    }).catch(err=>{
        dispatch(bookSlice.actions.fetchBookFailed(err.response.data.message)); 
    })
}

export const addBook = (data) => async (dispatch)=>{
    dispatch(bookSlice.actions.addBookRequest())
    await axios.post(`${process.env.REACT_APP_BACKENDLINK}/api/v1/book/admin/add`, data, {withCredentials : true ,
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(res=>{
        bookSlice.actions.addBookSuccess(res.data.message)
    }).catch(err=>{
        dispatch(bookSlice.actions.addBookFailed(err.response.data.message))
    });
};

export const resetBookSlice = ()=>(dispatch)=>{
    dispatch(bookSlice.actions.resetBookSlice())
}

export default bookSlice.reducer;