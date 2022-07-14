import React from 'react';
import Button from '@components/common/Button';

const Pagination = ({ setCurPage, lastPage, onPageChange }) => {
  return (
    <div className="pagination">
      <Button
        className="prev"
        onClick={() => {
          setCurPage((prev) => (prev === 1 ? prev : prev - 1));
        }}
      >
        prev
      </Button>
      <div className="page-list">
        {Array.from(Array(lastPage), (_, index) => (
          <Button key={index + 1} onClick={onPageChange}>
            {index + 1}
          </Button>
        ))}
      </div>
      <Button
        className="next"
        onClick={() => {
          setCurPage((prev) => (prev === lastPage ? prev : prev + 1));
        }}
      >
        next
      </Button>
    </div>
  );
};

export default Pagination;
