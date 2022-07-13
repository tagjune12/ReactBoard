import React from 'react';
import { getMonthAndDate } from '@lib/getDate';
import Button from '@components/common/Button';

const CommentHeader = ({ nickname, date }) => {
  return (
    <div className="header">
      <span className="username">{nickname}</span>
      {/* <span className="edit">수정</span>
      <span className="delete">삭제</span> */}
      <span className="date">{date}</span>
      <Button className={'edit-comment'}>수정</Button>
      <Button className={'delete-comment'}>삭제</Button>
    </div>
  );
};

const CommentBody = ({ content }) => {
  return (
    <div
      className="body"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

const CommentFooter = ({ reply, like }) => {
  return (
    <div>
      <span className="reply">{reply}</span>
      <span className="likes">{like.length}</span>
    </div>
  );
};

const Comment = ({
  comment: { author, content, like, postId, publishedDate, reply, _id },
}) => {
  return (
    <div className="comment">
      {/* <div className="image-area">이미지</div> */}
      <div className="content-area">
        <CommentHeader
          nickname={author.nickname}
          date={getMonthAndDate(publishedDate)}
        />
        <CommentBody content={content} />
        <CommentFooter reply={reply} like={like} />
      </div>
    </div>
  );
};

export default Comment;
