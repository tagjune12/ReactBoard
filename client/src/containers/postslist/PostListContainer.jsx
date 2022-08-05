import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '@modules/posts/postlist';

import PostList from '@components/postlist/PostList';
import { useParams } from 'react-router-dom';
import PaginationContainer from 'src/containers/postslist/PaginationContainer';
import Button from '@components/common/Button';
import { Link } from 'react-router-dom';

const PostListContainer = () => {
  // const [curPage, setCurPage] = useState(1);
  const dispatch = useDispatch();
  const { curPage, posts, category } = useSelector(({ postlist }) => ({
    curPage: postlist.curPage,
    posts: postlist.posts,
    category: postlist.category,
  }));
  const currentPost = useSelector(({ post }) => post.post?._id);
  const { user } = useSelector(({ user }) => user);
  // const { category } = useParams();

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
    <>
      <div className="post-list">
        <PostList posts={posts} currentPost={currentPost} />
      </div>
      <PaginationContainer />
      {user && (
        <div className="write-btn-wrapper">
          <Link to="/write">
            <Button className="post-write">글쓰기</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PostListContainer;
