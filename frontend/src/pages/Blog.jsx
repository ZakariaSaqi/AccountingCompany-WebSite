import React, { useEffect, useState } from 'react'
import BlogList from '../components/blog/BlogList'
import Pagination from '../components/Pagination'
import {useDispatch, useSelector} from "react-redux"
import { fetchBlogs, getBlogsCount } from '../redux/apiCalls/blogCalls';

const POST_PER_PAGE = 6

function Blog() {

  const dispatch = useDispatch();
  const { blogsCount, blogs} = useSelector(state => state.blog)

  const [currentPage, setCurrentPage] = useState(1)
  const pages = Math.ceil(blogsCount / POST_PER_PAGE)
  useEffect(() => {
    dispatch(fetchBlogs(currentPage))
  },[currentPage])
  useEffect(() => {
    dispatch(getBlogsCount())
  },[])
  return (
    <>
    <div>
      <div
        id="myCarousel"
        className="hero hero-two carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ height: "400px" }}>
            <img
            className="bg-carousel"
              src="https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_960_720.jpg"
              alt=""
            />
            <div className="container d-flex h-100 align-items-center">
              <div className="carousel-caption text-center">
                <p className="mb-0">Home</p>
                <h1 className="mt-0">Blog </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="blog my-4">
        <div className="container">
          <BlogList blogs={blogs}/>
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
            <Pagination pages={pages} currentPage= {currentPage} setCurrentPage = {setCurrentPage} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Blog