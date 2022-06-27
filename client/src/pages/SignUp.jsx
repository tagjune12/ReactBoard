import '@styles/signup.scss';
import React, { useState, useRef } from 'react';
import { register } from '@api/auth';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    userId: '',
    nickname: '',
    password: '',
  });

  const naviage = useNavigate();
  const passwordCheck = useRef();

  const onChange = (event) => {
    const { value, id } = event.target;

    setSignUpInfo({
      ...signUpInfo,
      [id]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const checkValue = passwordCheck.current.value;

    if (checkValue !== signUpInfo.password) {
      alert('입력하신 비밀번호와 비밀번호 확인이 다릅니다.');
      return;
    } else {
      if (!signUpInfo.nickname) {
        signUpInfo.nickname = signUpInfo.userId;
      }
      register(signUpInfo).then((response) => {
        if (response.status === 200) {
          alert('회원가입 완료');
          naviage('/');
        } else {
          alert('오류가 발생했습니다. 다시 시도해 주세요');
          console.log((response.status, response.statusText));
        }
      });
    }
  };

  return (
    <div className="signup">
      <h1>회원가입</h1>
      <form className="signup-form" onSubmit={onSubmit}>
        <label htmlFor="userId">ID</label>
        <input id="userId" onChange={onChange} required></input>
        <label htmlFor="nickname">Nickname</label>
        <input id="nickname" onChange={onChange}></input>
        <label htmlFor="password">PW</label>
        <input
          id="password"
          onChange={onChange}
          type="password"
          required
        ></input>
        <label htmlFor="password-check">PW Check</label>
        <input
          id="password-check"
          type="password"
          ref={passwordCheck}
          required
        ></input>
        <button className="signup-btn">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
