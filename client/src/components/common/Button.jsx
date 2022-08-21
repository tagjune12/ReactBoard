import React from 'react';
import clsx from 'clsx';

const Button = ({ className, onClick, children }) => {
  return (
    <button className={clsx(className, 'btn')} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
