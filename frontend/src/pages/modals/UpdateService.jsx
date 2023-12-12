import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateService } from "../../redux/apiCalls/serviceCalls";
function UpdateService({ service }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(service?.title);
    setDescription(service?.description);
  }, [service?._id]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Le titre du service est requis.");
    if (description.trim() === "")
      return toast.error("La description du service est requise.");
    const success = dispatch(updateService({ title, description }, service?._id));

    if (success) {
      toast.success("Service modifié avec succès.");
      document.getElementById("updateService").click();
    }
  };

  return (
    <div>
      <div
        class="modal fade"
        id="updateService"
        tabindex="-1"
        role="dialog"
        aria-labelledby="updateServiceLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updateServiceLabel">
              Modifier le service
              </h5>
              <p className="icon">
                <i
                  class="fa-solid fa-x close  hover"
                  data-dismiss="modal"
                  aria-label="Close"
                ></i>
              </p>
            </div>
            <div class="modal-body">
              <form onSubmit={formSubmitHandler}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="label text-dark" for="name">
                        Titre
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control shadow-none rounded-0"
                        name="title"
                        id="title"
                        placeholder="Titre"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <label className="label text-dark" for="#">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="message"
                        className="form-control shadow-none rounded-0"
                        id="message"
                        cols="30"
                        rows="4"
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-lg btn-secondary rounded-0 text-dark"
                        data-dismiss="modal"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="btn btn-lg btn-info rounded-0 text-dark"
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateService;
