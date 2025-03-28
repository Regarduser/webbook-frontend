
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import popupReducer from './slice/popUpSlice'
import userReducer  from './slice/userSlice'
import bookReducer  from './slice/bookSlice'
import borrowReducer  from './slice/borrowSlice'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key : 'root',
    storage,
    whitelist : ['auth'],
}

const presistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
        auth : presistedAuthReducer,
        popup : popupReducer,
        user : userReducer,
        book : bookReducer,
        borrow : borrowReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],  // 🚀 Ignore persist actions
            },
        }),
})

export const persistor = persistStore(store); 