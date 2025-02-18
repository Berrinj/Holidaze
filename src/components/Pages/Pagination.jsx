import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

function Pagination({
  currentPage,
  lastPage,
  onPageChange,
  isFirstPage,
  isLastPage,
}) {
  const pages = [];

  if (lastPage <= 1) {
    return null;
  }
  if (isFirstPage && isLastPage) {
    return null;
  }

  if (currentPage > 1) {
    pages.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        className="pagination-btn mr-2 flex items-center gap-1"
      >
        <GoArrowLeft /> Previous
      </button>,
    );
  }

  pages.push(
    <button
      key={1}
      onClick={() => onPageChange(1)}
      className={currentPage === 1 ? "font-bold mx-2" : "scale-90"}
    >
      1
    </button>,
  );

  if (currentPage > 3) {
    pages.push(
      <span key="start-ellipsis" className="mx-4 text-2xl">
        ...
      </span>,
    );
  }

  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(lastPage - 1, currentPage + 1);
    i++
  ) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={currentPage === i ? "font-bold mx-2 scale-110" : "scale-90"}
      >
        {i}
      </button>,
    );
  }

  if (currentPage < lastPage - 2) {
    pages.push(
      <span key="end-ellipsis" className="mx-4 text-2xl">
        ...
      </span>,
    );
  }

  pages.push(
    <button
      key={lastPage}
      onClick={() => onPageChange(lastPage)}
      className={currentPage === lastPage ? "font-bold" : "scale-90"}
    >
      {lastPage}
    </button>,
  );

  if (currentPage < lastPage) {
    pages.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-btn ml-2 flex items-center gap-1"
      >
        Next <GoArrowRight />
      </button>,
    );
  }

  return (
    <div className="pagination flex flex-wrap justify-center mt-4 text-white">
      {pages}
    </div>
  );
}

export default Pagination;
