import React from "react";
import '../App.css'
import { Link } from "react-router-dom";

function Pagination({ pages, currentPage, setCurrentPage }) {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }

  return (
    <nav aria-label="navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Link
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="page-link text-dark-blue border-0 shadow-none"
            tabIndex="-1"
            aria-disabled="true"
          >
            Previous
          </Link>
        </li>
        {generatedPages.map((page) => (
          <li key={page} className={currentPage === page ? "page-item active" : "page-item"}>
            <Link
              onClick={() => setCurrentPage(page)}
              className="page-link text-dark-blue border-0 shadow-none"
            >
              {page}
            </Link>
          </li>
        ))}
        <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
          <Link
            onClick={() => setCurrentPage((next) => next + 1)}
            className="page-link text-dark-blue border-0 shadow-none"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
