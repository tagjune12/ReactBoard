import React, { useEffect } from 'react';
import {
  changeField,
  updatePost,
  writeNewPost,
  initialize,
} from '@modules/posts/writepost';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import Editor from '@components/common/Editor';
import EditorForm from '@components/common/EditorForm';
import Button from '@components/common/Button';
import TitleInput from '@components/post/TitleInput';

const PostEditorContainer = ({ type }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { post, category, title, content, error } = useSelector(
    ({ writePost }) => writePost,
  );

  const onChangeField = (key, value) => {
    dispatch(changeField(key, value));
  };

  const onWriteBtnClick = (event) => {
    event.preventDefault();
    dispatch(
      writeNewPost({
        title,
        category,
        content,
      }),
    );
  };

  const onModifyBtnClick = (event) => {
    event.preventDefault();
    dispatch(
      updatePost([
        params.id,
        {
          title,
          category,
          content,
        },
      ]),
    );
  };

  const onCancelBtnClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    if (post) {
      navigate(`/post/${post._id}`);
    } else if (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, []);

  return (
    <EditorForm className="write-form">
      <TitleInput
        title={title}
        category={category}
        onChangeField={onChangeField}
      />
      <Editor content={content} onChangeField={onChangeField} />
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
  );
};

export default PostEditorContainer;
