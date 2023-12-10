import React from "react";

function Forgout() {
  return (
    <div className="forms container  d-flex justify-content-center">
      <div className="py-5 " style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">Please enter your Email !</h2>
        <form>
          <div className="row d-flex">
            <div className="form-group mb-4">
              <label className="label text-dark" for="email">
                Email Address
              </label>
              <input
                type="email"
                className="form-control shadow-none rounded-0"
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>


            <div className="form-group mb-4 d-flex justify-content-center">
              <input
                type="submit"
                value="Submit"
                className="btn btn-lg btn-info rounded-0 text-dark"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgout;
