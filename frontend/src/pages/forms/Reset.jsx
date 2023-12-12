import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordCalls";

function Reset() {
  const { userId, token } = useParams();
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);
  const ResetFormHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("New password is required");
    if (conPassword.trim() === "")
      return toast.error("New password confirmation is required");
    if (password === conPassword) {
      dispatch(resetPassword(password, { userId, token }));
       navigate("/login")
    } else {
      return toast.error("Password does not match !");
    }
  };

  return (
    <div className="forms container  d-flex justify-content-center">
      <ToastContainer position="top-center" />
      <div className="py-5 " style={{ maxWidth: "400px" }}>
        {isError ? (
          <>
            <div
              style={{ minHeight: "81vh" }}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <i
                className="bi bi-exclamation-circle text-danger "
                style={{ fontSize: "5rem" }}
              ></i>
              <h3 className="text-success text-danger">Introuvable </h3>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-center">Réinitialiser Password !</h2>
            <form onSubmit={ResetFormHandler}>
              <div className="row d-flex">
                <div className="form-group mb-4">
                  <label className="label text-dark" for="subject">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control shadow-none rounded-0"
                    name="subject"
                    id="subject"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="label text-dark" for="subject">
                    Password Confirmation 
                  </label>
                  <input
                    type="password"
                    className="form-control shadow-none rounded-0"
                    name="subject"
                    id="subject"
                    placeholder="Password"
                    onChange={(e) => setConPassword(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4 d-flex justify-content-center">
                  <input
                    type="submit"
                    value="Réinitialiser"
                    className="btn btn-lg btn-info rounded-0 text-dark"
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Reset;
