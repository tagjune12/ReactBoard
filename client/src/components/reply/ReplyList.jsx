import React from 'react';
import ReplyContainer from 'src/containers/reply/ReplyContainer';

const ReplyList = ({ replies, loadReplies }) => {
  return replies?.map((reply, index) => (
    <ReplyContainer key={reply?._id} reply={reply} loadReplies={loadReplies} />
  ));
};

export default ReplyList;
