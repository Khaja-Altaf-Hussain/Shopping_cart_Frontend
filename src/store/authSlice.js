import { createSlice } from "@reduxjs/toolkit";

const initialState={
    accessToken:localStorage.getItem('accessToken')|| null,
    user:null,
    isAuthenticated:!!localStorage.getItem('accessToken')
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredntials:(state,action)=>{
            state.accessToken=action.payload.accessToken
            state.user=action.payload.user
            state.isAuthenticated=true
            localStorage.setItem("accessToken",action.payload.accessToken)
        },
        updateCredentials:(state,action)=>{
            state.accessToken=action.payload.accessToken
            localStorage.setItem("accessToken",action.payload.accessToken)
        },
        logout: (state)=>{
            state.accessToken=null
            state.user=null
            state.isAuthenticated=false
            localStorage.removeItem('accessToken')
        }
    }
})

export const {setCredntials,updateCredentials,logout}=authSlice.actions
export const selectIsAuthenticated= (state)=>state.auth.isAuthenticated
export default authSlice.reducer