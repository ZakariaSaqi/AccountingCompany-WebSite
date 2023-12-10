import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServices } from '../../redux/apiCalls/serviceCalls';
import { ToastContainer } from "react-toastify";
function ServiceList() {
  const { services} = useSelector(state => state.service)
  const dispatch = useDispatch();
  useEffect (() => {
    dispatch(fetchServices())
  },[services])
  return (
    <section className=" bg-white my-5">
       <ToastContainer position="top-center" />
    <div className="container">
      <div className="row">
       { services.map(((service, index) => (
         <div key={index} className="col-md-6 col-lg-3 d-flex services align-self-stretch px-4 ftco-animate">
         <div className="d-block">
          
           <div className="media-body d-flex flex-column ">
           <i className="fa-solid fa-list-check text-center pb-3 text-dark-blue" style={{fontSize :"4rem"}}></i>
             <h3 className="heading">{service.title}</h3>
             <p className='Thre-text'>
               {service.description}
             </p>
           </div>
         </div>
       </div>
       )))}
      </div>
    </div>
  </section>
  )
}

export default ServiceList