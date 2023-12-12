import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteCommentBlog,
  getAllComment,
} from "../../../redux/apiCalls/commentCalls";
function Comments() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { allComments } = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(getAllComment(search));
  }, [dispatch, search, dispatch]);
  const deleteCommentHandler = (commentId) => {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Vous ne pourrez pas revenir en arrière pour ce commentaire !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez-le !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteCommentBlog(commentId));
        dispatch(getAllComment(search));
      }
    });
  };
  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return (
    <div className="d-flex flex-row">
      <AdminSidebar />
      <div
        className="d-flex flex-column w-100"
        style={{ overflow: "auto", height: "100vh" }}
      >
        <div className="container p-5">
          <div className="row">
            <div className="col-md-4">
            <h2>Liste des commentaires </h2>
            </div>

            <form className=" col-md-8 form-group mb-4 d-flex">
              <input
                value={search}
                type="text"
                className="form-control shadow-none rounded-0"
                name="search"
                id="search"
                placeholder="Search ..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="btn btn-lg btn-info rounded-0 text-dark-blue">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </form>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Photo</th>
                <th scope="col">Nom</th>
                <th scope="col">Date</th>
                <th scope="col">Commentaire</th>

                <th scope="col" className="cell-actions">
                  Actions
                </th>
              </tr>
            </thead>
           {  allComments.length === 0 ? (
             <td colSpan={6}>
              <p className="text-center">Aucun résultat trouvé</p>
           </td>
           )
            : (
              <tbody>
              {allComments.map((comment, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      className=" rounded-circle mr-2"
                      src={comment.commenteProfilePhoto}
                      alt=""
                    />
                  </td>
                  <td>{comment.commenterName}</td>
                  <td> {formatDate(comment?.createdAt)}</td>
                  <td> <span className="long-text">{comment.text}</span></td>
                  <td className=" d-flex flex-row ">
                    <button 
                    onClick={() => deleteCommentHandler(comment._id)}
                    className="btn btn-danger rounded-0 m-1">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            )
           }
          </table>
        </div>
      </div>
    </div>
  );
}

export default Comments;
