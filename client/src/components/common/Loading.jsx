import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

const Loading = () => {
  return (
    <div className="loading-container">
      <AiOutlineLoading className="icon" />
      <span>불러오는 중입니다...</span>
    </div>
  );
};

export default Loading;
