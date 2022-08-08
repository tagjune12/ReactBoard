import { Outlet } from 'react-router';
import PostListContainer from '@containers/posts/PostListContainer';

const PostListPage = () => {
  return (
    <div className="post-wrapper">
      <Outlet />
      <PostListContainer />
    </div>
  );
};

export default PostListPage;
