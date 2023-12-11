import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleService } from "../redux/apiCalls/serviceCalls";

function SingleService() {
  const dispatch = useDispatch();
  const { service } = useSelector((state) => state.service);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleService(id));
  }, [id, service, dispatch]);

  return (
    <div>
      <div className="container  py-5" style={{height :"80vh"}}>
        <div className="row d-flex flex-column align-items-center">
          <i
            className="fa-solid fa-list-check text-center pb-3 text-dark-blue"
            style={{ fontSize: "6rem" }}
          ></i>
          <div className="col-md-10">
            <h2 className="text-center ">{service?.title}</h2>
            <p>{service?.description}</p>
          </div>
          <Link
            to={`/services`}
            className="btn btn-lg btn-info rounded-0 text-dark"
            style={{ width: "max-content" }}
          >
            See all services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleService;
