import Button from '@components/common/Button';
import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { getMonthAndDate } from '@lib/getDate';

const PostHeader = ({
  postInfo: { title, nickname, publishedDate, comments, like },
}) => {
  return (
    <div className="header">
      <h3 className="title">{title}</h3>
      <div className="post-info">
        <span className="author">{nickname}</span>
        <span className="date">{getMonthAndDate(publishedDate)}</span>

        <span className="comments">
          <BiMessageDetail />
          {comments}
        </span>
        <span className="likes">
          <AiOutlineLike />
          {like}
        </span>
      </div>
    </div>
  );
};

const PostBody = ({ content, isMyPost, onDeleteClick, onEditClick }) => {
  return (
    <>
      <div
        className="body"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />

      <div className="button-wrapper">
        <AiOutlineLike className="like-btn" />
        {isMyPost && (
          <div className="isMyPost">
            <Button onClick={onEditClick}>수정</Button>
            <Button onClick={onDeleteClick}>삭제</Button>
          </div>
        )}
      </div>
    </>
  );
};

const Post = ({ post, isMyPost, onDeleteClick, onEditClick }) => {
  const postHeader = {
    title: post?.title,
    nickname: post?.author.nickname,
    publishedDate: post?.publishedDate,
    comments: post?.comments,
    like: post?.like.length,
  };
  const postBody = post?.content;

  return (
    <div className="post">
      <PostHeader postInfo={postHeader} />
      <PostBody
        content={postBody}
        isMyPost={isMyPost}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
    </div>
  );
};

export default Post;
