import React from "react";
import {NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../redux/apiCalls/authCalls';

function SidebarTest() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  return (
    <div className="container-fluid bg-dark-blue" style={{width : "max-content"}} >
      <div className="row flex-nowrap "
      >
        <div  style={{width : "max-content"}} className=" col-auto  p-3 col-md-3 col-lg-2 min-vh-100 d-flex flex-column justify-content-between">
          <div className=" "  style={{width : "max-content"}}>
            <NavLink
              to="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
                BETA
              <span className=" ms-md-2 ms-sm-0  d-none d-sm-inline">Accounting</span>
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mt-4">
              <li className="nav-item py-2 py-sm-0">
                <NavLink
                  to="/AdminDash/home"
                  className="nav-link text-white"
                  activeClassName="active"
                  exact
                >
                  <i className="fa-solid fa-house"></i>
                  <span className="ms-lg-4 ms-md-2 ms-sm-0  d-none d-sm-inline"> Home</span>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-sm-0">
                <NavLink
                  to="/AdminDash/BlogsTable"
                  className="nav-link text-white"
                  activeClassName="active"
                  exact
                >
                  <i class="fa-solid fa-newspaper"></i>
                  <span className="ms-lg-4 ms-md-2 ms-sm-0  d-none d-sm-inline"> Blogs</span>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-sm-0">
                <NavLink
                  to="/AdminDash/ServicesTable"
                  className="nav-link text-white"
                  activeClassName="active"
                  exact
                >
                  <i class="fa-solid fa-list-check"></i>
                  <span className="ms-lg-4 ms-md-2 ms-sm-0  d-none d-sm-inline"> Services</span>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-sm-0">
                <NavLink
                  to="/AdminDash/UsersTable"
                  className="nav-link text-white"
                  activeClassName="active"
                  exact
                >
                  <i class="fa-solid fa-users"></i>
                  <span className="ms-lg-4 ms-md-2 ms-sm-0  d-none d-sm-inline"> Users</span>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-sm-0">
                <NavLink
                  to="/AdminDash/CommentsTable"
                  className="nav-link text-white"
                  activeClassName="active"
                  exact
                >
                  <i class="fa-solid fa-comments"></i>
                  <span className="ms-lg-4 ms-md-2 ms-sm-0  d-none d-sm-inline">Comments</span>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-sm-0">
                <NavLink
                  to="/AdminDash/WitnesTable"
                  className="nav-link text-white"
                  activeClassName="active"
                  exact
                >
                  <i class="fa-solid fa-handshake-simple "></i>
                  <span className="ms-lg-4 ms-md-2 ms-sm-0  d-none d-sm-inline">Testimonies</span>
                </NavLink>
              </li>
              <hr />
              <li className="nav-item py-2 py-sm-0">
                <NavLink
                  to="/AdminDash/addService"
                  className="nav-link text-white"
                  activeClassName="active"
                  exact
                >
                  <i class="fa-solid fa-square-plus"></i>
                  <span className="ms-lg-4 ms-md-2 ms-sm-0  d-none d-sm-inline"> Add Service</span>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-sm-0">
                <NavLink
                  to="/AdminDash/createBlog"
                  className="nav-link text-white"
                  activeClassName="active"
                  exact
                >
                  <i class="fa-solid fa-file-circle-plus"></i>
                  <span className="ms-lg-4 ms-md-2 ms-sm-0  d-none d-sm-inline"> Create Blog</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <hr />
          <div className="dropdown">
      <NavLink to="/AdminDash/BlogsTable" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={user?.profilePhoto.url} alt="" width="32" height="32" className="rounded-circle me-2"/>
        <span className="ms-lg-4 ms-md-2 ms-sm-0  d-none d-sm-inline">{user?.firstname.charAt(0).toUpperCase()+ user?.firstname.slice(1) }</span>
      </NavLink>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><Link className="dropdown-item" to="/">Back Home ..</Link></li>
        <li><Link className="dropdown-item" to={`/profile/${user?._id}`}>Profile</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item" onClick={() => dispatch(logoutUser())} >LogOut</Link></li>
      </ul>
    </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarTest;
