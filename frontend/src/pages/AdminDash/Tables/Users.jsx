import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getAllProfiles,
} from "../../../redux/apiCalls/userCalls";
function Users() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { profiles, isProfileDeleted } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllProfiles(search));
  }, [isProfileDeleted, search, dispatch]);
  const deleteProfileHandler = (userId) => {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Vous ne pourrez pas revenir en arrière pour ce utilisateur !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, supprimez-le !",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProfile(userId));
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
            <h2>Liste des utilisateurs </h2>
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
                {/* <th scope="col">Email</th> */}
                <th scope="col">Rejoint</th>
                <th scope="col" className="cell-actions">
                  Actions
                </th>
              </tr>
            </thead>
            { profiles.length === 0 ? (
             <td colSpan={5}>
             <p className="text-center">Aucun résultat trouvé</p>
           </td>
           )
               : (
                <tbody>
                {profiles.map((profile, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        className=" rounded-circle mr-2"
                        src={profile.profilePhoto.url}
                        alt=""
                      />
                    </td>
                    <td>
                      {" "}
                      {profile?.firstname.charAt(0).toUpperCase() +
                        profile?.firstname.slice(1) +
                        " " +
                        profile?.lastname}
                    </td>
                    {/* <td>{profile.email}</td> */}
                    <td> {formatDate(profile?.createdAt)}</td>
                    <td className=" d-flex flex-row ">
                      <Link
                        to={`/profile/${profile._id}`}
                        className="btn btn-info rounded-0 m-1"
                      >
                        Voir
                      </Link>
  
                      <button
                        onClick={() => deleteProfileHandler(profile._id)}
                        className="btn btn-danger rounded-0 m-1"
                      >
                        Supprimer 
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

export default Users;
