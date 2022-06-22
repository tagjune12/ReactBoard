import React from 'react';
import Post from './Post';
import Comment from './Comment';

const PostView = () => {
  return (
    <div className="post-view">
      <Post />
      <Comment />
    </div>
  );
};

export default PostView;
