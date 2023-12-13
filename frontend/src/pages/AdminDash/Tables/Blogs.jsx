import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { deleteBlog, fetchBlogs, getBlogsCount } from "../../../redux/apiCalls/blogCalls";
import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination";
const POST_PER_PAGE = 6
function Blogs() {
   const dispatch = useDispatch();
  const { blogsCount, blogs} = useSelector(state => state.blog)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pages = Math.ceil(blogsCount / POST_PER_PAGE)
  useEffect(() => {
    dispatch(fetchBlogs(currentPage, search))
  },[currentPage, search , dispatch])
 

  const deleteBlogtHandler = (blogId) => {
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
        await dispatch(deleteBlog(blogId));
        dispatch(fetchBlogs(currentPage, search));
      }
    });
  };

  return (
    <div className="d-flex flex-row">
       <ToastContainer position="top-center" />
      <AdminSidebar />
      <div
        className="d-flex flex-column w-100"
        style={{ overflow: "auto", height: "100vh" }}
      >
        <div className="container p-5">
          <div className="row">
            <div className="col-md-4">
              <h2>Liste des posts </h2>
            </div>

            <form className=" col-md-8 form-group mb-4 d-flex">
              <input
              value={search}
                type="text"
                className="form-control shadow-none rounded-0"
                name="search"
                id="search"
                placeholder="Recherche ..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <span 
                className="btn btn-lg btn-info rounded-0 text-dark-blue"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </form>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Image</th>
                <th scope="col">Titre</th>
                <th scope="col">Description</th>
                <th scope="col" className="cell-actions">Actions</th>
              </tr>
            </thead>
           { blogs.length === 0 ? (
            <td colSpan={5}>
              <p className="text-center">Aucun résultat trouvé</p>
            </td>
           ) : (
             <tbody>
             {blogs.map((blog, index) => (
               <tr>
               <th scope="row">{index + 1}</th>
               <td><img    style={{ width: "50px", height: "50px", objectFit: "cover" }}
               className=" mr-2" src={blog.image.url} alt="" /></td>
               <td> <span className="long-text">{blog.title}</span></td>
               <td>
               <span className="long-text">{blog.description}</span></td>
               <td className=" d-flex flex-row ">
                 <Link to={`/blogs/blogDetails/${blog._id}`} className="btn btn-info rounded-0 m-1">
                 Voir 
                 </Link>

                 <button 
                  onClick={() => deleteBlogtHandler(blog._id)}
                  className="btn btn-danger rounded-0 m-1">
                   Supprimer 
                 </button>
               </td>
             </tr>
             ))}
           </tbody>
           )}
          </table>
          { blogs.length > 0 && 
          (
            <Pagination pages={pages} currentPage= {currentPage} setCurrentPage = {setCurrentPage} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Blogs;
