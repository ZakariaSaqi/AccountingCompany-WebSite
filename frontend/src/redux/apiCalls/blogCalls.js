import { blogActions } from "../slices/blogSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
//Fetch posts
export function fetchBlogs(pageNumber, search) {
  let link;
  if (search) {
    link = request.get(`api/blogs?search=${search}&pageNumber=${pageNumber}`);
  } else {
    link = request.get(`api/blogs?pageNumber=${pageNumber}`);
  }
  return async (dispatch) => {
    try {
      const { data } = await link;
      dispatch(blogActions.setBlogs(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//get post count posts
export function getBlogsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/blogs/count`);
      dispatch(blogActions.setBlogsCount(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//create new post
export function createBlog(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(blogActions.setLoading());
      await request.post("api/blogs", newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(blogActions.setIsBlogCreated());
      setTimeout(() => dispatch(blogActions.clearIsBlogCreated()), 2000); //2 sec
    } catch (error) {
      toast.error(error);
      dispatch(blogActions.clearLoading());
    }
  };
}

// //get post details
export function getSingleBlog(blogId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/blogs/${blogId}`);
      dispatch(blogActions.setBlog(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//likes
export function toggleLikeBlog(blogId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `api/blogs/like/${blogId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(blogActions.setLike(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
// //update psot image
export function updateBlogImage(newPhoto, blogId) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/blogs/blog-image-update/${blogId}`, newPhoto, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("New blog image uploaded successfully");
    } catch (error) {
      toast.error(error);
    }
  };
}
// // //update psot
export function updateBlog(newBlog, blogId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/blogs/${blogId}`, newBlog, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(blogActions.setBlog(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
// // delete post
export function deleteBlog(blogId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/blogs/${blogId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(blogActions.deleteBlog(data.blogId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };
}
