import React, {useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addService } from "../../redux/apiCalls/serviceCalls";

function AddService() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const formSubmitHandler = (e) => {
      e.preventDefault();
      if (title.trim() === "") return toast.error("Blog title is required");
      if (description.trim() === "") return toast.error("Blog description is required");
      dispatch(addService({title, description}))
      navigate("/services")
    };
  return (
    <div className="d-flex flex-row">
      <AdminSidebar />
      <div
        className="d-flex flex-column w-100"
        style={{ overflow: "auto", height: "100vh" }}
      >
        <div className="container p-5">
          <div className="row">
            <div className="col-md-12">
              <h2>Add Service </h2>
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
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                  />
                </div>

                <div className="form-group mb-4 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-info rounded-0 text-dark"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddService