import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { writePost } from '@api/post';
import { useNavigate, useParams } from 'react-router';
import { editPost, getPostById } from '@api/post';

// 글 제목 작성
const EditorHeader = ({ content }) => {
  const onChange = (event) => {
    content.current.title = event.target.value;
  };

  //
  useEffect(() => {
    console.log('헤더 렌더');
  }, [content.current]);
  //

  return (
    <>
      {content.current.title ? (
        <input
          placeholder="제목"
          value={content.current.title}
          onChange={onChange}
        />
      ) : (
        <input placeholder="제목" onChange={onChange} />
      )}
    </>
  );
};

// 글 내용 작성
const EditorBody = ({ content, className }) => {
  const navigation = useNavigate();
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
    console.log('content확인', content.current);
    if (content.current['content']) {
      console.log(content.current);
      quillEditor.root.innerHTML = content.current['content'];
    }

    quillEditor.on('text-change', (delta, oldContent, source) => {
      if (source === 'user') {
        content.current['content'] = quillEditor.root.innerHTML;
      }
    });

    console.log('바디 렌더');
  }, [content.current]);

  const onWriteBtnClick = (event) => {
    event.preventDefault();
    writePost(content.current).then((response) => {
      const postId = response.data._id;
      navigation(`/post/${postId}`);
    });
  };

  return (
    <>
      <div ref={editorContainer} />
      {className === 'modify' ? (
        <button>수정 완료</button>
      ) : (
        <button onClick={onWriteBtnClick}>글 작성</button>
      )}

      <button
        onClick={(event) => {
          event.preventDefault();
          navigation(-1);
        }}
      >
        작성 취소
      </button>
    </>
  );
};

// 본 컴포넌트
const Editor = ({ className }) => {
  const content = useRef({
    category: 'post',
    title: null,
    content: null,
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      if (className === 'modify') {
        console.log('useEffect and modify');
        await getPostById(id).then((post) => {
          content.current = { ...post };
          console.log(content.current);
        });
      }
    };
    fetchPost();
  }, []);

  return (
    <div>
      <br />
      <br />
      <form>
        <EditorHeader className={className} content={content} />
        <EditorBody className={className} content={content} />
      </form>
    </div>
  );
};

export default Editor;
