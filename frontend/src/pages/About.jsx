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
                <p className="mb-0">Home</p>
                <h1 className="mt-0">About us</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="hero2" >
        <div className="container">
          <div className="row d-flex ">
            <div className="col-md-6 d-flex">
              <img
                className=""
                src="https://cdn.pixabay.com/photo/2015/05/10/21/28/accounting-761599_640.jpg"
                alt=""
              />
            </div>
            <div className="col-md-6 ps-md-5 py-md-5" >
              <div className="header ps-md-4 pt-md-4">
                <h2 className="mb-4 text-dark-blue font-weight-bolder">
                  We Are the Best Accounting Agency
                </h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                  Separated they live in Bookmarksgrove right at the coast of
                  the Semantics, a large language ocean. A small river named
                  Duden flows by their place and supplies it with the necessary
                  regelialia. It is a paradisematic country, in which roasted
                  parts of sentences fly into your mouth.
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
