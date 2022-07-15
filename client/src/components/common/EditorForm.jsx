import React from 'react';

const EditorForm = ({ className, children }) => {
  return (
    <div className={className}>
      <form>{children}</form>
    </div>
  );
};

export default EditorForm;
