import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : localStorage.getItem("AccountingUser")
        ? JSON.parse(localStorage.getItem("AccountingUser"))
        : null,
        signupMessage : null,
    },
    reducers : {
         login(state, action) {
            state.user = action.payload
         },
         logout(state) {
            state.user = null
         },
         signup(state, action) {
            state.signupMessage = action.payload
         },
         setUserPhoto(state, action){
            state.user.profilePhoto = action.payload
         },
         setUsername(state, action){
            state.user.username = action.payload
         },
        
    }
})
const authReducer = authSlice.reducer
const authActions = authSlice.actions
export {authActions, authReducer}