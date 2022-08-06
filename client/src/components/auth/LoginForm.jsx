import React from 'react';
import Button from '@components/common/Button';

const LoginForm = ({ onSubmit, onChange }) => {
  return (
    <div className="login">
      <div className="login-form-wrapper">
        <h1 className="title">LOGIN</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <input
            id="userId"
            placeholder="아이디"
            onChange={onChange}
            required
          />
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            onChange={onChange}
            required
          />
          <Button className="login-btn">로그인</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
