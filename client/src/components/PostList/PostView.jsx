import React, { useState, useEffect } from 'react';
import Post from '@components/PostList/Post';
import Comment from '@components/PostList/Comment';
import { useParams, useNavigate } from 'react-router';
import { deletePost } from '@lib/api/post';
import { check } from '@lib/api/auth';
import { getPost } from '@modules/post';
import { useDispatch, useSelector } from 'react-redux';

const PostView = () => {
  const { id: postId } = useParams();
  const [isMyPost, setIsMyPost] = useState(false);
  const navigate = useNavigate();
  const { loading, post } = useSelector(({ post }) => post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId]);

  useEffect(() => {
    check().then((response) => {
      setIsMyPost(post?.author._id === response?.data._id);
    });
  }, [post]);

  const onDeletePostClick = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePost(postId).then((response) => {
        if (response === 204) {
          navigate('/');
        }
      });
    }
  };

  const onEditPostClick = () => {
    navigate(`/modify/${postId}`);
  };

  return (
    <>
      {loading && '불러오는 중...'}
      {!loading && (
        <div className="post-view">
          <Post
            post={post}
            isMyPost={isMyPost}
            onDeleteClick={onDeletePostClick}
            onEditClick={onEditPostClick}
          />
          <Comment />
        </div>
      )}
    </>
  );
};

export default PostView;
