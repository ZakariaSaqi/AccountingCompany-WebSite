import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCommentBlog } from "../../redux/apiCalls/commentCalls";

function UpdateComment({updateComment}) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  useEffect(() => {
    if (updateComment) {
      setText(updateComment.text);
    }
  }, [updateComment]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Plase type something");
    const success = dispatch(updateCommentBlog(updateComment?._id, { text }));
    if (success) {
      toast.success("Comments Updated succesfuly");
      document.getElementById("UpdateComment").click();
    }
  };
  return (
    <div>
    <div
      class="modal fade"
      id="UpdateComment"
      tabindex="-1"
      role="dialog"
      aria-labelledby="updateCommentLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateCommentLabel">
              Update comment
            </h5>
           <p className="icon">
           <i class="fa-solid fa-x close  hover"
              data-dismiss="modal"
              aria-label="Close"></i>
           </p>
          </div>
          <div class="modal-body">
            <form onSubmit={formSubmitHandler}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label className="label text-dark" for="#">
                    Comment
                    </label>
                    <textarea
                    value={text}
                      name="message"
                      className="form-control shadow-none rounded-0"
                      id="message"
                      cols="30"
                      rows="4"
                      placeholder="Comment"
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div class="modal-footer">
            <button
              type="button"
              class="btn btn-lg btn-secondary rounded-0 text-dark"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-lg btn-info rounded-0 text-dark">
              Update
            </button>
          </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateComment