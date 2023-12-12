import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import Counters from './Counters'
import BlogList from '../../components/blog/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../../redux/apiCalls/blogCalls'

function AdminHome() {
  const dispatch = useDispatch();
  const {  blogs} = useSelector(state => state.blog)
  useEffect(() => {
    dispatch(fetchBlogs())
  },[])
  const last3Blogs = blogs.slice(-3);
  return (
    <div className="d-flex flex-row">
        <AdminSidebar />
        <div className="d-flex flex-column w-100"  style={{ marginLeft: '0', marginRight: '0' ,overflow: 'auto', height: '100vh' }}>
        <div
        id="myCarousel"
        className="hero hero-two carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ height: "400px", width :"100%" }}>
            <img
            className="bg-carousel"
              src="https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_960_720.jpg"
              alt=""
            />
            <div className="container d-flex h-100 align-items-center">
              <div className="carousel-caption text-center">
                <p className="mb-0">Admin Dashboard</p>
                <h1 className="mt-0">Home</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Counters />
      <section className="blog ">
        <div className="container">
          <h2>Derniers posts</h2>
        <BlogList blogs={last3Blogs}/>
      </div>
      </section>
        </div>
    </div>
  )
}

export default AdminHome