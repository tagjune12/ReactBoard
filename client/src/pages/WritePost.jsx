import React, { useRef } from 'react';
import Editor from '@components/Editor';

const WritePost = () => {
  const content = useRef({
    category: 'post',
    title: null,
    content: null,
  });
  return <Editor className="write" content={content} />;
};

export default WritePost;
