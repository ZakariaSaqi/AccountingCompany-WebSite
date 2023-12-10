import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name : "profile",
    initialState : {
        profile : null,
        loading : false,
        isProfileDeleted : false,
        profiles : [],
        userCount : null
    },
    reducers : {
         setProfile(state, action){
            state.profile = action.payload
         },
         setProfilePhoto(state, action){
            state.profile.profilePhoto = action.payload
         },
         updateUserProfile(state, action){
            state.profile = action.payload
         },
         createPost(state, action){
            state.profile = action.payload
         },
         
         setLoading(state){
            state.loading = true
         },
         clearLoading(state){
            state.loading = false
         },
         setIsProfileDeleted(state){
            state.isProfileDeleted = true
            state.loading = false
         },
         clearIsProfileDeleted(state){
            state.isProfileDeleted = false
         },

         setUsersCount (state, action){
            state.userCount = action.payload
         },
         setProfiles (state, action){
            state.profiles = action.payload
         }
    }
})
const userReducer = userSlice.reducer
const userActions = userSlice.actions
export {userActions, userReducer}
