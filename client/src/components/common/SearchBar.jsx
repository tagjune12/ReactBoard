import React, { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import DropDown from './DropDown';
import { useDispatch } from 'react-redux';
import { getPosts } from '@modules/posts/postlist';
import { useSearchParams, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState();
  const [searchKey, setSearchKey] = useState();
  const { category } = useParams();
  // const query = useRef({});
  console.log('카테고리2', category);

  const onWordChange = (event) => {
    const word = event.target.value;
    setSearchValue(word);
  };
  const searchPosts = () => {
    // const category = searchParams.get('category');
    // console.log(category);
    if (!searchValue) {
      alert('검색어가 없습니다');
      return;
    }
    const query = {
      [searchKey]: searchValue,
    };
    if (category) {
      query['category'] = category;
    }
    dispatch(getPosts(query));
    // setSearchParams(query);
    console.log('query from SearchBar', query);
  };

  useEffect(() => {
    console.log('카테고리', category);
  }, [category]);

  return (
    <>
      <DropDown
        items={[
          { name: '제목', category: 'title' },
          { name: '작성자', category: 'nickname' },
        ]}
        selectItem={setSearchKey}
      />
      <div className="search-bar">
        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault();
            searchPosts();
            console.log('onSubmit');
          }}
        >
          <input placeholder="검색" onChange={onWordChange} />
          <AiOutlineSearch
            className="search-btn"
            onClick={() => {
              searchPosts();
              console.log('onClick');
            }}
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
