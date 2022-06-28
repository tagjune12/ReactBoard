import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { writePost } from '@api/post';
import { useNavigate } from 'react-router';

const WritePost = () => {
  const editorInstance = useRef(null);
  const editorContainer = useRef(null);
  const content = useRef({
    category: 'post',
    title: 'title',
    content: null,
    author: 'ID1',
  });

  const navigation = useNavigate();

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
      // console.log(quillEditor.root.innerHTML);
      if (source === 'user') {
        content.current['content'] = quillEditor.root.innerHTML;
        // console.log(typeof content.current[content]);
      }
    });
  }, []);

  const onWriteBtnClick = (event) => {
    event.preventDefault();

    writePost(content.current).then((response) => {
      const postId = response.data._id;
      navigation(`/post/${postId}`);
    });
  };

  return (
    <div>
      <br />
      <br />
      <form>
        <input
          placeholder="제목"
          onChange={(event) => {
            content.current.title = event.target.value;
          }}
        />
        <div ref={editorContainer} />
        {/* <button onClick={onClick}>글 작성</button> */}
        <button onClick={onWriteBtnClick}>글 작성</button>
        <button>작성 취소</button>
      </form>
    </div>
  );
};

export default WritePost;
