import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../redux/apiCalls/blogCalls";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
function CreateBlog() {

  const dispatch = useDispatch();
  const { loading, isBlogCreated } = useSelector((state) => state.blog);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Blog title is required");
    if (text.trim() === "") return toast.error("Blog description is required");
    if (!file) return toast.error("Blog image is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", text);
    formData.append("image", file);
    dispatch(createBlog(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isBlogCreated) {
      navigate("/AdminDash/BlogsTable");
    }
  }, [isBlogCreated, navigate]);

  return (
    <div className="d-flex flex-row">
      <ToastContainer position="top-center" />
      <AdminSidebar />
      <div
        className="d-flex flex-column w-100"
        style={{ overflow: "auto", height: "100vh" }}
      >
        <div className="container p-5">
          <div className="row">
            <div className="col-md-12">
              <h2>Create Blog </h2>
            </div>
          </div>
          <div className="container">
            <form onSubmit={formSubmitHandler}>
              <div className="row d-flex">
                <div className="form-group mb-4">
                  <label className="label text-dark" for="email">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none rounded-0"
                    name="email"
                    id="email"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="label text-dark" for="subject">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control shadow-none rounded-0"
                    name="subject"
                    id="subject"
                    placeholder="Description"
                    onChange={(e) => setText(e.target.value)}
                    rows="5"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label>Image</label>
                  <div className="input-group mb-4">
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      className="form-control shadow-none rounded-0"
                      id="image"
                      placeholder="Image"
                    />
                    <div htmlFor="image" className="input-group-prepend ">
                      <span className="input-group-text">
                        <i className="bi bi-images"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-4 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-info rounded-0 text-dark"
                  >
                    {loading ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                      />
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
