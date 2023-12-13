import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "../../redux/apiCalls/userCalls";
function UpdateProfile({profile}) {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState(profile.firstname);
  const [lastname, setLastname] = useState(profile.lastname);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  useEffect(() => {
    setFirstname(profile.firstname);
    setLastname(profile.lastname);
    setEmail(profile.email);
  }, [profile]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const updateUser = { firstname, lastname };
    if (password.trim() !== "") {
     if(conPassword === password){
      updateUser.password = password;
     } else {
      toast.error("Passwords do not match");
     }
    }
    const success = dispatch(updateProfile(profile?._id, updateUser));
    if (success) {
      toast.success("Profile Updated Successfully");
      document.getElementById("UpdateProfile").click(); 
    }
  };
  return (
    <div>
    <div
      className="modal fade"
      id="UpdateProfile"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="updateProfileLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateProfileLabel">
              Update profile
            </h5>
           <p className="icon">
           <i className="fa-solid fa-x close  hover"
              data-dismiss="modal"
              aria-label="Close"></i>
           </p>
          </div>
          <div className="modal-body">
            <form onSubmit={formSubmitHandler}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label className="label text-dark" htmlFor="name">
                     First name
                    </label>
                    <input
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                      type="text"
                      className="form-control shadow-none rounded-0"
                      name="First name"
                      id="First name"
                      placeholder="First name"
                    />
                  </div>
                </div> 
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label className="label text-dark" htmlFor="name">
                     Last name
                    </label>
                    <input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                      type="text"
                      className="form-control shadow-none rounded-0"
                      name="Last name"
                      id="Last name"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="label text-dark" htmlFor="name">
                     Email
                    </label>
                    <input
                    value={email}
                      type="text"
                      disabled
                      className="form-control shadow-none rounded-0"
                      name="Email"
                      id="Email"
                      placeholder="Email"
                    />
                  </div>
                </div> 
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label className="label text-dark" htmlFor="name">
                     Password
                    </label>
                    <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control shadow-none rounded-0"
                      name="Password"
                      id="Password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="label text-dark" htmlFor="name">
                     Confirmation Password
                    </label>
                    <input
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                      type="password"
                      className="form-control shadow-none rounded-0"
                      name="conPassword"
                      id="conPassword"
                      placeholder="Confirmation Password"
                    />
                  </div>
                </div> 
                <div className="col-md-12">
                  <div className="modal-footer">
            <button
              type="button"
              className="btn btn-lg btn-secondary rounded-0 text-dark"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-lg btn-info rounded-0 text-dark">
              Update
            </button>
          </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateProfile