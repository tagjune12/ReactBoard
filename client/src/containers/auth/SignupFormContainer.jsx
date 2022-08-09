import React, { useState, useRef } from 'react';
import { register } from '@lib/api/auth';
import { useNavigate } from 'react-router';

import SignupForm from '@components/auth/SignupForm';

const SignupFormContainer = () => {
  const naviage = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    userId: '',
    nickname: '',
    password: '',
  });
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
          // console.log((response.status, response.statusText));
        }
      });
    }
  };

  return (
    <SignupForm
      onSubmit={onSubmit}
      onChange={onChange}
      passwordCheck={passwordCheck}
    />
  );
};

export default SignupFormContainer;
