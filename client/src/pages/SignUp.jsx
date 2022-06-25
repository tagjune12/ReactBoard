import '@styles/signup.scss';
import React, { useState } from 'react';

// user 스키마 바꿀것

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    userId: '',
    nickname: '',
    password: '',
  });

  const onChange = (event) => {
    const { value, id } = event.target;
    setSignUpInfo({
      ...signUpInfo,
      [id]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signup">
      <h1>회원가입</h1>
      <form className="signup-form">
        <label htmlFor="userId">ID</label>
        <input id="userId" onChange={onChange} required></input>
        <label htmlFor="nickname">Nickname</label>
        <input id="nickname" onChange={onChange} required></input>
        <label htmlFor="password">PW</label>
        <input
          id="password"
          onChange={onChange}
          type="password"
          required
        ></input>
        <label htmlFor="password-check">PW Check</label>
        <input id="password-check" type="password" required></input>
        <button className="signup-btn" onSubmit={onSubmit}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
