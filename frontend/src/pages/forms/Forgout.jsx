import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { forgout } from "../../redux/apiCalls/passwordCalls";
function Forgout() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const ForgoutFormHandler = (e) => {
    e.preventDefault()
    if (email.trim() === "") return toast.error("Email is required");
    dispatch(forgout(email))
  }
  return (
    <div className="forms container  d-flex justify-content-center">
      <ToastContainer position="top-center" />
      <div className="py-5 " style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">Veuillez entrer votre adresse e-mail </h2>
        <form onSubmit={ForgoutFormHandler}> 
          <div className="row d-flex">
            <div className="form-group mb-4">
              <label className="label text-dark" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div className="form-group mb-4 d-flex justify-content-center">
              <input
                type="submit"
                value="Envoyer"
                className="btn btn-lg btn-info rounded-0 text-dark"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgout;
