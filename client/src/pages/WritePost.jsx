import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const WritePost = () => {
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
  }, []);

  const onClick = (event) => {
    event.preventDefault();
    const delta = editorInstance.current.getContents();
    console.log(delta);
  };

  return (
    <div>
      <br />
      <br />
      <form>
        <input placeholder="제목" />
        <div ref={editorContainer} />
        <button onClick={onClick}>글 작성</button>
        <button>작성 취소</button>
      </form>
    </div>
  );
};

export default WritePost;
