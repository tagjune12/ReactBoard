import React from 'react';
import { getMonthAndDate } from '@lib';

const ReplyHead = ({
  author: { nickname },
  date,
  onRemoveBtnClick,
  onEditBtnClick,
  isMyReply,
}) => {
  return (
    <div className="header">
      <span className="username">{nickname}</span>
      <div className="button-wrapper">
        {isMyReply && (
          <>
            <span className="edit-reply" onClick={onEditBtnClick}>
              수정
            </span>
            <span className="delete-reply" onClick={onRemoveBtnClick}>
              삭제
            </span>
          </>
        )}
      </div>
      <span className="date">{date}</span>
    </div>
  );
};

const ReplyBody = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
      className="body"
    />
  );
};

const Reply = ({
  reply: { author, content, publishedDate },
  onRemoveBtnClick,
  onEditBtnClick,
  isMyReply,
}) => {
  return (
    <div className="reply">
      <ReplyHead
        author={author}
        date={getMonthAndDate(publishedDate)}
        onRemoveBtnClick={onRemoveBtnClick}
        onEditBtnClick={onEditBtnClick}
        isMyReply={isMyReply}
      />
      <ReplyBody content={content} />
    </div>
  );
};

export default Reply;
