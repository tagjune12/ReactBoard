import { getMonthAndDate } from '@lib';
import Button from '@components/common/Button';
import { BiMessageDetail } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';

const CommentHeader = ({
  author,
  date,
  isMyComment,
  onDeleteBtnClick,
  onEditBtnClick,
  onWriteReplyBtnClick,
}) => {
  return (
    <div className="header">
      <span className="username">{author.nickname}</span>
      <span className="date">{date}</span>
      <Button onClick={onWriteReplyBtnClick}>답글 작성</Button>
      {isMyComment && (
        <>
          <Button className="edit-comment" onClick={onEditBtnClick}>
            수정
          </Button>
          <Button className="delete-comment" onClick={onDeleteBtnClick}>
            삭제
          </Button>
        </>
      )}
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

const CommentFooter = ({ reply, like, onRepliesClick }) => {
  return (
    <div>
      <span className="reply" onClick={onRepliesClick}>
        <BiMessageDetail />
        {reply}
      </span>
      <span
        className="likes"
        onClick={() => {
          console.log('reply clicked2');
        }}
      >
        <AiOutlineLike />
        {like.length}
      </span>
    </div>
  );
};

const Comment = ({
  comment: { author, content, like, publishedDate, reply },
  isMyComment,
  onDeleteBtnClick,
  onEditBtnClick,
  onRepliesClick,
  onWriteReplyBtnClick,
}) => {
  // 코멘트 모듈에 postId 들어가게 해야함
  return (
    <div className="comment">
      <div className="content-area">
        <CommentHeader
          author={author}
          date={getMonthAndDate(publishedDate)}
          isMyComment={isMyComment}
          onDeleteBtnClick={onDeleteBtnClick}
          onEditBtnClick={onEditBtnClick}
          onWriteReplyBtnClick={onWriteReplyBtnClick}
        />
        <CommentBody content={content} />
        <CommentFooter
          reply={reply}
          like={like}
          onRepliesClick={onRepliesClick}
        />
      </div>
    </div>
  );
};

export default Comment;
