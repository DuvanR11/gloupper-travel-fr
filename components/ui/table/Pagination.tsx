// Pagination.js

import React from 'react';

export const Pagination = ({ currentPage, totalPages, setCurrentPage }: any) => {
  const maxVisiblePages = 5;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const visiblePageNumbers = generatePageNumbers().slice(
    Math.max(currentPage - Math.floor(maxVisiblePages / 2), 0),
    Math.min(currentPage + Math.ceil(maxVisiblePages / 2), totalPages)
  );

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-r-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {visiblePageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => setCurrentPage(pageNumber)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border ${
                currentPage === pageNumber
                  ? 'bg-gray-100 text-blue-600 dark:bg-gray-700'
                  : 'border-gray-300 bg-white dark:bg-gray-800'
              } hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

