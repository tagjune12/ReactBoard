import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '@modules/posts/postlist';

import PostList from '@components/posts/PostList';
import PaginationContainer from '@containers/posts/PaginationContainer';
import Button from '@components/common/Button';
import Loading from '@components/common/Loading';
import { Link } from 'react-router-dom';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const { curPage, posts, category, loading } = useSelector(
    ({ postlist, loading }) => ({
      curPage: postlist.curPage,
      posts: postlist.posts,
      category: postlist.category,
      loading: loading['postlist/LOAD_POSTS'],
    }),
  );
  const currentPost = useSelector(({ post }) => post.post?._id);
  const { user } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(
      getPosts({
        page: curPage,
        category,
      }),
    );
  }, [dispatch, category, curPage]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default PostListContainer;
