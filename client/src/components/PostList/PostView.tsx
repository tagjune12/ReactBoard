import React from 'react';
import Post from '@components/PostList/Post';
import Comment from '@components/PostList/Comment';

const PostView = () => {
  return (
    <div className="post-view">
      <Post />
      <Comment />
    </div>
  );
};

export default PostView;
