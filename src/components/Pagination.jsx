import React from "react";

const Pagination = ({ page, setPage, hasNextPage }) => {
  const pageNumbers = Array.from({ length: 5 }, (_, i) => {
    const offset = Math.floor((5 - 1) / 2); // Center the current page in the middle
    const startPage = Math.max(page - offset, 1);
    return startPage + i;
  });

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        className="px-4 py-2 bg-blue-600 text-gray-200 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-3 py-1 rounded-lg shadow-md hover:bg-blue-700 transition ${
            pageNumber === page ? "bg-blue-700 text-white" : "bg-blue-600 text-gray-200"
          }`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="px-4 py-2 bg-blue-600 text-gray-200 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
        onClick={() => setPage((old) => old + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
