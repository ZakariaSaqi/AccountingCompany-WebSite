import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../AdminSidebar";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import {
  accepteTestimony,
  deleteTestimony,
  fetchTestimonies,
} from "../../../redux/apiCalls/testimonyCalls";

function Testimonies() {
  const { testimonies } = useSelector((state) => state.testimony);
  const dispatch = useDispatch();
  
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTestimonies(search));
  }, [dispatch, search]);


  const accepteTestimonyHandler = async (testimonyId) => {
    Swal.fire({
        title: "Êtes-vous sûr(e) ?",
        text: "Ce témoignage sera affiché pour les visiteurs.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Annuler",
        confirmButtonText: "Oui, Accepter !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(accepteTestimony(testimonyId));
        dispatch(fetchTestimonies(search));
      }
    });
  };
 
  const deleteTestimonytHandler = (testimonyId) => {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Vous ne pourrez pas revenir en arrière pour ce témoignage !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez-le !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteTestimony(testimonyId));
        dispatch(fetchTestimonies());
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
              <h2>Liste des témoignages  </h2>
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
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </form>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Photo</th>
                <th scope="col">Témoin</th>
                <th scope="col">Témoignage</th>
                <th scope="col">Status</th>
                <th scope="col" className="cell-actions">
                  Actions
                </th>
              </tr>
            </thead>
            { testimonies.length === 0 ? (
             <td colSpan={6}>
             <p className="text-center">Aucun résultat trouvé</p>
           </td>
           )
              : (
                <tbody>
              {testimonies.map((testimony, index) => (
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
                      src={testimony.witnessProfilePhoto}
                      alt=""
                    />
                  </td>
                  <td>{testimony.witnessName}</td>
                  <td>
                    {" "}
                    <span className="long-text">{testimony.text}</span>
                  </td>
                  <td>{testimony.isAccepted ? "Accepted" : "Refused"}</td>

                  <td className=" d-flex flex-row ">
                    {!testimony.isAccepted && (
                      <button
                       
                        onClick={() => accepteTestimonyHandler(testimony._id)}
                        className="btn btn-success rounded-0 m-1"
                      >
                        Accepter
                      </button>
                    )}
                    <button
                       
                       onClick={() => deleteTestimonytHandler(testimony._id)}
                       className="btn btn-danger rounded-0 m-1"
                     >
                       Supprimer
                     </button>
                    <button
                     
                      data-toggle="modal"
                      data-target={`#ViewTestimony-${testimony._id}`}
                      data-whatever="@mdo"
                      type="button"
                      value="Comment"
                      className="btn btn-info rounded-0 m-1"
                    >
                      Voir
                    </button>
                    <div
                      className="modal fade"
                      id={`ViewTestimony-${testimony._id}`}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ViewTestimonyLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ViewTestimonyLabel">
                            Témoignage
                            </h5>
                            <p className="icon">
                              <i
                                className="fa-solid fa-x close  hover"
                                data-dismiss="modal"
                                aria-label="Close"
                              ></i>
                            </p>
                          </div>
                          <div className="modal-body">
                            <div className="col-md-12">
                              <div className="form-group mb-4">
                                <label className="label text-dark">
                                  Description
                                </label>
                                <textarea
                                disabled
                                  value={testimony.text}
                                  name="message"
                                  className="form-control shadow-none rounded-0"
                                  id="message"
                                  cols="30"
                                  rows="4"
                                ></textarea>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-lg btn-secondary rounded-0 text-dark"
                                  data-dismiss="modal"
                                >
                                  Annuler
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Testimonies;
