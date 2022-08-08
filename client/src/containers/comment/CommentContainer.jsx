import React, { useState, useEffect } from 'react';
import { remove } from '@lib/api/comment';
import { likeComment } from '@modules/comments/comments';
import { initialize } from '@modules/comments/writeComment';

import CommentEditorContainer from '@containers/comment/CommentEditorContainer';
import Comment from '@components/comment/Comment';
import { useDispatch } from 'react-redux';
import ReplyListContainer from '@containers/reply/ReplyListContainer';
import ReplyEditorContainer from '@containers/reply/ReplyEditorContainer';
import { list } from '@lib/api/reply';
import { downCommentCount } from '@modules/posts/post';

const CommentContainer = ({ comment, user, loadComments }) => {
  const [isMyComment, setIsMyComment] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [writeReply, setWriteReply] = useState(false);
  const [isUserLikeThis, setIsUserLikeThis] = useState(false);
  const { _id: commentId } = comment;
  const dispatch = useDispatch();

  const [replies, setReplies] = useState([]);

  const loadReplies = async () => {
    await list(commentId).then((response) => {
      const data = response.data;
      setReplies(data);
    });
    console.log('load Replies');
  };

  useEffect(() => {
    const { author } = comment;
    setIsMyComment(author._id === user?._id);

    loadReplies();
  }, []);

  const onDeleteBtnClick = () => {
    // 삭제 로직
    if (window.confirm('정말 삭제하시겠습니까?')) {
      remove(commentId).then((response) => {
        if (response.status === 204) {
          loadComments();
          dispatch(downCommentCount());
        }
      });
    }
  };
  const onEditBtnClick = () => {
    // 수정 로직
    const { content } = comment;
    console.log('onEditBtnClick', content);
    dispatch(
      initialize({
        content,
        commentId,
      }),
    );
    setIsModifying(true);
  };

  const onRepliesClick = () => {
    // 답글 보기
    setShowReplies((prev) => !prev);
    console.log('reply clicked', showReplies);
  };

  const onWriteReplyBtnClick = () => {
    console.log('onWriteReplyBtnClick');
    setWriteReply((prev) => !prev);
  };

  const onLikeClick = () => {
    console.log('onLikeClick');
    setIsUserLikeThis((prev) => !prev);
    dispatch(likeComment(commentId, user?._id));
  };

  return (
    <>
      {isModifying ? (
        <CommentEditorContainer
          type="modify"
          setIsModifying={setIsModifying}
          loadComments={loadComments}
        />
      ) : (
        <>
          <Comment
            comment={comment}
            isMyComment={isMyComment}
            onDeleteBtnClick={onDeleteBtnClick}
            onEditBtnClick={onEditBtnClick}
            onRepliesClick={onRepliesClick}
            onWriteReplyBtnClick={onWriteReplyBtnClick}
            onLikeClick={onLikeClick}
            isUserLikeThis={isUserLikeThis}
            showReplies={showReplies && replies?.length}
            user={user}
          />
          {writeReply && (
            <ReplyEditorContainer // 댓글에 작성하는 리플 에디터
              commentId={commentId}
              setWriteReply={setWriteReply}
              loadReplies={loadReplies}
            />
          )}

          {replies?.length > 0 && showReplies && (
            <ReplyListContainer
              replies={replies}
              loadReplies={loadReplies}
              commentId={commentId}
            />
          )}
        </>
      )}
    </>
  );
};

export default CommentContainer;
