import { createSlice } from "@reduxjs/toolkit";
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    blogsCount: null,
    blogSearch: [],
    loading: false,
    isBlogCreated: false,
    blog: null,
  },
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },
    setBlogsSearch(state, action){
      state.blogSearch = action.payload
   },
    setBlogsCount(state, action) {
      state.blogsCount = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsBlogCreated(state) {
      state.isBlogCreated = true;
      state.loading = false;
    },
    clearIsBlogCreated(state) {
      state.isBlogCreated = false;
    },
    setBlog(state, action) {
      state.blog = action.payload;
    },
    setLike(state, action) {
      state.blog.likes = action.payload.likes;
    },
    deleteBlog(state, action) {
      state.blogs = state.blogs.filter((p) => p._id !== action.payload);
    },
    addCommentToBlog(state, action) {
      state.blog.comments.push(action.payload);
    },
    updateComment(state, action) {
      state.blog.comments = state.blog.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    deleteComment(state, action) {
      const comment = state.blog.comments.find((c) => c._id === action.payload);
      const commentIndex = state.blog.comments.indexOf(comment);
      state.blog.splice(commentIndex, 1);
    },
  },
});
const blogReducer = blogSlice.reducer;
const blogActions = blogSlice.actions;
export { blogActions, blogReducer };
