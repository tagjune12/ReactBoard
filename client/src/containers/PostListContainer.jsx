import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '@modules/posts/postlist';

import PostList from '@components/PostList/PostList';
import Pagination from '@components/common/Pagination';
import Button from '@components/common/Button';
import { Link } from 'react-router-dom';

const PostListContainer = () => {
  const [curPage, setCurPage] = useState(1);
  const dispatch = useDispatch();
  const { posts, lastPage } = useSelector(({ postlist }) => ({
    posts: postlist.posts,
    lastPage: postlist.lastPage,
  }));

  useEffect(() => {
    dispatch(getPosts(curPage));
  }, [curPage]);

  const onPageChange = (event) => {
    setCurPage(parseInt(event.target.innerText));
  };
  return (
    <div className="post-list">
      <PostList
        posts={posts}
        setCurPage={setCurPage}
        lastPage={lastPage}
        onPageChange={onPageChange}
      />
      <Pagination
        setCurPage={setCurPage}
        lastPage={lastPage}
        onPageChange={onPageChange}
      />
      <div className="write-btn-wrapper">
        <Link to="/write">
          <Button className="post-write">글쓰기</Button>
        </Link>
      </div>
    </div>
  );
};

export default PostListContainer;
