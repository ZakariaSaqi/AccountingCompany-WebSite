import React from "react";
import {  NavLink } from "react-router-dom";
import AuthNavbar from "./AuthNavbar";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav>
      <div className="navbar-container container-fluid p-0 bg-light">
        <div className="container-fluid container-lg p-0">
          <div className="text-dark">
            <div className="row justify-content-center align-items-center mx-auto">
              <div className="col-12 col-lg-3 p-0">
                <div className="display-3 fw-bold py-2 text-center text-lg-start d-none d-lg-block">
                 <div className="d-flex flex-rowalign-items-center">
                 <img src="./Logo.svg" className="logo-icon" alt=""  />
                 <h3 className="m-0 text-dark-blue">ETA ECO</h3>
                 </div>
                </div>
              </div>
              <div className="col-4 col-lg-3 sideLine">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-location-dot me-3 p-2 py-3 iconHeight"></i>
                  <div className="d-none d-lg-block">
                  <span className="fw-medium">Adresse</span> <br/>
                  Quartier EL-QODSS N°32
                  </div>
                </div>
              </div>
              <div className="col-4 col-lg-3 sideLine">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-phone me-3 p-2 py-3 iconHeight"></i>
                  <div className="d-none d-lg-block">
                    <span className="fw-medium">Téléphone</span>
                    <br />   + 212 661 506 209
                  </div>
                </div>
              </div>
              <div className="col-4 col-lg-3 sideLine">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-envelope me-3 p-2 py-3 iconHeight"></i>
                  <div className="d-none d-lg-block">
                    <span className="fw-medium">Email</span>
                    <br /> BETAECO4u@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-0 d-lg-none" />
          <div className="text-center display-3 fw-bold mb-2 d-lg-none">
            BETA ECO
          </div>
          <div className="bg-dark-blue" data-bs-theme="dark">
            <nav className="navbar navbar-expand-lg justify-content-center justify-content-lg-between p-0">
              <button
                className="navbar-toggler m-3 w-100"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
               
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarNavDropdown"
              >
                <ul className="navbar-nav text-uppercase ps-3">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link pe-3"
                      aria-current="page"
                     to="/"
                     activeclassname="active" exact="true"
                    >
                      Accueil
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-lg-3" activeclassname="active" exact="true" to="/about">
                    À propos
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-lg-3" activeclassname="active" exact="true" to="/services">
                    Services
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link px-lg-3" activeclassname="active" exact="true" to="/blogs">
                      Posts
                    </NavLink>
                  </li>
                  
                  <li className="nav-item">
                    <NavLink className="nav-link px-lg-3" activeclassname="active" exact="true" to="/contact">
                    Contact
                    </NavLink>
                  </li>
                  { user?.isAdmin && (
                    <li className="nav-item">
                    <NavLink className="nav-link px-lg-3" activeclassname="active" exact="true" to="/AdminDash/home">
                      Admin
                    </NavLink>
                  </li>
                  )}
                </ul>
                <AuthNavbar />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
