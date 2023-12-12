import React from 'react'
import ServiceList from '../components/services/ServiceList'

function Service() {
  return (
    <>
    <div>
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
                <h1 className="mt-0">Services </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ServiceList />
    </>
  )
}

export default Service