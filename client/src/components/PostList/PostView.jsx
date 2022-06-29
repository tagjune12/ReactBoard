import React, { useState, useEffect } from 'react';
import Post from '@components/PostList/Post';
import Comment from '@components/PostList/Comment';
import { useParams, useNavigate } from 'react-router';
import { getPostById, deletePost } from '@api/post';
import { check } from '@api/auth';

const PostView = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState();
  const [isMyPost, setIsMyPost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((response) => {
      setPost({ ...response });
    });
  }, [postId]);

  useEffect(() => {
    check().then((response) => {
      setIsMyPost(post?.author === response?.data._id);
    });
  }, [post]);

  const onDeletePostClick = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // console.log(postId);
      deletePost(postId).then((response) => {
        if (response === 204) {
          navigate('/');
        }
      });
    }
  };

  return (
    <div className="post-view">
      <Post post={post} isMyPost={isMyPost} onDeleteClick={onDeletePostClick} />
      <Comment />
    </div>
  );
};

export default PostView;
