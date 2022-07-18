import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, unloadComments } from '@modules/comments/comments';

import CommentContainer from './CommentContainer';

const CommentListContainer = () => {
  const { id: postId } = useParams();
  const userObjId = useSelector(({ user }) => user.user?._id);
  const dispatch = useDispatch();
  const { comments } = useSelector(({ comments }) => comments);

  useEffect(() => {
    dispatch(getComments(postId));
    console.log('CommentListContainer');

    return () => {
      dispatch(unloadComments());
    };
    // }, [postId]);
  }, [postId]);

  return (
    <>
      {comments?.map((comment) => (
        <CommentContainer
          key={comment._id}
          comment={comment}
          userObjId={userObjId}
        />
      ))}
    </>
  );
};

export default CommentListContainer;
