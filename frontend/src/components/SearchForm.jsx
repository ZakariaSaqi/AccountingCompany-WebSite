import React, { useState } from "react";

function SearchForm() {
  const [search, setSearch] = useState("");
  return (
    <form className=" col-md-8 form-group mb-4 d-flex">
      <input
        value={search}
        type="text"
        className="form-control shadow-none rounded-0"
        name="search"
        id="search"
        placeholder="Search ..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className="btn btn-lg btn-info rounded-0 text-dark-blue">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
    </form>
  );
}

export default SearchForm;
