import { blogActions } from "../slices/blogSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { commentActions } from "../slices/commentSlice";
//create new comment
export function createCommentBlog(newComm) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", newComm, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(blogActions.addCommentToPost(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//update new comment
export function updateCommentBlog(commentId, comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/comments/${commentId}`, comment, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(blogActions.updateComment(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//delete  comment
export function deleteCommentBlog(commentId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/${commentId}`,{
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(blogActions.deleteComment(commentId));
      dispatch(commentActions.deleteComment(commentId))
      toast.success("Comment has been deleted !")
    } catch (error) {
      toast.error(error);
    }
  };
}
//GET ALL commentS
export function getAllComment(search) {
  return async (dispatch, getState) => {
    let link;
    if (search) {
      link = request.get(`/api/comments?search=${search}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
    } else {
      link = request.get(`/api/comments`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
    }
    try {
      const {data} = await link;
      dispatch(commentActions.setAllComments(data));
    } catch (error) {
      toast.error(error);
    }
  };
}

export function getCommentsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/comments/count");
      dispatch(commentActions.setCommentsCount(data));
    } catch (error) {
      toast.error(error);
    }
  };
}