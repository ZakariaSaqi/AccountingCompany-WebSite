import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Signin from "./pages/forms/Signin";
import Footer from "./components/Footer";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/forms/Login";
import Forgout from "./pages/forms/Forgout";
import Reset from "./pages/forms/Reset";
import Profile from "./pages/Profile";
import AdminHome from "./pages/AdminDash/AdminHome";
import Blogs from "./pages/AdminDash/Tables/Blogs";
import { useSelector } from "react-redux";
import CreateBlog from "./pages/AdminDash/CreateBlog";
import Comments from "./pages/AdminDash/Tables/Comments";
import Services from "./pages/AdminDash/Tables/Services";
import Users from "./pages/AdminDash/Tables/Users";
import Testimonies from "./pages/AdminDash/Tables/Testimonies";
import AddService from "./pages/AdminDash/AddService";

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({duration : 1000});

function NavigationNavbar() {
  const location = useLocation();
  const isNavbarVisible = ![
    "/AdminDash/home",
    "/AdminDash/createBlog",
    "/AdminDash/addService",
    "/AdminDash/BlogsTable",
    "/AdminDash/ServicesTable",
    "/AdminDash/UsersTable",
    "/AdminDash/CommentsTable",
    "/AdminDash/WitnesTable",
    "/signup",
    "/login",
    "/forgoutPassword",
    "/resetPassword",
    "/AdminDash",
  ].includes(location.pathname);

  return isNavbarVisible ? <Navbar /> : null;
}
function NavigationFooter() {
  const location = useLocation();

  const isFooterVisible = ![
    "/AdminDash/home",
    "/AdminDash/createBlog",
    "/AdminDash/addService",
    "/AdminDash/BlogsTable",
    "/AdminDash/ServicesTable",
    "/AdminDash/UsersTable",
    "/AdminDash/CommentsTable",
    "/AdminDash/WitnesTable",
    "/signup",
    "/login",
    "/forgoutPassword",
    "/resetPassword",
    "/AdminDash",
  ].includes(location.pathname);
  return isFooterVisible ? <Footer /> : null;
}
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <NavigationNavbar />
     
      <Routes>
    
        <Route path="blogs">
          <Route index element={<Blog />} />
          <Route path="blogDetails/:id" element={<BlogDetails />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="AdminDash">
          <Route path="home" element={<AdminHome />} />
          <Route path="BlogsTable" element={user?.isAdmin ? <Blogs /> : <Navigate to="/" />} />
          <Route path="ServicesTable" element={user?.isAdmin ? <Services /> : <Navigate to="/" />} />
          <Route path="CommentsTable" element={user?.isAdmin ? <Comments /> : <Navigate to="/" />} />
          <Route path="WitnesTable" element={user?.isAdmin ? <Testimonies /> : <Navigate to="/" />} />
          <Route path="UsersTable" element={user?.isAdmin ? <Users /> : <Navigate to="/" />} />
          <Route
            path="createBlog"
            element={user?.isAdmin ? <CreateBlog /> : <Navigate to="/" />}
          />
          <Route
            path="addService"
            element={user?.isAdmin ? <AddService /> : <Navigate to="/" />}
          />
        </Route>
        <Route
          path="/signup"
          element={!user ? <Signin /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/forgoutPassword" element={<Forgout />} />
        <Route path="/resetPassword" element={<Reset />} />
      </Routes>
      <NavigationFooter />
    </BrowserRouter>
  );
}

export default App;
