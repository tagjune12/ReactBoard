import React from 'react';

const PostHeader = () => {
  return (
    <div className="header">
      <h3 className="title">타이틀</h3>
      <div className="post-info">
        <span className="author">Author</span>
        <span className="date">Date</span>
        <span className="comments">댓글 수 </span>
        <span className="likes">좋아요 수</span>
      </div>
    </div>
  );
};

const PostBody = () => {
  return (
    <div className="body">
      <p>내용</p>
      <p>내용</p>
      <p>내용</p>
      <p>내용</p>
      <p>내용</p>
      <p>내용</p>
      <p>내용</p>
    </div>
  );
};

const Post = () => {
  return (
    <div className="post">
      <PostHeader />
      <PostBody />
    </div>
  );
};

export default Post;
