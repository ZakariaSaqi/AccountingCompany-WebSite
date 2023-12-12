import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signupUser } from "../../redux/apiCalls/authCalls";
function Signin() {

  const { signupMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signupFormHandler = (e) => {
    e.preventDefault()
    if (firstname.trim() === "") return toast.error("Firstname is required");
	if (lastname.trim() === "") return toast.error("Lastname is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
   dispatch(signupUser({
    firstname, lastname ,email, password
   }))
  }

  useEffect(() => {
    if (signupMessage) {
      Swal.fire({
        icon: "success",
        title: signupMessage,
      }).then((isOk) => {
        if (isOk) {
          navigate("/login");
        }
      });
    }
  }, [signupMessage, navigate]);
  
  return (
    <div className="forms container  d-flex justify-content-center align-items-center pt-5 w-100 h-100">
      <div className="py-5 " style={{ maxWidth: "400px" }}>
	  <ToastContainer position="top-center" />
        <h2 className="mb-4 text-center">Sign up now !</h2>
        <form onSubmit={signupFormHandler}>
          <div className="row d-flex">
            <div className="form-group mb-4">
              <label className="label text-dark" for="name">
                First Name
              </label>
              <input
                type="text"
                className="form-control shadow-none rounded-0"
                name="name"
                id="name"
                placeholder="First Name"
				onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div className="form-group mb-4">
              <label className="label text-dark" for="name">
                Last Name
              </label>
              <input
                type="text"
                className="form-control shadow-none rounded-0"
                name="name"
                id="name"
                placeholder="Last Name"
				onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <div className="form-group mb-4">
              <label className="label text-dark" for="email">
                Email Address
              </label>
              <input
                type="email"
                className="form-control shadow-none rounded-0"
                name="email"
                id="email"
                placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
              />
            </div>

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

            <div className="form-group mb-4 d-flex justify-content-center">
              <input
                type="submit"
                value="Sign Up"
                className="btn btn-lg btn-info rounded-0 text-dark"
              />
            </div>
            <div className="form-group mb-4 d-flex flex-column align-items-center">
              <p>
                Already have an account ?
                <Link className="link" to="/login">
                  {" "}
                  Log In{" "}
                </Link>
                now .
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
