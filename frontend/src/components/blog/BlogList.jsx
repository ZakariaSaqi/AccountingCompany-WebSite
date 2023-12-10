import React from "react";
import BlogItem from "./BlogItem";
function BlogList({ blogs }) {
  return (
    <div className="row d-flex">
      {blogs?.map((item) => (
        <div key={item._id} className="card col-md-4 d-flex  my-2 border-0 ">
          <BlogItem blog={item} />
        </div>
      ))}
    </div>
  );
}

export default BlogList;
