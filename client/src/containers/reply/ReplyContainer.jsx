import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { remove } from '@lib/api/reply';
import { initialize } from '@modules/replies/writeReply';
import { useDispatch } from 'react-redux';

import Reply from '@components/reply/Reply';
import ReplyEditorContainer from '@containers/reply/ReplyEditorContainer';
import { downReplyCount } from '@modules/comments/comments';

const ReplyContainer = ({ reply, loadReplies, commentId }) => {
  const [isMyReply, setIsMyReply] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => user);

  const onRemoveBtnClick = () => {
    const replyId = reply?._id;
    if (window.confirm('정말 댓글을 삭제하시겠습니까?')) {
      try {
        remove(replyId).then((response) => {
          dispatch(downReplyCount(commentId));
          loadReplies();
        });
      } catch (error) {
        alert('리플을 삭제하는데 오류가 발생했습니다.');
        throw error;
      }
    }
  };

  const onEditBtnClick = () => {
    const { content, _id: replyId } = reply;
    setIsModifying(true);
    dispatch(
      initialize({
        content,
        replyId,
      }),
    );
  };

  useEffect(() => {
    const { author } = reply;
    setIsMyReply(author?._id === user?._id);
  }, []);

  return (
    <>
      {isModifying ? (
        <ReplyEditorContainer // 리플 수정하는 리플에디터
          type="modify"
          setWriteReply={setIsModifying}
          loadReplies={loadReplies}
        />
      ) : (
        <Reply
          reply={reply}
          onRemoveBtnClick={onRemoveBtnClick}
          onEditBtnClick={onEditBtnClick}
          isMyReply={isMyReply}
        />
      )}
    </>
  );
};

export default ReplyContainer;
