import { createSlice } from "@reduxjs/toolkit";
const testimonySlice = createSlice({
    name : "testimony",
    initialState : {
        testimonies : [],
        isAccepted : false,
        testimoniesCount : null,
    },
    reducers : {
         setTestimonies(state, action) {
            state.testimonies = action.payload
         },
         addTestimony(state, action){
            state.testimonies.push(action.payload)
         },
         deleteTestimony(state, action){
            state.testimonies = state.testimonies.filter( c => c._id !== action.payload )
         },
         setIsAcceptedTestimony(state){
            state.isAccepted = true;
         },
         setTestimoniesCount(state, action) {
            state.testimoniesCount = action.payload;
          },
        
    }
})
const testimonyReducer = testimonySlice.reducer
const testimonyActions = testimonySlice.actions
export {testimonyActions, testimonyReducer}
