import React, { useEffect } from 'react';
// import CommentEditor from '@components/CommentEditor';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Editor from '@components/common/Editor';
import EditorForm from '@components/common/EditorForm';
import Button from '@components/common/Button';
import {
  initialize,
  changeCommentField,
  writeNewComment,
  updateComment,
} from '@modules/comments/writeComment';

const CommentEditorContainer = ({ type }) => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();

  const { comment, content, error } = useSelector(
    ({ writeComment }) => writeComment,
  );

  const onChangeField = (key, value) => {
    console.log('onChangeField', { [key]: value });
    dispatch(changeCommentField(value));
  };

  const onWriteBtnClick = (event) => {
    event.preventDefault();
    dispatch(
      writeNewComment([
        postId,
        {
          content,
        },
      ]),
    );
  };

  const onModifyBtnClick = (event) => {
    event.preventDefault();
    const commentId = comment._id;
    dispatch(
      updateComment([
        commentId,
        {
          content,
        },
      ]),
    );
  };

  const onCancelBtnClick = (event) => {
    event.preventDefault();
    dispatch(changeCommentField(''));
  };

  useEffect(() => {
    if (comment) {
      // navigate(`/post/${post._id}`);
      // dispatch(changeCommentField(''));
    } else if (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  useEffect(() => {
    // console.log(postId);
    return () => {
      dispatch(initialize());
    };
  }, []);

  return (
    <EditorForm className="write-form">
      <Editor content={content} onChangeField={onChangeField} />
      <div className="editor-btn-wrapper">
        {type === 'modify' ? (
          <Button onClick={onModifyBtnClick}>수정 완료</Button>
        ) : (
          <Button onClick={onWriteBtnClick}>작성</Button>
        )}
        {type === 'modify' && (
          <Button className="cancel-btn" onClick={onCancelBtnClick}>
            취소
          </Button>
        )}
      </div>
    </EditorForm>
  );
};

export default CommentEditorContainer;
