import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTestimony } from "../../redux/apiCalls/testimonyCalls";
export default function FormTestimony() {
    const dispatch = useDispatch();

  const [text, setText] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "")
      return toast.error("La description du témoignage est obligatoire.");
    dispatch(addTestimony({ text }));
    setText("")
    document.getElementById("addTestimony").click();
  };
  return (
    <div
    className="modal fade"
    id="addTestimony"
    role="dialog"
    aria-labelledby="addTestimonyLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="addTestimonyLabel">
          Exprimez votre témoignage
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
          <form onSubmit={formSubmitHandler}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group mb-4">
                  <label className="label text-dark" htmlFor="#">
                    Description
                  </label>
                  <textarea
                  type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
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
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-lg btn-secondary rounded-0 text-dark"
                    data-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn btn-lg btn-info rounded-0 text-dark"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
