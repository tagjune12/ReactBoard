import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, unloadComments } from '@modules/comments/comments';

import CommentContainer from './CommentContainer';
import CommentEditorContainer from 'src/containers/comment/CommentEditorContainer';

const CommentListContainer = () => {
  const { id: postId } = useParams();
  const userObjId = useSelector(({ user }) => user.user?._id);
  const dispatch = useDispatch();
  const { comments } = useSelector(({ comments }) => comments);

  const loadComments = () => {
    dispatch(getComments(postId));
  };

  useEffect(() => {
    // dispatch(getComments(postId));
    loadComments();
    console.log('CommentListContainer');

    return () => {
      dispatch(unloadComments());
    };
  }, [postId]);

  return (
    <div className="comments-and-replies">
      {comments?.map((comment) => (
        <CommentContainer
          key={comment._id}
          comment={comment}
          userObjId={userObjId}
          loadComments={loadComments}
        />
      ))}
      <CommentEditorContainer loadComments={loadComments} />
    </div>
  );
};

export default CommentListContainer;
