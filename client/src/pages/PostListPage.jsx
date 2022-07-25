import '@styles/postlist.scss';
import { Outlet } from 'react-router';

import PostListContainer from 'src/containers/postslist/PostListContainer';
import Button from '@components/common/Button';
import { Link } from 'react-router-dom';
import PaginationContainer from 'src/containers/postslist/PaginationContainer';

const PostListPage = () => {
  return (
    <div className="post-wrapper">
      <Outlet />
      <PostListContainer />
      <PaginationContainer />
      <div className="write-btn-wrapper">
        <Link to="/write">
          <Button className="post-write">글쓰기</Button>
        </Link>
      </div>
    </div>
  );
};

export default PostListPage;
