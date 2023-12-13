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
    if (title.trim() === "") return toast.error("Le titre de post est requis.");
    if (description.trim() === "")
      return toast.error("La description de post est requise.");
    const success = dispatch(updateBlog({ title, description }, blog?._id));

    if (success) {
      toast.success("Post modifié avec succès.");
      document.getElementById("updateBlog").click();
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="updateBlog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="updateBlogLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateBlogLabel">
                Modifier post
              </h5>
              <p className="icon">
                <i
                  className="fa-solid fa-x close  hover"
                  data-dismiss="modal"
                  aria-label="Close"
                ></i>
              </p>
            </div>
            <div className="modal-body">
              <form onSubmit={formSubmitHandler}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="label text-dark" htmlFor="name">
                        Titre
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control shadow-none rounded-0"
                        name="title"
                        id="title"
                        placeholder="Titre"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <label className="label text-dark" htmlFor="#">
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
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-lg btn-secondary rounded-0 text-dark"
                        data-dismiss="modal"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="btn btn-lg btn-info rounded-0 text-dark"
                      >
                        Modifier
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
