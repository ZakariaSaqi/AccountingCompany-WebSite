import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/apiCalls/serviceCalls";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
function ServiceList() {
  const { services } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices());
  }, [services]);
  return (
    <section className=" bg-white my-5">
      <ToastContainer position="top-center" />
      <div className="container">
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="card col-md-4 d-flex  my-2 border-0 ">
              <div className="d-block">
                <div className="media-body d-flex flex-column ">
                  <i
                    className="fa-solid fa-list-check text-center pb-3 text-dark-blue"
                    style={{ fontSize: "4rem" }}
                  ></i>
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center">
                      <h5 className="text-dark">{service?.title} </h5>
                      <p className="three-text">{service.description}</p>
                      <Link
                        to={`/services/${service._id}`}
                        className="btn btn-lg btn-info rounded-0 text-dark"
                        style={{ width: "max-content" }}
                      >
                        Read more ...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceList;
