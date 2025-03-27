import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { GiLoad } from 'react-icons/gi'
import {toast} from 'react-toastify'
import { toggleAddNewAdminPopup, toggleChangeAvatarPopup } from './popUpSlice';
import {getUser} from "./authSlice"; 

const userSlice = createSlice({
    name : "user",
    initialState : {
        users : [],
        loading : false,
    },
    reducers:{
        fetchAllUserRequest(state){
            state.loading = true
        },
        fetchAllUserSuccess(state, action){
            state.loading = false
            state.users = action.payload
        },
        fetchAllUserFailed(state){
            state.loading = false
        },
        // fetchUserProfileRequest(state){
        //     state.loading = true
        // },
        // fetchUserProfileSuccess(state, action){
        //     state.loading = false
        //     state.users = action.payload
        // },
        // fetchUserProfileFailed(state){
        //     state.loading = false
        // },
        addNewAdminRequest(state){
            state.loading = true
        },
        addNewAdminSuccess(state){
            state.loading = false
        },
        addNewAdminFailed(state){
            state.loading = false;
        },
        addNewAvatarRequest(state){
            state.loading = true
        },
        addNewAvatarSucess(state, action){
            state.loading = false
            state.message = action.payload
        },
        addNewAvatarFailed(state){
            state.loading = false
        },
        resetUserState(state) {
            state.loading = false;
            state.message = null;
        }
        
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUserProfile.fulfilled, (state, action) => {
    //             state.user = action.payload; // ✅ Redux me user update
    //         })
    //         .addCase(addNewAvatar.fulfilled, (state, action) => {
    //             if (state.user) {
    //                 state.user.avatar = action.payload.avatar; // ✅ Avatar turant Redux me update
    //             }
    //         });
    // }
});


export const fetchAllUsers = ()=> async (dispatch) => {
        dispatch(userSlice.actions.fetchAllUserRequest());
        await axios.get("http://localhost:4000/api/v1/user/all", {withCredentials : true}).then(res=>{
            dispatch(userSlice.actions.fetchAllUserSuccess(res.data.users))
        }).catch(err=>{
            dispatch(userSlice.actions.fetchAllUserFailed(err?.res?.data?.message))
        })
}

// export const fetchUserProfile = ()=> async (dispatch) => {
//     dispatch(userSlice.actions.fetchUserProfileRequest());
//     const data = await axios.get("http://localhost:4000/api/v1/auth/me", {withCredentials : true}).then(res=>{
//         dispatch(userSlice.actions.fetchUserProfileSuccess(res.data.users))
//         return data.user
//     }).catch(err=>{
//         dispatch(userSlice.actions.fetchUserProfileFailed(err?.res?.data?.message))
//     })
// }


export const addNewAdmin = (data)=> async (dispatch, getState) => {
        dispatch(userSlice.actions.addNewAdminRequest());
        await axios.post("http://localhost:4000/api/v1/user/add/newAdmin", data, {
            withCredentials : true,
            headers : {
                "Content-Type" : 'multipart/form-data'
            }
            
        } ).then(res=>{
            dispatch(userSlice.actions.addNewAdminSuccess())
            toast.success(res.data.message)
            dispatch(toggleAddNewAdminPopup())


            const { auth } = getState();
            if (auth.user) {
                dispatch(getUser({
                    user: { ...auth.user, avatar: res.data.avatar },
                }));
            }

    
            dispatch(userSlice.actions.resetUserState())
        }).catch(err=>{
            dispatch(userSlice.actions.addNewAdminFailed());
            toast.error(err.response.data.message)
        })
}

export const addNewAvatar = (data)=> async (dispatch) => {
    dispatch(userSlice.actions.addNewAvatarRequest());
    await axios.put("http://localhost:4000/api/v1/user/updateavatar", data, {
        withCredentials : true,
        headers : {
            "Content-Type" : 'multipart/form-data'
        }
    } ).then(res=>{
        dispatch(userSlice.actions.addNewAvatarSucess())
        toast.success(res.data.message)
        dispatch(toggleChangeAvatarPopup())
        dispatch(getUser());
    }).catch(err=>{
        dispatch(userSlice.actions.addNewAvatarFailed());
        toast.error(err.response.data.message)
    })
}



export default userSlice.reducer;