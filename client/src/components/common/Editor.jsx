import '@styles/editor.scss';

import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// 본 컴포넌트
const Editor = ({ content, onChangeField, result, type }) => {
  const editorInstance = useRef(null);
  const editorContainer = useRef(null);

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
        onChangeField('content', quillEditor.root.innerHTML);
      }
    });
  }, []);

  // 처음 로드 됐을때 내용 초기화
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    editorInstance.current.root.innerHTML = content;
    console.log('content', content, editorInstance.current.root.innerHTML);
  }, []);

  // useEffect(() => {
  //   console.log('Editor Updated');
  // }, [content]);

  useEffect(() => {
    console.log('Editor Load');
    console.log('result is ', result);
    return () => {
      console.log('Editor Unload');
    };
  }, []);

  useEffect(() => {
    console.log('result is change', result);
    if (type !== 'modify') {
      editorInstance.current.root.innerHTML = '';
    }
  }, [result]);

  return <div ref={editorContainer} />;
};

Editor.defaultProps = {
  type: 'write',
};

export default Editor;
