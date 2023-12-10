import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { loginUser } from "../../redux/apiCalls/authCalls";
function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
  
	const dispatch = useDispatch()
  
	const LoginFormHandler = (e) => {
	  e.preventDefault()
	  if (email.trim() === "") return toast.error("Email is required");
	  if (password.trim() === "") return toast.error("Password is required");
	  
	  dispatch(loginUser({
		email, password
	  }))
	}
  return (
    <div className="forms container  d-flex justify-content-center pt-5">
      <div className="py-5 " style={{ maxWidth: "400px" }}>
	  <ToastContainer position="top-center" />
        <h2 className="mb-4 text-center">Log in now !</h2>
        <form  onSubmit={LoginFormHandler}>
          <div className="row d-flex">
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
                value="Logn In"
                className="btn btn-lg btn-info rounded-0 text-dark"
              />
            </div>
            <div className="form-group mb-4 d-flex flex-column align-items-center">
              <p>
                Don't have an account ?
                <Link className="link" to="/signup">
                  {" "}
                  Sign Up{" "}
                </Link>
                now .
              </p>
              <p>
                Forgot password ?
                <Link className="link" to="/forgoutPassword">
                  {" "}
                  Reset{" "}
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

export default Login;
