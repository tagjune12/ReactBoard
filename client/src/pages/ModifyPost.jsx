import React, { useRef } from 'react';
import Editor from '@components/Editor';
import { useSelector } from 'react-redux';

const ModifyPost = () => {
  const { loading, post } = useSelector(({ post }) => post);
  const content = useRef({
    category: post.category,
    title: post.title,
    content: post.content,
  });
  return (
    <>
      {loading && '로딩중'}
      {!loading && <Editor className="modify" content={content} />}
    </>
  );
};

export default ModifyPost;
