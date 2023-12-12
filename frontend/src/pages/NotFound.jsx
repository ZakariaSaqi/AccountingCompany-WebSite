import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center "
      style={{ height: "81vh" }}
    >
      <div className="text-center">
        <h1 className="display-1 fw-bold text-dark-blue">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Page nont trouvé.
        </p>
        <p className="lead">La page que vous recherchez n'existe pas.</p>
        <Link className="btn btn-lg btn-info rounded-0 text-dark" to="/">
        Aller à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
