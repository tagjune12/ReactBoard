import '@styles/postlist.scss';
import PostItem from '@components/PostList/PostItem';
import Button from '@components/common/Button';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { userlogin } from '@modules/user';
import { getPosts } from '@modules/postlist';

const PostListHead = () => {
  return (
    <div className="post-list-header">
      <span className="like">추천</span>
      <span className="category">카테고리</span>
      <span className="title">제목</span>
      <span className="author">작성자</span>
      <span className="date">날짜</span>
    </div>
  );
};

const PostList = () => {
  const [curPage, setCurPage] = useState(1);
  const dispatch = useDispatch();

  const { posts, lastPage } = useSelector(({ postlist }) => ({
    posts: postlist.posts,
    lastPage: postlist.lastPage,
  }));

  useEffect(() => {
    dispatch(getPosts(curPage));
  }, [curPage]);

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem('user'));
  //   console.log('useEffect', userInfo);
  //   if (userInfo) {
  //     dispatch(userlogin(userInfo));
  //   }
  // }, []);

  const onPageChange = (event) => {
    setCurPage(parseInt(event.target.innerText));
  };
  return (
    <div className="post-wrapper">
      <Outlet />
      <div className="post-list">
        <PostListHead />
        <div className="post-item-wrapper">
          {posts?.map((post, index) => (
            <PostItem key={post._id} post={post} postIndex={index} />
          ))}
        </div>
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
        <div className="write-btn-wrapper">
          <Link to="/write">
            <Button className="post-write">글쓰기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostList;
