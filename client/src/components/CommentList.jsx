import React, { useEffect } from 'react';
import Comment from '@components/PostList/Comment';
import { getComments } from '@modules/comments/comments';
import { useDispatch, useSelector } from 'react-redux';

const CommentList = ({ postId, userObjId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector(({ comments }) => comments);

  useEffect(() => {
    dispatch(getComments(postId));
  }, []);
  // useEffect(() => {
  //   dispatch(getComments(postId));
  // }, []);

  return (
    <>
      {comments?.map((comment, index) => (
        <Comment key={index} comment={comment} userObjId={userObjId} />
      ))}
    </>
  );
};

export default CommentList;
