import React, { useEffect } from 'react';
import {
  initialize,
  changeReplyField,
  writeNewReply,
  updateReply,
} from '@modules/replies/writeReply';
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router';

import Editor from '@components/common/Editor';
import EditorForm from '@components/common/EditorForm';
import Button from '@components/common/Button';

const ReplyEditorContainer = ({
  type,
  commentId,
  setWriteReply,
  loadReplies,
}) => {
  const dispatch = useDispatch();

  const { reply, replyId, content, error } = useSelector(
    ({ writeReply }) => writeReply,
  );

  const onChangeField = (key, value) => {
    dispatch(changeReplyField(value));
  };

  const onWriteBtnClick = (event) => {
    event.preventDefault();
    if (commentId) {
      dispatch(
        writeNewReply([
          commentId,
          {
            content,
          },
        ]),
      );
    } else {
      console.log('commentId 가 없습니다.');
    }
  };

  const onModifyBtnClick = (event) => {
    event.preventDefault();
    dispatch(
      updateReply([
        replyId,
        {
          content,
        },
      ]),
    );
  };

  const onCancelBtnClick = (event) => {
    event.preventDefault();
    dispatch(changeReplyField(''));
    console.log('onCancelBtnClick in ReplyEditor');
    setWriteReply(false);
  };

  useEffect(() => {
    if (reply) {
      setWriteReply(false);
    } else if (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  useEffect(() => {
    console.log('Load ReplyEditor', content);
    // onChangeField(content);
    return () => {
      console.log('Unload ReplyEditor', content);
      dispatch(initialize());
      loadReplies();
      // dispatch(getComments(postId));
    };
  }, []);

  return (
    <>
      <h3>리플 에디터</h3>
      <EditorForm className="write-form">
        <Editor
          content={content}
          onChangeField={onChangeField}
          result={reply}
          type="modify"
        />
        <div className="editor-btn-wrapper">
          {type === 'modify' ? (
            <Button onClick={onModifyBtnClick}>수정 완료</Button>
          ) : (
            <Button onClick={onWriteBtnClick}>작성</Button>
          )}
          <Button className="cancel-btn" onClick={onCancelBtnClick}>
            취소
          </Button>
        </div>
      </EditorForm>
    </>
  );
};

export default ReplyEditorContainer;
