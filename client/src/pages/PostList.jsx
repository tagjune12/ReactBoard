import '@styles/postlist.scss';
import PostItem from '@components/PostList/PostItem';
import * as postAPI from '@api/post';
import { useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const lastPage = useRef();

  useEffect(() => {
    postAPI.getPostList(curPage).then((response) => {
      lastPage.current = parseInt(response.headers['last-page']);
      setPostList(response.data);
    });
  }, [curPage]);
  const onPageChange = (event) => {
    setCurPage(parseInt(event.target.innerText));
  };
  return (
    <div className="post-wrapper">
      <div>
        <Outlet />
        <div className="post-item-wrapper">
          {postList?.map((post, index) => (
            <PostItem key={post._id} post={post} postIndex={index} />
          ))}
        </div>
        <div className="pagenation">
          <button
            className="prev"
            onClick={() => {
              setCurPage((prev) => (prev === 1 ? prev : prev - 1));
            }}
          >
            prev
          </button>
          <div className="page-list">
            {Array.from(Array(lastPage.current), (_, index) => index + 1).map(
              (pageNumber) => (
                <button key={pageNumber} onClick={onPageChange}>
                  {pageNumber}
                </button>
              ),
            )}
          </div>
          <button
            className="next"
            onClick={() => {
              setCurPage((prev) =>
                prev === lastPage.current ? prev : prev + 1,
              );
            }}
          >
            next
          </button>
        </div>
        {/* <button className="post-write">글쓰기</button> */}
        <Link to="/writepost">
          <button className="post-write">글쓰기</button>
        </Link>
      </div>
    </div>
  );
};

export default PostList;
