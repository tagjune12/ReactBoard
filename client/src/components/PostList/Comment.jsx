import React from 'react';

const CommentHeader = () => {
  return (
    <div className="header">
      <span className="username">닉네임</span>
      <span className="edit">수정</span>
      <span className="delete">삭제</span>
      <span className="likes">좋아요</span>
      <span className="sub-comment">대댓글</span>
      <span className="date">작성시간</span>
    </div>
  );
};

const CommentBody = () => {
  return <div className="body">내용</div>;
};

const Comment = () => {
  return (
    <div className="comment">
      <CommentHeader />
      <CommentBody />
    </div>
  );
};

export default Comment;
