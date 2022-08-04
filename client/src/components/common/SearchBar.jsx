import React, { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import DropDown from './DropDown';
import { useDispatch } from 'react-redux';
import { getPosts } from '@modules/posts/postlist';
import { useSearchParams, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import clsx from 'clsx';

const SearchBar = ({ className }) => {
  const dispatch = useDispatch();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState();
  const [searchKey, setSearchKey] = useState();
  // const { category } = useParams();
  const location = useLocation();

  const onWordChange = (event) => {
    const word = event.target.value;
    setSearchValue(word);
  };
  const searchPosts = () => {
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
    console.log('query from SearchBar', query);
  };

  useEffect(() => {
    const category = location.pathname.replace('/', '');
    console.log('카테고리 localtion', category);
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
            console.log('onSubmit');
          }}
        >
          <input
            placeholder={className ? '카테고리별 검색' : '검색'}
            onChange={onWordChange}
          />
          <AiOutlineSearch
            className="search-btn"
            onClick={() => {
              searchPosts();
              console.log('onClick');
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
