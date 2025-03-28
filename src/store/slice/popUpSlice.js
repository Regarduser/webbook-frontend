import {createSlice} from '@reduxjs/toolkit'

const popupSlice = createSlice({
    name : "popup",
    initialState : {
        settingPopup: false,
        addBookPopup: false,
        readBookPopup: false,
        recordBookPopup: false,
        returnBookPopup: false,
        addNewAdminPopup: false,

    },

    reducers : {
        toggleSettingPopup(state){
            state.settingPopup = !state.settingPopup;
        },
        toggleaddBookPopup(state){
            state.addBookPopup = !state.addBookPopup;
        },
        togglereadBookPopup(state){
            state.readBookPopup = !state.readBookPopup;
        },
        togglerecordBookPopup(state){
            state.recordBookPopup = !state.recordBookPopup;
        },
        togglereturnBookPopup(state){
            state.returnBookPopup = !state.returnBookPopup;
        },
        toggleAddNewAdminPopup(state){
            state.addNewAdminPopup = !state.addNewAdminPopup;
        },
        closeAllPopup(state){
            state.addBookPopup = false
            state.settingPopup = false
            state.readBookPopup = false
            state.recordBookPopup = false
            state.returnBookPopup = false
            state.addNewAdminPopup = false
        }
    }
})

export const { closeAllPopup, toggleaddBookPopup, togglerecordBookPopup, togglereadBookPopup, togglereturnBookPopup, toggleSettingPopup, toggleAddNewAdminPopup} = popupSlice.actions;

export default popupSlice.reducer