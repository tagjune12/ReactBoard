import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePageNumber } from '@modules/posts/postlist';

import Pagination from '@components/postlist/Pagination';

const PaginationContainer = () => {
  const { lastPage, curPage } = useSelector(({ postlist }) => ({
    lastPage: postlist.lastPage,
    curPage: postlist.curPage,
  }));
  const dispatch = useDispatch();
  // const [selected, setSelected] = useState(1);

  const onPrevPageClick = () => {
    const targetPage = curPage === 1 ? curPage : curPage - 1;
    dispatch(changePageNumber(targetPage));
  };
  const onNextPageClick = () => {
    const targetPage = curPage === lastPage ? curPage : curPage + 1;
    dispatch(changePageNumber(targetPage));
  };
  const onPageChange = (targetPage) => {
    dispatch(changePageNumber(targetPage));
    // setSelected(targetPage);
  };

  return (
    <Pagination
      lastPage={lastPage}
      curPage={curPage}
      onPrevPageClick={onPrevPageClick}
      onNextPageClick={onNextPageClick}
      onPageChange={onPageChange}
    />
  );
};

export default PaginationContainer;
