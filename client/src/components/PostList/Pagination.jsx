import React from 'react';
import Button from '@components/common/Button';

const Pagination = ({
  lastPage,
  onPrevPageClick,
  onNextPageClick,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      <Button className="prev" onClick={onPrevPageClick}>
        prev
      </Button>
      <div className="page-list">
        {Array.from(Array(lastPage), (_, index) => (
          <Button
            key={index + 1}
            onClick={() => {
              onPageChange(parseInt(index + 1));
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <Button className="next" onClick={onNextPageClick}>
        next
      </Button>
    </div>
  );
};

export default Pagination;
