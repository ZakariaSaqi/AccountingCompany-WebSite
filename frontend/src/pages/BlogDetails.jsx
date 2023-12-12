import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../components/comments/CommentList";
import CommentForm from "../components/comments/CommentForm";
import BlogSideBar from "../components/blog/BlogSideBar";
import UpdateBlog from "./modals/UpdateBlog";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteBlog,
  getSingleBlog,
  toggleLikeBlog,
  updateBlogImage,
} from "../redux/apiCalls/blogCalls";
function BlogDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { blog } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [id, blog, dispatch]);

  if (!blog) {
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

  const updateImageSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("L'image du post est obligatoire.");
    const formData = new FormData();
    formData.append("image", file);
    await dispatch(updateBlogImage(formData, blog?._id));
  };

  const deleteBlogHandler = () => {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Vous ne pourrez pas revenir en arrière pour ce post !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez-le !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteBlog(blog?._id));
        navigate(`/blogs`);
      }
    });
  };

  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return (
    <>
      <ToastContainer position="top-center" />
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
                <h1 className="mt-0">Post </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog container b-5p bg-lig">
        <div className="row">
          <div className="card col-md-9 d-flex  my-2 border-0 mb-4">
            <img
              className="rounded"
              src={blog?.image.url}
              alt=""
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              {user?.isAdmin && (
                <form className="mt-2" onSubmit={updateImageSubmitHandler}>
                  <label htmlFor="image" className=" px-1 rounded">
                    Modifier l'image du post
                  </label>
                  <div className="form-group mb-4 d-flex">
                    <input
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      type="file"
                      className="form-control shadow-none rounded-0"
                      id="image"
                      placeholder="Image"
                      title="Select New Image"
                    />
                    <button
                      type="submit"
                      className="btn btn-lg btn-info rounded-0 text-dark-blue"
                    >
                      <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    </button>
                  </div>
                </form>
              )}
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex">
                  <p className="pe-3"> {formatDate(blog?.createdAt)}</p>
                </div>
                <h5 className="text-dark">{blog?.title}</h5>
              </div>
              <p>{blog?.description} </p>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <p className="icon">
                    {user && (
                      <i
                        onClick={() => dispatch(toggleLikeBlog(blog?._id))}
                        className={
                          blog?.likes?.includes(user?._id)
                            ? "hover fa-solid fa-thumbs-up me-1"
                            : "hover fa-regular fa-thumbs-up me-1"
                        }
                        style={{ cursor: "pointer" }}
                      ></i>
                    )}
                    {blog?.likes?.length}
                  </p>
                </div>
                {user?.isAdmin && (
                  <div className="d-flex">
                    <p
                      className="icon"
                      data-toggle="modal"
                      data-target="#updateBlog"
                      data-whatever="@mdo"
                    >
                      <i class="hover fa-solid fa-pen-to-square"></i>
                    </p>
                    <p className="icon" onClick={deleteBlogHandler}>
                      <i class="hover fa-solid fa-trash ps-3"></i>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <UpdateBlog blog={blog} />
            {user ? (
              <CommentForm blogId={blog._id} />
            ) : (
              <p>Veuillez vous connecter pour écrire un commentaire !</p>
            )}
            <CommentList comments={blog?.comments} />
          </div>
          <BlogSideBar />
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
