import React, { useEffect } from 'react';
import ReplyList from '@components/reply/ReplyList';

const ReplyListContainer = ({ commentId, replies, loadReplies }) => {
  // Reply 가져오는 로직

  return (
    <ReplyList
      replies={replies}
      loadReplies={loadReplies}
      commentId={commentId}
    />
  );
};

export default ReplyListContainer;
