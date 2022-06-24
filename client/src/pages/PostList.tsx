import '@styles/post/postlist.scss';
import { Routes, Route } from 'react-router';
import PostItem from '@components/PostList/PostItem';
import PostView from '@components/PostList/PostView';
import * as postAPI from '@api/post';
import { useEffect, useState } from 'react';
import { Post } from '@components/PostList/types';

const PostList = () => {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    postAPI.getPostList('1').then((response) => {
      setPostList(response);
    });
  }, []);
  return (
    <div className="post-wrapper">
      <div>
        <div>
          <Routes>
            <Route path="/post/:id" element={<PostView />} />
          </Routes>
        </div>
        <div className="post-item-wrapper">
          {postList?.map((post, index) => (
            <PostItem key={post._id} postNumber={index + 1} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
