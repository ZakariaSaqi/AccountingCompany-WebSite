import React from "react";
import { ToastContainer } from "react-toastify";
import Counter from "../components/Counter";
import TestimonyList from "../components/testimonies/TestimonyList";
import FormTestimony from "../components/testimonies/FormTestimony";

function About() {
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
                <p className="mb-0">Accueil</p>
                <h1 className="mt-0">À propos</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="hero2">
        <div className="container">
          <div className="row d-flex ">
            <div className="col-md-6 d-flex">
              <img
                className=""
                src="https://cdn.pixabay.com/photo/2015/05/10/21/28/accounting-761599_640.jpg"
                alt=""
              />
            </div>
            <div className="col-md-6 ps-md-5 py-md-5">
              <div className="header ps-md-4 pt-md-4">
                {/* <h2 className="mb-4 text-dark-blue font-weight-bolder">
                  We Are the Best Accounting Agency
                </h2> */}
                <p>
                  Beta Eco, cabinet comptable de renom, se distingue par son
                  approche intégrée de la gestion d'entreprise. En plus de
                  fournir des services de comptabilité de premier ordre, nous
                  offrons des conseils spécialisés dans les domaines juridique,
                  fiscal et social, garantissant une expertise complète. Nos
                  formations accélérées sur mesure visent à renforcer les
                  connaissances des étudiants en économie. Adapté à une
                  clientèle diversifiée, allant des professions libérales aux
                  TPE et PME, Beta Eco se distingue par sa flexibilité. Sous la
                  direction de M. Abdesamii SABRI, notre cabinet assure une
                  stabilité financière. Fiable, flexible et attentif, Beta Eco
                  est le partenaire idéal pour une gestion d'entreprise efficace
                  et sécurisée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Counter />
      <TestimonyList />
      <FormTestimony />
    </>
  );
}

export default About;
