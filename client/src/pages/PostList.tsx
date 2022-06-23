import '@styles/post/postlist.scss';
import { Routes, Route } from 'react-router';
import PostItem from '@components/PostList/PostItem';
import PostView from '@components/PostList/PostView';
import * as postAPI from '@api/post';

const PostList = () => {
  const postList = postAPI.getPostList('1', undefined, undefined);

  return (
    <div className="post-wrapper">
      <div>
        <div>
          <Routes>
            <Route path="/post/:id" element={<PostView />} />
          </Routes>
        </div>
        <div className="post-item-wrapper">
          <PostItem postId="1" />
          <PostItem postId="2" />
          <PostItem postId="3" />
        </div>
      </div>
    </div>
  );
};

export default PostList;
