import React from 'react';
import { BiUpArrowAlt } from 'react-icons/bi';

const MoveToTopButton = () => {
  return (
    <div
      className="move-to-top"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <BiUpArrowAlt className="icon" />
    </div>
  );
};

export default MoveToTopButton;
