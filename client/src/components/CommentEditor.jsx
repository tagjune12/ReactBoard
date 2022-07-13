import React from 'react';
import Editor from './Editor';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const CommentEditor = () => {
  const comment = useSelector(({ writeComment }) => writeComment);

  return (
    <Editor className={'comment-editor'} article={comment} type="comment" />
  );
};

export default CommentEditor;
