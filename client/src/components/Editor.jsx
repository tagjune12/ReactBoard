import '@styles/editor.scss';

import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  updatePost,
  writeNewPost,
} from '@modules/posts/writepost';
import Button from './common/Button';
import { initialize } from '@modules/posts/writepost';
import clsx from 'clsx';

// 글 제목 작성
const EditorHead = ({ content: { title } }) => {
  const dispatch = useDispatch();
  const onChange = (event) => {
    dispatch(changeField('title', event.target.value));
  };

  return (
    <>
      {title ? (
        <input
          className="title-input"
          placeholder="제목"
          value={title}
          onChange={onChange}
        />
      ) : (
        <input className="title-input" placeholder="제목" onChange={onChange} />
      )}
    </>
  );
};

// 글 내용 작성
const EditorBody = ({ content, className }) => {
  const navigation = useNavigate();
  const editorInstance = useRef(null);
  const editorContainer = useRef(null);

  const dispatch = useDispatch();
  const params = useParams();
  const { loading, error, post } = useSelector(({ writePost }) => ({
    loading: writePost.loading,
    error: writePost.error,
    post: writePost.post,
  }));

  useEffect(() => {
    editorInstance.current = new Quill(editorContainer.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['image', 'link', 'video'],
        ],
      },
      placeholder: '내용을 입력하세요',
    });
    editorInstance.current.focus();
    const quillEditor = editorInstance.current;

    quillEditor.on('text-change', (delta, oldContent, source) => {
      if (source === 'user') {
        dispatch(changeField('content', quillEditor.root.innerHTML));
      }
    });
  }, []);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    editorInstance.current.root.innerHTML = content['content'];
  }, [content]);

  useEffect(() => {
    if (post) {
      navigation(`/post/${post._id}`);
    } else if (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  const onWriteBtnClick = (event) => {
    event.preventDefault();
    dispatch(writeNewPost(content));
  };

  const onModifyBtnClick = (event) => {
    event.preventDefault();
    dispatch(updatePost([params.id, content]));
  };

  return (
    <>
      <div ref={editorContainer} />
      <div className="editor-btn-wrapper">
        {className === 'modify' ? (
          <Button onClick={onModifyBtnClick}>수정 완료</Button>
        ) : (
          <Button onClick={onWriteBtnClick}>작성</Button>
        )}
        <Button
          className="cancel-btn"
          onClick={(event) => {
            event.preventDefault();
            navigation(-1);
          }}
        >
          취소
        </Button>
      </div>
    </>
  );
};

// 본 컴포넌트
const Editor = ({ className, content }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(initialize());

    return () => {
      console.log('초기화');
      dispatch(initialize());
    };
  }, []);

  return (
    <div className="write-form">
      {/* <br />
      <br /> */}
      <form>
        <EditorHead className={className} content={content} />
        <EditorBody className={className} content={content} />
      </form>
    </div>
  );
};

export default Editor;
