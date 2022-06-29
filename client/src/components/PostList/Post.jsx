import React from 'react';

const PostHeader = ({ postInfo }) => {
  return (
    <div className="header">
      <h3 className="title">{postInfo.title}</h3>
      <div className="post-info">
        <span className="author">{postInfo.author}</span>
        <span className="date">{postInfo.date}</span>
        <span className="comments">{postInfo.numOfComments} </span>
        <span className="likes">{postInfo.like} </span>
      </div>
    </div>
  );
};

const PostBody = ({ content, isMyPost, onDeleteClick }) => {
  return (
    <>
      <div
        className="body"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      {isMyPost && (
        <div>
          <button>수정</button>
          <button onClick={onDeleteClick}>삭제</button>
        </div>
      )}
    </>
  );
};

const Post = ({ post, isMyPost, onDeleteClick }) => {
  const postHeader = {
    title: post?.title,
    author: post?.author,
    date: post?.publishedDate,
    numOfComments: post?.comments.length,
    like: post?.like,
  };
  const postBody = post?.content;

  return (
    <div className="post">
      <PostHeader postInfo={postHeader} />
      <PostBody
        content={postBody}
        isMyPost={isMyPost}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );
};

export default Post;
