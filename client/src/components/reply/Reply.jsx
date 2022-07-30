import React from 'react';
import { getMonthAndDate } from '@lib';
import Button from '@components/common/Button';

const ReplyHead = ({
  author: { nickname },
  date,
  onRemoveBtnClick,
  onEditBtnClick,
  isMyReply,
}) => {
  return (
    <div>
      <span>{nickname}</span>
      <span>{date}</span>
      {isMyReply && (
        <>
          <Button onClick={onEditBtnClick}>수정</Button>
          <Button onClick={onRemoveBtnClick}>삭제</Button>
        </>
      )}
    </div>
  );
};

const ReplyBody = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
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
    <div>
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
