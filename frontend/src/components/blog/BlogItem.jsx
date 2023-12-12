import React from "react";
import { Link } from "react-router-dom";
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function BlogItem({ blog }) {
  return (
    <div >
      <img className="rounded" src={blog?.image.url} alt=""
       style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <p className="">
            {formatDate(blog?.createdAt)}
          </p>
          <div className="d-flex">
          <p className="icon">
            <i className="fa-solid fa-thumbs-up ps-3 me-1"></i> 
            {blog?.likes?.length}
          </p>
          {/* <p className="icon">
            <i className="fa-solid fa-comment ps-3 me-1 "></i>
            {blog?.comments?.length}
          </p> */}
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <h5 className="text-dark">
            {blog?.title}{" "}
          </h5>
          <Link
            to={`/blogs/blogDetails/${blog._id}`}
            className="btn btn-lg btn-info rounded-0 text-dark"
            style={{ width: "max-content" }}
          >
           Savoir plus...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
