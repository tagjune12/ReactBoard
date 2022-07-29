import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '@modules/posts/postlist';

import PostList from '@components/postlist/PostList';
import { useSearchParams, useParams } from 'react-router-dom';

const PostListContainer = () => {
  // const [curPage, setCurPage] = useState(1);
  const dispatch = useDispatch();
  const { curPage, posts } = useSelector(({ postlist }) => ({
    curPage: postlist.curPage,
    posts: postlist.posts,
  }));
  // const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  useEffect(() => {
    // console.log(searchParams);
    // console.log(searchParams.get('category'));
    // const category = searchParams.get('category');
    console.log('location', category);
    dispatch(
      getPosts({
        page: curPage,
        // category: location.category,
        category,
      }),
    );
  }, [dispatch, category, curPage]);

  return (
    <div className="post-list">
      <PostList posts={posts} />
    </div>
  );
};

export default PostListContainer;
