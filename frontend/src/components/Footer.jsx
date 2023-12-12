import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchServices } from "../redux/apiCalls/serviceCalls";

function Footer() {
  const { services } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices());
  }, [services]);
  return (
    <footer className="footer bg-dark-blue">
      <div className="container-fluid px-lg-5">
        <div className="row">
          <div className="col-md-12 pt-5">
            <div className="row">
              <div className="col-md-4 mb-md-0 mb-4">
                <h2 className="footer-heading">À proposA</h2>
                <p>
                  Beta Eco, cabinet comptable de renom, se distingue par son
                  approche intégrée de la gestion d'entreprise.
                </p>
                <ul className="ftco-footer-social p-0"></ul>
              </div>
              <div className="col-md-8">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-10">
                    <div className="row">
                      <div className="col-md-4 mb-md-0 mb-4">
                        <h2 className="footer-heading">Services</h2>
                        <ul className="list-unstyled">
                          {services.map((service) => (
                            <li>
                              <Link className="py-1 d-block">
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-4 mb-md-0 mb-4">
                        <h2 className="footer-heading">Découvrir</h2>
                        <ul className="list-unstyled">
                          <li>
                            <Link to="/" className="py-1 d-block">
                              Accueil
                            </Link>
                          </li>
                          <li>
                            <Link to="/about" className="py-1 d-block">
                              À propos
                            </Link>
                          </li>
                          <li>
                            <Link to="/blogs" className="py-1 d-block">
                              Posts
                            </Link>
                          </li>
                          <li>
                            <Link to="/contact" className="py-1 d-block">
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-4 mb-md-0 mb-4">
                        <h2 className="footer-heading">Ressources</h2>
                        <ul className="list-unstyled">
                          <li>
                            <Link className="py-1 d-block">Sécurité</Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">Global</Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">Graphiques</Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">
                              Confidentialité
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
