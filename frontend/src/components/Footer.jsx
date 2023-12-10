import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer bg-dark-blue" >
      <div className="container-fluid px-lg-5">
        <div className="row">
          <div className="col-md-12 pt-5">
            <div className="row">
              <div className="col-md-4 mb-md-0 mb-4">
                <h2 className="footer-heading">About us</h2>
                <p>
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia.
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
                          <li>
                            <Link className="py-1 d-block">
                              Market Analysis
                            </Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">
                              Accounting Advisor
                            </Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">
                              General Consultancy
                            </Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">
                              Structured Assestment
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-4 mb-md-0 mb-4">
                        <h2 className="footer-heading">Discover</h2>
                        <ul className="list-unstyled">
                          <li>
                            <Link className="py-1 d-block">About us</Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">Contract us</Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">
                              Terms &amp; Conditions
                            </Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">Policies</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-4 mb-md-0 mb-4">
                        <h2 className="footer-heading">Resources</h2>
                        <ul className="list-unstyled">
                          <li>
                            <Link className="py-1 d-block">Security</Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">Global</Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">Charts</Link>
                          </li>
                          <li>
                            <Link className="py-1 d-block">Privacy</Link>
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

export default Footer