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
                <h1>Example headline.</h1>
                <p>
                  Some representative placeholder content for the first slide of
                  the carousel.
                </p>
                <p>
                  <Link
                    className="btn btn-lg btn-info rounded-0 text-dark"
                    href="#"
                  >
                    Sign up now
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
                <h1>Another example headline.</h1>
                <p>
                  Some representative placeholder content for the second slide
                  of the carousel.
                </p>
                <p>
                  <Link
                    className="btn btn-lg btn-info rounded-0 text-dark"
                    href="#"
                  >
                    Learn more
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
                <h1>One more for good measure.</h1>
                <p>
                  Some representative placeholder content for the third slide of
                  this carousel.
                </p>
                <p>
                  <Link
                    className="btn btn-lg btn-info rounded-0 text-dark"
                    href="#"
                  >
                    Browse gallery
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
                  <h4 className="text-dark-blue fw-bold">Market Analysis</h4>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia
                  </p>
                </div>
              </div>
              <div className="services-2 w-100 d-flex">
                <div className="icon  text-dark-blue me-4 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-chart-simple"></i>
                </div>
                <div className="text pl-4">
                  <h4 className="text-dark-blue fw-bold">Accounting Advisor</h4>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia
                  </p>
                </div>
              </div>
              <div className="services-2 w-100 d-flex">
                <div className="icon  text-dark-blue me-4 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-chart-simple"></i>
                </div>
                <div className="text pl-4">
                  <h4 className="text-dark-blue fw-bold">
                    General Consultancy
                  </h4>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia
                  </p>
                </div>
              </div>
              <div className="services-2 w-100 d-flex">
                <div className="icon  text-dark-blue me-4 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-chart-simple"></i>
                </div>
                <div className="text pl-4">
                  <h4 className="text-dark-blue ">Structured Assessment</h4>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia
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
