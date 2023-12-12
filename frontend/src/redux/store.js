import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./slices/authSlice"
import { blogReducer } from "./slices/blogSlice"
import { commentReducer } from "./slices/commentSlice"
import { serviceReducer } from "./slices/serviceSlice"
import { userReducer } from "./slices/userSlice"
import { testimonyReducer } from "./slices/testimonySlice"
import { passwordReducer } from "./slices/passwordSlice"
const store = configureStore({
    reducer : {
        auth : authReducer,
        blog : blogReducer,
        service :serviceReducer,
        comment : commentReducer,
        user : userReducer,
        testimony : testimonyReducer,
        password : passwordReducer
    }
})
export default store