import React, { useState, useEffect } from 'react';
import { remove } from '@lib/api/comment';
import { getComments } from '@modules/comments/comments';
import { initialize } from '@modules/comments/writeComment';

import CommentEditorContainer from 'src/containers/comment/CommentEditorContainer';
import Comment from '@components/comment/Comment';
import { useDispatch } from 'react-redux';
import ReplyListContainer from '../reply/ReplyListContainer';
import ReplyEditorContainer from '../reply/ReplyEditorContainer';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { list } from '@lib/api/reply';
import { downCommentCount } from '@modules/posts/post';

const CommentContainer = ({ comment, userObjId, loadComments }) => {
  const [isMyComment, setIsMyComment] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [writeReply, setWriteReply] = useState(false);
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
    setIsMyComment(author._id === userObjId);
    loadReplies();
  }, []);
  // });

  const onDeleteBtnClick = () => {
    // 삭제 로직
    if (window.confirm('정말 삭제하시겠습니까?')) {
      remove(commentId).then((response) => {
        if (response.status === 204) {
          // navigate('/');
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
          />
          {writeReply && (
            <ReplyEditorContainer // 댓글에 작성하는 리플 에디터
              commentId={commentId}
              setWriteReply={setWriteReply}
              loadReplies={loadReplies}
            />
          )}
          {/* {Boolean(comment.reply) && showReplies && (
            <ReplyListContainer replies={replies} loadReplies={loadReplies} />
            // <ReplyListContainer commentId={commentId} />
          )} */}
          {replies.length > 0 && showReplies && (
            <ReplyListContainer
              replies={replies}
              loadReplies={loadReplies}
              commentId={commentId}
            />
            // <ReplyListContainer commentId={commentId} />
          )}
        </>
      )}
    </>
  );
};

export default CommentContainer;
