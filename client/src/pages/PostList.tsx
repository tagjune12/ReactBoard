import '@styles/postlist.scss';

import { Routes, Route } from 'react-router';
import PostItem from '@components/PostList/PostItem';
import Post from '@components/PostList/Post';

const PostList = () => {
  return (
    <div className="post-wrapper">
      <div>
        <Routes>
          <Route path=":id" element={<Post />} />
        </Routes>
      </div>
      <PostItem />
      <PostItem />
      <PostItem />
    </div>
  );
};

export default PostList;
