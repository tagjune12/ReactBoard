import '@styles/signup.scss';
import React, { useState, useRef } from 'react';
import { register } from '@lib/api/auth';
import { useNavigate } from 'react-router';
import { IoNewspaperOutline } from 'react-icons/io5';

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
      <div className="signup-form-wrapper">
        <IoNewspaperOutline className="signup-icon" />
        <h1>회원가입</h1>
        <form className="signup-form" onSubmit={onSubmit}>
          {/* <label htmlFor="userId">아이디</label> */}
          <input
            id="userId"
            placeholder="아이디"
            onChange={onChange}
            required
          ></input>
          {/* <label htmlFor="nickname">닉네임</label> */}
          <input id="nickname" placeholder="닉네임" onChange={onChange}></input>
          {/* <label htmlFor="password">비밀번호</label> */}
          <input
            id="password"
            placeholder="비밀번호"
            onChange={onChange}
            type="password"
            required
          ></input>
          {/* <label htmlFor="password-check">비밀번호 확인</label> */}
          <input
            id="password-check"
            placeholder="비밀번호 확인"
            type="password"
            ref={passwordCheck}
            required
          ></input>
          <button className="signup-btn">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
