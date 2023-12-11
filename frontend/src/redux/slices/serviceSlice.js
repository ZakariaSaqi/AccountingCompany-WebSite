import { createSlice } from "@reduxjs/toolkit";
const serviceSlice = createSlice({
    name : "service",
    initialState : {
        services : [],
        servicesCount : null,
        service: null,
    },
    reducers : {
         setServices(state, action) {
            state.services = action.payload
         },
         setService(state, action) {
            state.service = action.payload;
          },
         addService(state, action){
            state.services.push(action.payload)
         },
         deleteService(state, action){
            state.services = state.services.filter( c => c._id !== action.payload )
         },
         setServicesCount(state, action) {
            state.servicesCount = action.payload;
          },
    }
})
const serviceReducer = serviceSlice.reducer
const serviceActions = serviceSlice.actions
export {serviceActions, serviceReducer}
