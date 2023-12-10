import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { createCommentBlog } from '../../redux/apiCalls/commentCalls';

function CommentForm({blogId}) {
  const dispatch = useDispatch()
  const [text, setText] = useState("")
  const formSubmitHandler = (e) => {
    e.preventDefault()
    if (text.trim() === "") return toast.error("Plase type something");
    dispatch(createCommentBlog({text, blogId}))
    toast.success("Comment submitted successfully!");
    setText("")
  }
  
  
  return (
    <form className="form-group mb-4 d-flex" onSubmit={formSubmitHandler}>
    <input
      type="text"
      className="form-control shadow-none rounded-0"
      name="text"
      id="text"
      placeholder="Leave a comment ..."
      onChange={(e) => setText(e.target.value)}
    />
    <button type="submit" value="Comment" className="btn btn-lg btn-info rounded-0 text-dark-blue">
    <i class="fa-solid fa-paper-plane"></i>
    </button>
  </form>
  )
}

export default CommentForm