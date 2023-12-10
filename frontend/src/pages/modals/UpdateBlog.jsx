import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateBlog } from "../../redux/apiCalls/blogCalls";
function UpdateBlog({ blog }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(blog.title);
    setDescription(blog.description);
  }, [blog._id]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Blog title is required");
    if (description.trim() === "")
      return toast.error("Blog description is required");
    const success = dispatch(updateBlog({ title, description }, blog?._id));

    if (success) {
      toast.success("Blog Updated succesfuly");
      document.getElementById("updateBlog").click();
    }
  };

  return (
    <div>
      <div
        class="modal fade"
        id="updateBlog"
        tabindex="-1"
        role="dialog"
        aria-labelledby="updateBlogLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updateBlogLabel">
                Update blog
              </h5>
              <p className="icon">
                <i
                  class="fa-solid fa-x close  hover"
                  data-dismiss="modal"
                  aria-label="Close"
                ></i>
              </p>
            </div>
            <div class="modal-body">
              <form onSubmit={formSubmitHandler}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="label text-dark" for="name">
                        Title
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control shadow-none rounded-0"
                        name="title"
                        id="title"
                        placeholder="Title"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <label className="label text-dark" for="#">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="message"
                        className="form-control shadow-none rounded-0"
                        id="message"
                        cols="30"
                        rows="4"
                        placeholder="Description"
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
                      <button
                        type="submit"
                        className="btn btn-lg btn-info rounded-0 text-dark"
                      >
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
  );
}

export default UpdateBlog;
