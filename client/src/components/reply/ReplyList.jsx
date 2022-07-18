import React from 'react';
import ReplyContainer from 'src/containers/reply/ReplyContainer';

const ReplyList = ({ replies }) => {
  return replies?.map((reply, index) => (
    <ReplyContainer key={index} reply={reply} />
  ));
};

export default ReplyList;
