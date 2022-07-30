import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '@modules/posts/postlist';

import PostList from '@components/postlist/PostList';
import { useParams } from 'react-router-dom';

const PostListContainer = () => {
  // const [curPage, setCurPage] = useState(1);
  const dispatch = useDispatch();
  const { curPage, posts } = useSelector(({ postlist }) => ({
    curPage: postlist.curPage,
    posts: postlist.posts,
  }));
  const { category } = useParams();

  useEffect(() => {
    dispatch(
      getPosts({
        page: curPage,
        category,
      }),
    );
    console.log('From PostListContainer');
  }, [dispatch, category, curPage]);

  useEffect(() => {
    console.log('PostList 카테고리', category);
  }, [category]);

  return (
    <div className="post-list">
      <PostList posts={posts} />
    </div>
  );
};

export default PostListContainer;
