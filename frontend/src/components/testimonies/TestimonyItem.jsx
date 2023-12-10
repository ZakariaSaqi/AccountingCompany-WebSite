import React from 'react'

function TestimonyItem({index, testimony}) {
  return (
    <div
                  key={index}
                  className="card card-testimony bg-white  border-0 mx-3"
                >
                  <img
                    className="card-img-top m-auto rounded-circle mt-3 mb-2 profile-photo"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    src={testimony?.witnessProfilePhoto}
                    alt="Profile Photo"
                  />
                  <div className="card-body text-center" >
                    <h5 className="text-dark-blue mb-2" >{testimony.witnessName}</h5>
                    <div className="testimony-text">
                    <p >
                    <i class="fa-solid fa-quote-left me-1"></i> {testimony.text}
                    <i class="fa-solid fa-quote-right  ms-1"></i>
                    </p>
                    </div>
                  </div>
                </div>
  )
}

export default TestimonyItem