import React from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  return (
    <>
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
                <h1 className="mt-0">Contact us</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-5 bg-light">
    	<div className="container">
    		<div className="row justify-content-center">
					<div className="col-md-12">
						<div className="wrapper">
							<div className="row no-gutters">
								<div className="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">
									<div className="contact-wrap w-100 p-md-5 p-4">
										<h2 className="mb-4">Get in touch</h2>
										<form method="POST" id="contactForm" name="contactForm" className="contactForm">
											<div className="row">
												<div className="col-md-6">
													<div className="form-group mb-4">
														<label className="label text-dark" for="name">Full Name</label>
														<input type="text" className="form-control shadow-none rounded-0" name="name" id="name" placeholder="Name"/>
													</div>
												</div>
												<div className="col-md-6"> 
													<div className="form-group mb-4">
														<label className="label text-dark" for="email">Email Address</label>
														<input type="email" className="form-control shadow-none rounded-0" name="email" id="email" placeholder="Email"/>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group mb-4">
														<label className="label text-dark" for="subject">Subject</label>
														<input type="text" className="form-control shadow-none rounded-0" name="subject" id="subject" placeholder="Subject"/>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group mb-4">
														<label className="label text-dark" for="#">Message</label>
														<textarea name="message" className="form-control shadow-none rounded-0" id="message" cols="30" rows="4" placeholder="Message"></textarea>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group mb-4">
														<input type="submit" value="Send Message" className="btn btn-lg btn-info rounded-0 text-dark"/>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
								<div className="col-lg-4 col-md-5 d-flex align-items-stretch">
									<div className=" bg-dark-blue w-100 p-md-5 p-4">
										<h2 className='text-light mb-4'>Let's get in touch</h2>
					        	<div className=" w-100 d-flex align-items-start mb-4">
					        		
					        		
					      
					        		<div className="text pl-3 d-flex flex-row">
                      <i className="fa fa-map-marker text-light pe-3" style={{fontSize : "1.5rem"}}></i>
						            <p className='text-white'>Adresse : 198 West 21th Street, Suite 721 New York NY 10016</p>
						          </div>
					          </div>
					        	<div className=" w-100 d-flex align-items-center mb-4">
					        	
					        		<div className="text pl-3 d-flex flex-row">
                      <i className="fa fa-phone text-light pe-3" style={{fontSize : "1.5rem"}}></i>
						            <p className='text-white'>Phone : <Link className='text-white' style={{textDecoration :"none"}} href="tel://1234567920">+ 1235 2355 98</Link></p>
						          </div>
					          </div>
					        	<div className=" w-100 d-flex align-items-center mb-4">
					        		<div className="text pl-3 d-flex flex-row">
                      <i className="fa fa-paper-plane text-light pe-3" style={{fontSize : "1.5rem"}}></i>
						            <p className='text-white'>Email : <Link className='text-white' style={{textDecoration :"none"}} href="mailto:info@yoursite.com">info@yoursite.com</Link></p>
						          </div>
					          </div>
					        	<div className=" w-100 d-flex align-items-center mb-4">
					        		<div className="text pl-3 d-flex flex-row">
                      <i className="fa fa-globe text-light pe-3" style={{fontSize : "1.5rem"}}></i>
						            <p className='text-white'>Website <Link className='text-white' style={{textDecoration :"none"}} href="#">yoursite.com</Link></p>
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
  )
}

export default Contact