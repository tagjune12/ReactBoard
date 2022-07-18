import React, { useState, useEffect } from 'react';
import { remove } from '@lib/api/comment';
// import * as writeCommentModule from '@modules/comments/writeComment';
import { initialize } from '@modules/comments/writeComment';

import CommentEditorContainer from 'src/containers/comment/CommentEditorContainer';
import Comment from '@components/comment/Comment';
// import { initialize } from '@modules/posts/writepost';
import { useDispatch } from 'react-redux';
import ReplyListContainer from '../reply/ReplyListContainer';
import ReplyEditorContainer from '../reply/ReplyEditorContainer';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const CommentContainer = ({ comment, userObjId }) => {
  const [isMyComment, setIsMyComment] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [writeReply, setWriteReply] = useState(false);
  const { _id: commentId } = comment;
  const dispatch = useDispatch();

  useEffect(() => {
    const { author } = comment;
    setIsMyComment(author._id === userObjId);
  }, []);
  // });

  const onDeleteBtnClick = () => {
    // 삭제 로직
    if (window.confirm('정말 삭제하시겠습니까?')) {
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
    // dispatch(writeCommentModule.initialize(content));
    dispatch(
      initialize({
        content,
        commentId,
      }),
    );
    // dispatch(initialize(comment));
    setIsModifying(true);
  };

  const onRepliesClick = () => {
    // 답글 보기
    setShowReplies((prev) => !prev);
    console.log('reply clicked', showReplies);
  };

  const onWriteReplyBtnClick = () => {
    console.log('onWriteReplyBtnClick');
    setWriteReply(true);
  };

  // const onWriteReplyCancelBtnClick = () => {
  //   setWriteReply(false);
  // };

  return (
    <>
      {isModifying ? (
        <CommentEditorContainer type="modify" setIsModifying={setIsModifying} />
      ) : (
        <>
          <Comment
            comment={comment}
            isMyComment={isMyComment}
            onDeleteBtnClick={onDeleteBtnClick}
            onEditBtnClick={onEditBtnClick}
            onRepliesClick={onRepliesClick}
            onWriteReplyBtnClick={onWriteReplyBtnClick}
          />
          {writeReply && (
            <ReplyEditorContainer
              commentId={commentId}
              setWriteReply={setWriteReply}
            />
          )}
          {showReplies && <ReplyListContainer commentId={commentId} />}
        </>
      )}
    </>
  );
};

export default CommentContainer;
