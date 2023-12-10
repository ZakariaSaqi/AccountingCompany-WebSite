import { createSlice } from "@reduxjs/toolkit";
const commentSlice = createSlice({
    name : "comment",
    initialState : {
        allComments : [],
        commentsCount : null,
    },
    reducers : {
        setAllComments (state, action){
            state.allComments = action.payload
        },
        deleteComment(state,action){
            state.allComments = state.allComments.filter( c => c._id !== action.payload)
        },
        setCommentsCount(state, action) {
            state.commentsCount = action.payload;
          },
    }
})
const commentReducer = commentSlice.reducer
const commentActions = commentSlice.actions
export {commentActions, commentReducer}
