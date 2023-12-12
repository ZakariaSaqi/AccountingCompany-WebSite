import React from "react";
import { Link } from "react-router-dom";
import Counter from "../components/Counter";
import BlogList from "../components/blog/BlogList";
import ServiceList from "../components/services/ServiceList";

function Home() {
  return (
    <>
      <div 
        id="myCarousel"
        className="hero carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className=""
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className=""
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className="active"
            aria-current="true"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item">
            <img
              className="bg-carousel"
              src="https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_960_720.jpg"
              alt=""
            />
            <div className="container">
              <div className="carousel-caption">
                <h1>Naviguez vers le Succès, Assurez l'Avenir</h1>
                <p>Donnez de l'ampleur à votre entreprise avec nos services comptables et juridiques experts.
                </p>
                <p>
                  <Link
                    className="btn btn-lg btn-info rounded-0 text-dark"
                   to="/login"
                  >
                   Connectez-vous maintenant
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="bg-carousel"
              src="https://cdn.pixabay.com/photo/2014/10/16/20/08/income-tax-491626_960_720.jpg"
              alt=""
            />
            <div className="container">
              <div className="carousel-caption">
                <h1>Précision, Expertise, Excellence</h1>
                <p>
                Là où la clarté financière rencontre les conseils stratégiques pour une entreprise prospère.
                </p>
                <p>
                  <Link
                    className="btn btn-lg btn-info rounded-0 text-dark"
                   to="/services"
                  >
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              className="bg-carousel"
              src="https://cdn.pixabay.com/photo/2016/03/05/20/00/accountant-1238598_960_720.jpg"
              alt=""
            />

            <div className="container">
              <div className="carousel-caption ">
                <h1>Semer, Cultiver, Prospérer avec Nous</h1>
                <p>
                Libérez tout le potentiel de votre entreprise agricole avec nos solutions de gestion holistiques.
                </p>
                <p>
                  <Link
                    className="btn btn-lg btn-info rounded-0 text-dark"
                    to="/about"
                  >
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <i className="fa-solid fa-chevron-left"></i>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className=" carousel-control carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <i className="fa-solid fa-chevron-right"></i>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <section className="hero2"  data-aos="fade-left">
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
                <h2 className="mb-4 text-dark-blue font-weight-bolder">
                  We Are the Best Accounting Agency
                </h2>
              </div>
              <div className="services-2 w-100 d-flex">
                <div className="icon text-dark-blue  me-4 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-chart-simple"></i>
                </div>
                <div className="text pl-4">
                  <h4 className="text-dark-blue fw-bold">Expertise Fiable</h4>
                  <p>
                  Précision et professionnalisme assurés grâce à notre équipe expérimentée et sectorielle.
                  </p>
                </div>
              </div>
              <div className="services-2 w-100 d-flex">
                <div className="icon  text-dark-blue me-4 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-chart-simple"></i>
                </div>
                <div className="text pl-4">
                  <h4 className="text-dark-blue fw-bold">Solutions Personnalisées </h4>
                  <p>
                  Des solutions adaptées à votre entreprise, unique en son genre, pour favoriser le succès.
                  </p>
                </div>
              </div>
              <div className="services-2 w-100 d-flex">
                <div className="icon  text-dark-blue me-4 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-chart-simple"></i>
                </div>
                <div className="text pl-4">
                  <h4 className="text-dark-blue fw-bold">
                  Intégration Technologique
                  </h4>
                  <p>
                  Rationalisation des processus grâce à notre avancée technologique pour des décisions éclairées en temps réel.
                  </p>
                </div>
              </div>
              <div className="services-2 w-100 d-flex">
                <div className="icon  text-dark-blue me-4 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-chart-simple"></i>
                </div>
                <div className="text pl-4">
                  <h4 className="text-dark-blue ">Support Complet</h4>
                  <p>
                  Au-delà de la comptabilité et du juridique, un soutien complet, de la formation aux conseils proactifs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      <div data-aos="fade-right">
      <ServiceList />
      </div>
      <Counter />
      
    </>
  );
}

export default Home;
