import React from 'react'
import { Link } from 'react-router-dom'

function Reset() {
  return (
    <div className="forms container  d-flex justify-content-center">
    <div className="py-5 "
    style={{maxWidth : "400px"}}>
                                      <h2 className="mb-4 text-center">Reset Password !</h2>
                                      <form >
                                          <div className="row d-flex">
                                          <div className="form-group mb-4">
                                                      <label className="label text-dark" for="subject">Password</label>
                                                      <input type="password" className="form-control shadow-none rounded-0" name="subject" id="subject" placeholder="Password"/>
                                                  </div>

                                                  <div className="form-group mb-4">
                                                      <label className="label text-dark" for="subject">Password Confirmation</label>
                                                      <input type="password" className="form-control shadow-none rounded-0" name="subject" id="subject" placeholder="Password"/>
                                                  </div>

                                                  <div className="form-group mb-4 d-flex justify-content-center">
                                                      <input type="submit" value="Reset" className="btn btn-lg btn-info rounded-0 text-dark"/>
                                                  </div>
                                          </div>
                                      </form>
                                  </div>
  </div>
  )
}

export default Reset