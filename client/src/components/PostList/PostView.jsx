import React, { useState, useEffect } from 'react';
import Post from '@components/PostList/Post';
import Comment from '@components/PostList/Comment';
import { useParams } from 'react-router';
import { getPostById } from '@api/post';

const PostView = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    getPostById(postId).then((response) => {
      setPost(response);
    });
  }, []);

  return (
    <div className="post-view">
      <Post post={post} />
      <Comment />
    </div>
  );
};

export default PostView;
