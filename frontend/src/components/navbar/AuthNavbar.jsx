import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authCalls";

function AuthNavbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <ul className="navbar-nav ps-3 m-1 p-3">
      {user ? (
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle px-lg-3"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
             {user?.firstname.charAt(0).toUpperCase() +
                      user?.firstname.slice(1) +
                      " " +
                      user?.lastname}
            <img
              className="rounded-circle img-fluid profile-photo ms-2"
              style={{
                width: "30px",
                height: "30px",
                objectFit: "cover",
              }}
              src={user?.profilePhoto.url}
              alt="Profile Photo"
            />
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <Link className="dropdown-item" to={`/profile/${user?._id}`}>
              Profil
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" onClick={() => dispatch(logoutUser())}>
              Déconnexion
              </Link>
            </li>
          </ul>
        </li>
      ) : (
        <li className="nav-item ">
          <Link to="/login" className="btn  border border-white rounded-0">
          Connexion
          </Link>
        </li>
      )}
    </ul>
  );
}

export default AuthNavbar;
