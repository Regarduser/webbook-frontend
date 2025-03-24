
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import popupReducer from './slice/popUpSlice'
import userReducer  from './slice/userSlice'
import bookReducer  from './slice/bookSlice'
import borrowReducer  from './slice/borrowSlice'

export const store = configureStore({
    reducer: {
        auth : authReducer,
        popup : popupReducer,
        user : userReducer,
        book : bookReducer,
        borrow : borrowReducer,
    },
})