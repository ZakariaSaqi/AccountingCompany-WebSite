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
        <h2 className="mb-4 text-center">Connectez-vous maintenant</h2>
        <form  onSubmit={LoginFormHandler}>
          <div className="row d-flex">
            <div className="form-group mb-4">
              <label className="label text-dark" htmlFor="email">
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
              <label className="label text-dark" htmlFor="subject">
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
                value="Connexion"
                className="btn btn-lg btn-info rounded-0 text-dark"
              />
            </div>
            <div className="form-group mb-4 d-flex flex-column align-items-center">
              <p>
              Vous n'avez pas de compte ?
                <Link className="link" to="/signup">
                {" "}
                S'inscrire   {" "}
                </Link>
                maintenant.
              </p>
              <p>
              Mot de passe oublié ?
                <Link className="link" to="/forgoutPassword">
                  {" "}
                  Réinitialiser{" "}
                </Link>
                maintenant.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
