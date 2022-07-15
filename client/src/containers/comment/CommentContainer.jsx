import React, { useState, useEffect } from 'react';
import Comment from '@components/comment/Comment';
import { useDispatch } from 'react-redux';
import { remove } from '@lib/api/comment';
import { initialize } from '@modules/comments/writeComment';

const CommentContainer = ({ comment, userObjId }) => {
  const [isMyComment, setIsMyComment] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  // const
  const dispatch = useDispatch();

  useEffect(() => {
    const { author } = comment;
    setIsMyComment(author._id === userObjId);
  }, []);

  const onDeleteBtnClick = () => {
    // 삭제 로직
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const { _id: commentId } = comment;
      remove(commentId).then((response) => {
        if (response === 204) {
          // navigate('/');
          // dispatch(getComments(postId));
        }
      });
    }
  };
  const onEditBtnClick = () => {
    // 수정 로직
    const { content } = comment;
    setIsModifying(true);
    dispatch(
      initialize({
        content,
      }),
    );
  };

  return (
    <Comment
      comment={comment}
      isMyComment={isMyComment}
      isModifying={isModifying}
      onDeleteBtnClick={onDeleteBtnClick}
      onEditBtnClick={onEditBtnClick}
    />
  );
};

export default CommentContainer;
