import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import AdminSidebar from "../AdminSidebar";
import {
  deleteService,
  fetchServices,
} from "../../../redux/apiCalls/serviceCalls";

function Services() {
  const { services } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchServices(search));
  }, [dispatch, search]);
  const deleteServicetHandler = (cateId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteService(cateId));
        dispatch(fetchServices(search));
      }
    });
  };
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
            <div className="col-md-4">
              <h2>Service list </h2>
            </div>
            <form className=" col-md-8 form-group mb-4 d-flex">
              <input
                value={search}
                type="text"
                className="form-control shadow-none rounded-0"
                name="search"
                id="search"
                placeholder="Search ..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="btn btn-lg btn-info rounded-0 text-dark-blue">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </form>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col" className="cell-actions">
                  Actions
                </th>
              </tr>
            </thead>
           { services.length === 0 ? (
             <td colSpan={3}>
             <p className="text-center">No results found.</p>
           </td>
           )
           : (
            <tbody>
            {services.map((service) => (
              <tr>
                <td>{service.title}</td>
                <td>
                  {" "}
                  <span className="long-text">{service.description}</span>
                </td>

                <td className=" d-flex flex-row ">
                  <button
                    onClick={() => deleteServicetHandler(service?._id)}
                    className="btn btn-danger rounded-0 m-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
           )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Services;
