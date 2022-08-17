import React, { useState, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import DropDown from '@components/common/DropDown';
import { useDispatch } from 'react-redux';
import { getPosts } from '@modules/posts/postlist';
import { useLocation } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import clsx from 'clsx';

const SearchBar = ({ className }) => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState();
  const searchbarRef = useRef('');
  const location = useLocation();

  const searchPosts = () => {
    const searchValue = searchbarRef.current.value;
    if (!searchValue) {
      alert('검색어가 없습니다');
      return;
    }
    const query = {
      [searchKey]: searchValue,
    };
    const category = location.pathname.replace('/', '');
    if (category) {
      query['category'] = category;
    }
    dispatch(getPosts(query));
  };

  useEffect(() => {
    searchbarRef.current.value = '';
  }, [location]);

  return (
    <div className={clsx('search-bar-wrapper', className)}>
      {className && (
        <DropDown
          items={[
            { name: '제목', category: 'title' },
            { name: '작성자', category: 'nickname' },
          ]}
          selectItem={setSearchKey}
        />
      )}
      <div className="search-bar">
        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault();
            searchPosts();
          }}
        >
          <input
            placeholder={className ? '카테고리별 검색' : '검색'}
            ref={searchbarRef}
          />
          <AiOutlineSearch
            className="search-btn"
            onClick={() => {
              searchPosts();
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
