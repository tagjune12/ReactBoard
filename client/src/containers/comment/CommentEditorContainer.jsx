import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  initialize,
  changeCommentField,
  writeNewComment,
  updateComment,
} from '@modules/comments/writeComment';

import Editor from '@components/common/Editor';
import EditorForm from '@components/common/EditorForm';
import Button from '@components/common/Button';

const CommentEditorContainer = ({ type, setIsModifying, loadComments }) => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();

  const { comment, commentId, content, error } = useSelector(
    ({ writeComment }) => writeComment,
  );

  const onChangeField = (key, value) => {
    dispatch(changeCommentField(value));
  };

  const onWriteBtnClick = (event) => {
    event.preventDefault();
    console.log(content);
    if (content === '<p><br></p>' || content === '') {
      alert('내용을 입력해 주세요');
      return;
    }
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
    setIsModifying(false);
    console.log('Do setIsModifying');
  };

  useEffect(() => {
    console.log('CommentEdidtorContainer updated');
    if (comment) {
      if (setIsModifying) {
        setIsModifying(false);
      }
      dispatch(changeCommentField(''));
      dispatch(initialize());
      loadComments();
    } else if (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [comment]);

  useEffect(() => {
    console.log('CommetEditor Load');
    return () => {
      dispatch(initialize());
      console.log('CommetEditor Unload');
    };
  }, []);

  return (
    <EditorForm className="write-form">
      <Editor
        content={content}
        onChangeField={onChangeField}
        result={comment}
        type={type}
      />
      <div className="editor-btn-wrapper">
        {type === 'modify' ? (
          <>
            <Button onClick={onModifyBtnClick}>수정 완료</Button>
            <Button className="cancel-btn" onClick={onCancelBtnClick}>
              취소
            </Button>
          </>
        ) : (
          <Button onClick={onWriteBtnClick}>작성</Button>
        )}
      </div>
    </EditorForm>
  );
};

export default CommentEditorContainer;
