import React, { useState } from "react";
import UpdateComment from "../../pages/modals/UpdateComment";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentBlog } from "../../redux/apiCalls/commentCalls";
function CommentList({ comments }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth);

  const [updateComment, setUpdateComment] = useState(null)
  const updateCommentHandler = (comment) => {
    setUpdateComment (comment)
  }

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
      
    }).then((result) => {
      if (result.isConfirmed) {
       dispatch(deleteCommentBlog(commentId))
      }
    });
  };
  return (
    <div>
      <h2 className="text-dark-blue mb-4 ">Commentaires <span style={{fontSize:"20px",color:"grey"}}>{comments?.length}</span></h2>
      <ul className="list-unstyled">
        {comments?.map((comment, index) => (
          <li key={index} className="media d-flex mb-3 flex-row align-items-center">
            <img
              className="rounded-circle img-fluid mb-3 me-3 profile-photo "
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
              src={comment.commenteProfilePhoto}
              alt="Profile Photo"
            />
            <div className="media-body w-100">
              <div className="d-flex justify-content-between">
                <h6 className="text-dark p-0 m-0">{comment.commenterName}</h6>
                <p
                  className="pe-3 p-0 m-0"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  <Moment fromNow ago>
                    {comment?.createdAt}
                  </Moment>{" "}
                  ago
                </p>
                {user?._id === comment?.user && (
                  <div className="d-flex">
                    <p
                       onClick={() => updateCommentHandler(comment)}
                      className="icon "
                      data-toggle="modal"
                      data-target="#UpdateComment"
                      data-whatever="@mdo"
                    >
                      <i className="hover fa-solid fa-pen-to-square"></i>
                    </p>
                    <p className="icon"
                      onClick={() => deleteCommentHandler(comment?._id)}>
                      <i className="hover fa-solid fa-trash ps-3"></i>
                    </p>
                  </div>
                )}
              </div>
              <p>{comment.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <UpdateComment updateComment={updateComment} />
    </div>
  );
}

export default CommentList;
