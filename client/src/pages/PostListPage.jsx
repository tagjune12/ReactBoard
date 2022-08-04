import { Outlet } from 'react-router';
import PostListContainer from 'src/containers/postslist/PostListContainer';

const PostListPage = () => {
  return (
    <div className="post-wrapper">
      <Outlet />
      <PostListContainer />
    </div>
  );
};

export default PostListPage;
