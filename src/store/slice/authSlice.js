import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import SettingPopup from '../../popups/SettingPopup';
import { toggleAddNewAdminPopup, toggleSettingPopup } from './popUpSlice';
import { toast } from 'react-toastify';

const authSlice = createSlice({
    name : "auth",
    initialState : {
        loading : false,
        error : null,
        message : null,
        user : null,
        isAuthenticated : false,
    },

    //reducer is small actions
    reducers : {
        registerRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action){
            state.loading = false;
            state.message = action.payload.message;

        },
        registerFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        OtpVerificationRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        OtpVerificationSuccess(state, action){
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        OtpVerificationFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        LoginRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        LoginSuccess(state, action){
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        LoginFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        LogoutRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        LogoutSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
        LogoutFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null
        },
        getUserRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        getUserSuccess(state, action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        getUserFailed(state){
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        forgotPasswordRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action){
            state.loading = false;
            state.message = action.payload.message
        },
        forgotPasswordFailed(state, action){
            state.loading = false;
            state.error = action.payload
        },
        resetPasswordRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action){
            state.loading = false;
            state.message = action.payload.message
            state.user = action.payload.user;
            state.isAuthenticated = false;
        },
        resetPasswordFailed(state, action){
            state.loading = false;
            state.error = action.payload
        },
        
        updatePasswordRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updatePasswordSuccess(state, action){
            state.loading = false;
            state.message = action.payload
            
        },
        updatePasswordFailed(state, action){
            state.loading = false;
            state.error = action.payload
        },
        deleteUserRequest(state){
            state.loading = false
        },
        deleteUserSuccess(state, action){
            state.loading = true
            state.message = action.payload
        },
        deleteUserFailed(state){
            state.loading = false
        },
        banUserRequest(state){
            state.loading = false
        },
        banUserSuccess(state, action){
            state.loading = true
            state.message = action.payload
        },
        banUserFailed(state){
            state.loading = false
        },
        
        resetAuthSlice(state){
            state.error = null;
            state.loading = false;
            state.message = null;
            state.user = state.user; 
            state.isAuthenticated = state.isAuthenticated; 
        }
    },

    
})

export const resetAuthSlice = ()=> (dispatch) => {
    dispatch(authSlice.actions.resetAuthSlice())
}

export const Register = (data)=> async(dispatch)=>{
    dispatch(authSlice.actions.registerRequest());
    await axios.post("http://localhost:4000/api/v1/auth/register", data,{
        withCredentials : true,
        headers : {
            "Content-Type" : "application/json"

        }
     }).then(res=>{
        dispatch(authSlice.actions.registerSuccess(res.data))
     }).catch((error)=>{
        dispatch(authSlice.actions.registerFailed(error.response.data.message))
     })
}

export const OtpVerification = ({email, otp})=> async(dispatch)=>{
    dispatch(authSlice.actions.OtpVerificationRequest());
    await axios.post("http://localhost:4000/api/v1/auth/verify-otp",{email, otp},{
        withCredentials : true,
        headers : {
            "Content-Type" : "application/json"

        }
     }).then(res=>{
        dispatch(authSlice.actions.OtpVerificationSuccess(res.data))
     }).catch((error)=>{
        dispatch(authSlice.actions.OtpVerificationFailed(
            error?.response?.data?.message || "OTP verification failed"
          ));
          
     })
}

export const Login = (data)=> async(dispatch)=>{
    dispatch(authSlice.actions.LoginRequest());
    await axios.post("http://localhost:4000/api/v1/auth/login", data,{
        withCredentials : true,
        headers : {
            "Content-Type" : "application/json"

        }
     }).then(res=>{
        dispatch(authSlice.actions.LoginSuccess(res.data))
     }).catch((error)=>{
        dispatch(authSlice.actions.LoginFailed(error.response.data.message))
     })
}

// export const Logout = ()=> async(dispatch)=>{
//     dispatch(authSlice.actions.LogoutRequest());
//     await axios.get("http://localhost:4000/api/v1/auth/logout",{
//         withCredentials : true,
       
//      }).then(res=>{
//         dispatch(authSlice.actions.LogoutSuccess(res.data.message))
//         dispatch(authSlice.actions.resetAuthSlice())
//      }).catch((error)=>{
//         dispatch(authSlice.actions.LogoutFailed(error.response.data.message))
//      })
// }

export const Logout = () => async (dispatch) => {
    dispatch(authSlice.actions.LogoutRequest());
    await axios.get("http://localhost:4000/api/v1/auth/logout", {
        withCredentials: true,
    })
    .then((res) => {
        dispatch(authSlice.actions.LogoutSuccess(res.data?.message || "Logout successful")); // ✅ Safe fallback
            // toast.success(res.data.message);
        // dispatch(authSlice.actions.resetAuthSlice());
    })
    .catch((error) => {
        // ✅ Use optional chaining and fallback error message
        const errorMessage = error?.response?.data?.message || "Failed to logout. Please try again.";
        dispatch(authSlice.actions.LogoutFailed(errorMessage));
    });
};


export const getUser = ()=> async(dispatch)=>{
    dispatch(authSlice.actions.getUserRequest());
    await axios.get("http://localhost:4000/api/v1/auth/me",{
        withCredentials : true,
       
     }).then(res=>{
        dispatch(authSlice.actions.getUserSuccess(res.data))
     }).catch((error)=>{
        dispatch(authSlice.actions.getUserFailed(error.response.data.message))
     })
}

export const forgotPassword = (email)=> async(dispatch)=>{
    dispatch(authSlice.actions.forgotPasswordRequest());
    await axios.post("http://localhost:4000/api/v1/auth/password/forgot",{email},{
        withCredentials : true,
        headers : {
            "Content-Type" : "application/json"

        }
     }).then(res=>{
        dispatch(authSlice.actions.forgotPasswordSuccess(res.data))
     }).catch((error)=>{
        dispatch(authSlice.actions.forgotPasswordFailed(error.response.data.message))
     })
}

export const resetPassword = (data, token)=> async(dispatch)=>{
    dispatch(authSlice.actions.resetPasswordRequest());
    await axios.put(`http://localhost:4000/api/v1/auth/password/reset/${token}`, data ,{
        withCredentials : true,
        headers : {
            "Content-Type" : "application/json"
        }
     }).then(res=>{
        dispatch(authSlice.actions.resetPasswordSuccess(res.data))
     }).catch((error)=>{
        dispatch(authSlice.actions.resetPasswordFailed(error.response.data.message))
     })
}

export const updatePassword = (data)=> async(dispatch)=>{
    dispatch(authSlice.actions.updatePasswordRequest());
    await axios.put(`http://localhost:4000/api/v1/auth/password/update`, data,{
        withCredentials : true,
        headers : {
            "Content-Type" : "application/json"
        }
     }).then(res=>{
        dispatch(authSlice.actions.updatePasswordSuccess(res.data.message))
            
        
     }).catch((error)=>{
        dispatch(authSlice.actions.updatePasswordFailed(error.response.data.message))
     })
}

export const deleteUser = (email)=> async(dispatch)=>{
    dispatch(authSlice.actions.deleteUserRequest());
    await axios.delete(`http://localhost:4000/api/v1/auth/delete/${email}`, {withCredentials : true}

    ).then(res=>{
        dispatch(authSlice.actions.deleteUserSuccess(res.data.message))
        dispatch(getUser())
        toast.success(res.data.message)
    }).catch((error)=>{
        dispatch(authSlice.actions.deleteUserFailed(error.response.data.message))
        toast.error(error.response.data.message)

    })
}

export const banUser = (email)=> async(dispatch)=>{
    dispatch(authSlice.actions.banUserRequest());
    await axios.put(`http://localhost:4000/api/v1/auth/ban/${email}`,{}, {withCredentials : true}

    ).then(res=>{
        dispatch(authSlice.actions.banUserSuccess(res.data.message))
        dispatch(getUser())
        toast.success(res.data.message)
    }).catch((error)=>{
        dispatch(authSlice.actions.banUserFailed(error.response.data.message))
        toast.error(error.response.data.message)

    })
}

// export const banUser = (email) => async (dispatch) => {
//     dispatch(authSlice.actions.banUserRequest());

//     await axios
//         .put(`http://localhost:4000/api/v1/auth/ban/${email}`, {}, { withCredentials: true })
//         .then((res) => {
//             dispatch(authSlice.actions.banUserSuccess(res.data.message));
//             dispatch(getUser());
//             toast.success(res.data.message);
//         })
//         .catch((error) => {
//             dispatch(authSlice.actions.banUserFailed(error?.response?.data?.message || "Failed to ban user"));
//             toast.error(error?.response?.data?.message || "Failed to ban user");
//         });
// };

export default authSlice.reducer;

