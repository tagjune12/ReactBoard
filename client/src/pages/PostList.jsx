import '@styles/postlist.scss';
import { Outlet } from 'react-router';
import PostListContainer from 'src/containers/postslist/PostListContainer';

const PostList = () => {
  return (
    <div className="post-wrapper">
      <Outlet />
      <PostListContainer />
    </div>
  );
};

export default PostList;
