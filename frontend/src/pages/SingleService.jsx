import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteService,
  getSingleService,
} from "../redux/apiCalls/serviceCalls";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import UpdateService from "./modals/UpdateService";
function SingleService() {
  const dispatch = useDispatch();
  const { service } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleService(id));
  }, [id, service, dispatch]);

  const deleteServicetHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteService(id));
        navigate(`/services`);
      }
    });
  };
  return (
    <div>
      <ToastContainer position="top-center" />
      <div className="container  py-5" style={{ height: "80vh" }}>
        <div className="row d-flex flex-column align-items-center">
          <i
            className="fa-solid fa-list-check text-center pb-3 text-dark-blue"
            style={{ fontSize: "6rem" }}
          ></i>
          <div className="col-md-10">
            <h2 className="text-center ">{service?.title}</h2>
            <p>{service?.description}</p>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Link
              to={`/services`}
              className="btn btn-lg btn-info rounded-0 text-dark"
              style={{ width: "max-content" }}
            >
              See all services
            </Link>
            {user?.isAdmin && (
              <div className="d-flex">
                <p
                  className="icon"
                  data-toggle="modal"
                  data-target="#updateService"
                  data-whatever="@mdo"
                >
                  <i class="hover fa-solid fa-pen-to-square"></i>
                </p>
                <p className="icon" onClick={deleteServicetHandler}>
                  <i class="hover fa-solid fa-trash ps-3"></i>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <UpdateService service={service} />
    </div>
  );
}

export default SingleService;
