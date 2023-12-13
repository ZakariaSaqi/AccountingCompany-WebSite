import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../redux/apiCalls/blogCalls";


function BlogSideBar() {
  const dispatch = useDispatch();
  const { blogs} = useSelector(state => state.blog)
  useEffect(() => {
    dispatch(fetchBlogs())
  },[])

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  return (
    <div className="col-md-3 ">
      <div>
        <h2 className="text-dark-blue my-4 ">Derniers posts</h2>
        <ul className="list-unstyled">
          {blogs.map((blog, index) => (
            <li key={index} className="media d-flex flex-row">
            <img
              className="rounded img-fluid mb-3 me-4  "
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
              src={blog?.image.url}
              alt=""
            />
            <div className="media-body">
              <h5 className="text-dark " style={{ fontSize: "16px" }}>
              {blog?.title}
              </h5>
              <p className="pe-3">  {formatDate(blog?.createdAt)}</p>
            </div>
          </li>
          ))}
          <Link
            to="/blogs"
            className="btn btn-lg btn-info rounded-0 w-100 text-dark"
          >
            Voir tous les posts
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default BlogSideBar;
