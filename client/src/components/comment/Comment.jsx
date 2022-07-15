import { getMonthAndDate } from '@lib/getDate';
import Button from '@components/common/Button';

const CommentHeader = ({
  author,
  date,
  isMyComment,
  onDeleteBtnClick,
  onEditBtnClick,
}) => {
  return (
    <div className="header">
      <span className="username">{author.nickname}</span>
      <span className="date">{date}</span>
      {isMyComment && (
        <>
          <Button className={'edit-comment'} onClick={onEditBtnClick}>
            수정
          </Button>
          <Button className={'delete-comment'} onClick={onDeleteBtnClick}>
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

const CommentFooter = ({ reply, like }) => {
  return (
    <div>
      <span className="reply">{reply}</span>
      <span className="likes">{like.length}</span>
    </div>
  );
};

const Comment = ({
  comment: { author, content, like, publishedDate, reply },
  isMyComment,
  onDeleteBtnClick,
  onEditBtnClick,
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
        />
        <CommentBody content={content} />
        <CommentFooter reply={reply} like={like} />
      </div>
    </div>
  );
};

export default Comment;
