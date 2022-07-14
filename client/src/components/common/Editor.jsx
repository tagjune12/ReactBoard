import '@styles/editor.scss';

import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  changeField,
  updatePost,
  writeNewPost,
} from '@modules/posts/writepost';
import {
  writeNewComment,
  changeCommentField,
  updateComment,
} from '@modules/comments/writeComment';
import Button from './Button';
import { initialize } from '@modules/posts/writepost';
import { getComments } from '@modules/comments/comments';

// import clsx from 'clsx';

// 글 제목 작성
const EditorHead = ({ article: { title, category } }) => {
  const dispatch = useDispatch();
  const onChange = (event) => {
    dispatch(changeField('title', event.target.value));
  };

  return (
    <>
      <input
        className="category-input"
        placeholder="카테고리"
        value={'post'}
        // onChange={onChange}
      />
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
const EditorBody = ({
  article: { loading, error, content, post, comment, reply },
  className,
  onModifyBtnClick,
  onWriteBtnClick,
  type,
}) => {
  const navigation = useNavigate();
  const editorInstance = useRef(null);
  const editorContainer = useRef(null);
  const dispatch = useDispatch();

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
        if (type === 'post') {
          dispatch(changeField('content', quillEditor.root.innerHTML));
        } else if (type === 'comment') {
          dispatch(changeCommentField(quillEditor.root.innerHTML));
        }
      }
    });
  }, []);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    editorInstance.current.root.innerHTML = content;
  }, []);

  useEffect(() => {
    if (post) {
      navigation(`/post/${post._id}`);
    } else if (comment) {
      editorInstance.current.root.innerHTML = '';
      dispatch(getComments(comment.postId));
    } else if (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  return (
    <>
      <div ref={editorContainer} />
      <div className="editor-btn-wrapper">
        {className === 'modify' ? (
          <Button onClick={onModifyBtnClick}>수정 완료</Button>
        ) : (
          <Button onClick={onWriteBtnClick}>작성</Button>
        )}
        {(type === 'post' || className === 'modify') && (
          <Button
            className="cancel-btn"
            onClick={(event) => {
              event.preventDefault();
              navigation(-1);
            }}
          >
            취소
          </Button>
        )}
      </div>
    </>
  );
};

// 본 컴포넌트
const Editor = ({ className, article, type }) => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    return () => {
      // console.log('초기화');
      dispatch(initialize());
    };
  }, []);

  const onWriteBtnClick = (event) => {
    event.preventDefault();

    if (type === 'post') {
      dispatch(
        writeNewPost({
          title: article.title,
          category: article.category,
          content: article.content,
        }),
      );
    } else if (type === 'comment') {
      dispatch(
        writeNewComment([
          params.id,
          {
            content: article.content,
          },
        ]),
      );
    }
  };

  const onModifyBtnClick = (event) => {
    event.preventDefault();
    if (type === 'post') {
      dispatch(
        updatePost([
          params.id,
          {
            title: article.title,
            category: article.category,
            content: article.content,
          },
        ]),
      );
      return;
    }
    if (type === 'comment') {
      // 코멘트 모듈 디스패치
      console.log('log from comment update', article);
      // dispatch(updateComment(article._id));
    }
  };

  return (
    <div className="write-form">
      {/* {console.log(article)} */}
      <form>
        {type === 'post' && (
          <EditorHead className={className} article={article} />
        )}
        <EditorBody
          className={className}
          article={article}
          onWriteBtnClick={onWriteBtnClick}
          onModifyBtnClick={onModifyBtnClick}
          type={type}
        />
      </form>
    </div>
  );
};

export default Editor;
