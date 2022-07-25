import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '@modules/posts/postlist';

import PostList from '@components/postlist/PostList';

const PostListContainer = () => {
  // const [curPage, setCurPage] = useState(1);
  const dispatch = useDispatch();
  const { curPage, posts } = useSelector(({ postlist }) => ({
    curPage: postlist.curPage,
    posts: postlist.posts,
  }));

  useEffect(() => {
    dispatch(getPosts(curPage));
  }, [dispatch, curPage]);

  return (
    <div className="post-list">
      <PostList posts={posts} />
    </div>
  );
};

export default PostListContainer;
