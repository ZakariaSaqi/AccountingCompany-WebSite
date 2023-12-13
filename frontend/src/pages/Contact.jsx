import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import request from "../utils/request";
import { ToastContainer, toast } from "react-toastify";
function Contact() {
  const [fullname, setFullname] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (fullname.trim() === "") return toast.error("Fullname is required");
    if (email.trim() === "") return toast.error("Email adresse is required");
    if (subject.trim() === "") return toast.error("Email subject is required");
    if (message.trim() === "") return toast.error("Email message is required");

    const response = request.post("/api/sendEmail", {
      fullname: fullname,
      email: email,
      subject: subject,
      message: message,
    });
    if (response) return toast.success("Email sent successfully!");
    else return toast.error("Email sent failed!");
  };

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
                <h1 className="mt-0">Contact</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-5 bg-light" data-aos="fade-right">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h2 className="mb-4">Contactez-nous</h2>
                      <form onSubmit={formSubmitHandler}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label className="label text-dark" htmlFor="name">
                              Nom et prénom.
                              </label>
                              <input
                                onChange={(e) => setFullname(e.target.value)}
                                type="text"
                                className="form-control shadow-none rounded-0"
                                name="Nom et prénom."
                                id="name"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label className="label text-dark" htmlFor="email">
                                Email Address
                              </label>
                              <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="form-control shadow-none rounded-0"
                                name="email"
                                id="email"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group mb-4">
                              <label className="label text-dark" htmlFor="subject">
                              Sujet 
                              </label>
                              <input
                                onChange={(e) => setSubject(e.target.value)}
                                type="text"
                                className="form-control shadow-none rounded-0"
                                name="subject"
                                id="subject"
                                placeholder="Sujet "
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group mb-4">
                              <label className="label text-dark" htmlFor="#">
                                Message
                              </label>
                              <textarea
                                onChange={(e) => setMessage(e.target.value)}
                                name="message"
                                className="form-control shadow-none rounded-0"
                                id="message"
                                cols="30"
                                rows="4"
                                placeholder="Message"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group mb-4">
                              <input
                                type="submit"
                                value="Envoyer"
                                className="btn btn-lg btn-info rounded-0 text-dark"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
					
                  </div>
                  <div className="col-lg-4 col-md-5 d-flex align-items-stretch">
                    <div className=" bg-dark-blue w-100 p-md-5 p-4">
                      <h2 className="text-light mb-4">Mettez-vous en contact</h2>
                      <div className=" w-100 d-flex align-items-start mb-4">
                        <div className="">
                          <Link 
						 className="text pl-3 d-flex flex-row text-decoration-none" 
						  to="https://maps.app.goo.gl/JPQu3HUULwYLAhUu8">
						  <i
                            className="fa fa-map-marker text-light pe-3"
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                          <p className="text-white">
                            Adresse : Quartier EL-QODSS N°32, Chichaoua
                          </p>
						  </Link>
                        </div>
                      </div>
                      <div className=" w-100 d-flex align-items-center mb-4">
                        <div className="text pl-3 d-flex flex-row">
                          <i
                            className="fa fa-phone text-light pe-3"
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                          <p className="text-white">
                            Téléphone :{" "}
                            <Link
                              className="text-white"
                              style={{ textDecoration: "none" }}
                            >
                              + 212 661 506 209
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className=" w-100 d-flex align-items-center mb-4">
                        <div className="text pl-3 d-flex flex-row">
                          <i
                            className="fa fa-paper-plane text-light pe-3"
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                          <p className="text-white">
                            Email :{" "}
                            <Link
                              className="text-white"
                              style={{ textDecoration: "none" }}
                              href="mailto:info@yoursite.com"
                            >
                              BETAECO4u@gmail.com
                            </Link>
                          </p>
                        </div>
                      </div>
                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
