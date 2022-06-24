import React from 'react';
import Post from '@components/PostList/Post';
import Comment from '@components/PostList/Comment';
import { useSelector } from 'react-redux/es/exports';

const PostView = () => {
  const curerntPost = useSelector((state) => state.post.currentPost);
  console.log('PostView: ', curerntPost);
  return (
    <div className="post-view">
      <Post post={curerntPost} />
      <Comment />
    </div>
  );
};

export default PostView;
