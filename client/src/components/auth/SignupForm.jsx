import React from 'react';
import Button from '@components/common/Button';

const SignupForm = ({ onSubmit, onChange, passwordCheck }) => {
  return (
    <div className="signup">
      <div className="signup-form-container">
        <h1 className="title">SIGN UP</h1>
        <form className="signup-form" onSubmit={onSubmit}>
          <input
            id="userId"
            placeholder="아이디"
            onChange={onChange}
            required
          />
          <input id="nickname" placeholder="닉네임" onChange={onChange} />
          <input
            id="password"
            placeholder="비밀번호"
            onChange={onChange}
            type="password"
            required
          />
          <input
            id="password-check"
            placeholder="비밀번호 확인"
            type="password"
            ref={passwordCheck}
            required
          />
          <Button className="signup-btn">회원가입</Button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
