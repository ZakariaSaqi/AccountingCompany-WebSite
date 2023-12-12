import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../redux/apiCalls/authCalls";
import { ToastContainer } from "react-toastify";
function VerifyEmail() {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [dispatch, userId, token]);

  return (
    <div className="container"> 
         <ToastContainer position="top-center" />
      {isEmailVerified ? (
        <>
          <div
            style={{ minHeight: "81vh" }}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <i
              className="bi bi-person-check-fill text-success"
              style={{ fontSize: "5rem" }}
            ></i>
            <h3 className="text-dark-blue text-center">
              {" "}
              Your email address has been successfully verified !
            </h3>
            <Link className="btn btn-lg btn-info rounded-0 text-dark mt-4" to="/login">
              Go To Login
            </Link>
          </div>
        </>
      ) : (
        <>
          <div
            style={{ minHeight: "81vh" }}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <i
              className="bi bi-exclamation-circle text-danger "
              style={{ fontSize: "5rem" }}
            ></i>
            <h3 className="text-success text-danger">Not found </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;
