import React from 'react';
import { BsPersonCircle, BsPersonFill, BsLockFill } from 'react-icons/bs';

const LoginForm = ({ onSubmit, onChange }) => {
  return (
    <div className="login">
      <div className="login-form-wrapper">
        <BsPersonCircle className="login-icon" />
        <h1>로그인</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <div className="id">
            <BsPersonFill />
            <input
              id="userId"
              placeholder="아이디"
              onChange={onChange}
              required
            />
          </div>
          <div className="password">
            <BsLockFill />
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              onChange={onChange}
              required
            />
          </div>
          <button className="login-btn">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
