import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import UpdateProfile from "./modals/UpdateProfile";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../redux/apiCalls/userCalls";
import { logoutUser } from "../redux/apiCalls/authCalls";

function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.user
  );

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState("");

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.error("Select profile photo");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  useEffect(() => {
    if(isProfileDeleted) {
      navigate("/")
    }
  }, [navigate, isProfileDeleted]);

  const deleteProfileHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this account !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };
  if (loading) {
    return (
      <div
        style={{ minHeight: "81vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <RotatingLines
          strokeColor="#007bff "
          strokeWidth="5"
          animationDuration="0.75"
          width="100"
          visible={true}
        />
      </div>
    );
  }
  if (!profile) {
    return (
      <div
        style={{ minHeight: "81vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <RotatingLines
          strokeColor="#007bff "
          strokeWidth="5"
          animationDuration="0.75"
          width="100"
          visible={true}
        />
      </div>
    );
  }
  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  return (
    <div className="blog container  my-4">
      <ToastContainer position="top-center" />
      <div className="row d-flex justify-content-center pb-0 ">
        <div className="card  col-md-4 d-flex align-items-center my-2 border-0 ">
          <img
            className="rounded-circle img-fluid mb-3 profile-photo "
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
            src={profile.profilePhoto.url}
            alt="Profile Photo"
          />
          <div className="card-body pb-0">
            <div className="d-flex flex-column align-items-center">
              <h5 className="text-dark">
                {profile?.firstname.charAt(0).toUpperCase() +
                  profile?.firstname.slice(1) +
                  " " +
                  profile?.lastname}
              </h5>
              <div className="d-flex">
                <p className="pe-3" style={{ fontSize: "13px" }}>
                  Joined {formatDate(profile?.createdAt)}
                </p>
              </div>
              {user?._id === profile?._id && (
                <div className=" d-flex">
                  <p
                    className="icon"
                    data-toggle="modal"
                    data-target="#UpdateProfile"
                    data-whatever="@mdo"
                  >
                    <i class="hover fa-solid fa-pen-to-square px-2"></i>
                  </p>
                  <label htmlFor="image" className="icon rounded">
                    <i class="hover fa-solid fa-image px-2"></i>
                  </label>
                  <div className="form-group mb-4 d-flex">
                    <input
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        updateImageSubmitHandler(e);
                      }}
                      type="file"
                      className="form-control shadow-none rounded-0"
                      id="image"
                      placeholder="Image"
                      title="Select New Image"
                      hidden
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <UpdateProfile profile={profile} />
      {user?._id === profile?._id && (
        <button
          onClick={deleteProfileHandler}
          type="button"
          className="btn w-100 btn-lg btn-danger
         rounded-0 text-light"
        >
          Delete your account
        </button>
      )}
    </div>
  );
}

export default Profile;
