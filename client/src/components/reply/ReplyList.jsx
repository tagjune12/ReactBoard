import React from 'react';
import ReplyContainer from 'src/containers/reply/ReplyContainer';

const ReplyList = ({ replies, loadReplies, commentId }) => {
  return replies?.map((reply) => (
    <ReplyContainer
      key={reply?._id}
      reply={reply}
      loadReplies={loadReplies}
      commentId={commentId}
    />
  ));
};

export default ReplyList;
