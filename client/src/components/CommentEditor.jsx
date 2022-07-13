import React from 'react';
import Editor from './Editor';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const CommentEditor = ({ className }) => {
  const comment = useSelector(({ writeComment }) => writeComment);

  return <Editor className={className} article={comment} type="comment" />;
};

export default CommentEditor;
