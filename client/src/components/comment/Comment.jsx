import { getMonthAndDate } from '@lib';
import Button from '@components/common/Button';
import { RiMessage2Line, RiMessage2Fill } from 'react-icons/ri';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

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
      <div className="button-wrapper">
        <span className="write-comment" onClick={onWriteReplyBtnClick}>
          답글 작성
        </span>
        {isMyComment && (
          <>
            <span className="edit-comment" onClick={onEditBtnClick}>
              수정
            </span>
            <span className="delete-comment" onClick={onDeleteBtnClick}>
              삭제
            </span>
          </>
        )}
      </div>
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

const CommentFooter = ({
  reply,
  like,
  onRepliesClick,
  onLikeClick,
  isUserLikeThis,
  showReplies,
}) => {
  return (
    <div className="footer">
      <div className="reply-btn" onClick={onRepliesClick}>
        {showReplies ? <RiMessage2Fill /> : <RiMessage2Line />}
        <span>{reply}</span>
      </div>
      <div className="like-btn" onClick={onLikeClick}>
        {isUserLikeThis ? <AiFillLike /> : <AiOutlineLike />}
        <span>{like.length}</span>
      </div>
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
  onLikeClick,
  isUserLikeThis,
  showReplies,
}) => {
  // 코멘트 모듈에 postId 들어가게 해야함
  return (
    <div className="comment">
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
        onLikeClick={onLikeClick}
        isUserLikeThis={isUserLikeThis}
        showReplies={showReplies}
      />
    </div>
  );
};

export default Comment;
