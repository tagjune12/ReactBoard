import React, { useState, useEffect } from 'react';
import { getMonthAndDate } from '@lib/getDate';
import Button from '@components/common/Button';
import { remove } from '@lib/api/comment';
import { useNavigate } from 'react-router';
import { getComments } from '@modules/comments/comments';
import { useDispatch } from 'react-redux';
// import Editor from '@components/Editor';
import CommentEditor from '@components/CommentEditor';
import { initialize } from '@modules/comments/writeComment';

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
  comment: { author, content, like, postId, publishedDate, reply, _id },
  userObjId,
}) => {
  const [isMyComment, setIsMyComment] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMyComment(author._id === userObjId);
  }, []);

  const onDeleteBtnClick = () => {
    // 삭제 로직
    if (window.confirm('정말 삭제하시겠습니까?')) {
      remove(_id).then((response) => {
        if (response === 204) {
          // navigate('/');
          // dispatch(getComments(postId));
        }
      });
    }
  };
  const onEditBtnClick = () => {
    // 수정 로직
    setIsModifying(true);
    dispatch(
      initialize({
        content,
      }),
    );
  };
  // 코멘트 모듈에 postId 들어가게 해야함
  return (
    <>
      {!isModifying && (
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
      )}
      {isModifying && (
        <div className="comment-edit-area">
          코멘트 수정
          <CommentEditor className="modify"></CommentEditor>
        </div>
      )}
    </>
  );
};

export default Comment;
