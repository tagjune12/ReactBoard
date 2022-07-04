import '@styles/login.scss';
import { login } from '@lib/api/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFail } from '@modules/user';
import { BsPersonCircle, BsPersonFill, BsLockFill } from 'react-icons/bs';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { value, id } = event.target;
    setLoginInfo({
      ...loginInfo,
      [id]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login(loginInfo).then((response) => {
      if (response.status === 200) {
        alert('로그인 성공');
        dispatch(loginSuccess(response.data));
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate(-1);
      }
    });
  };

  return (
    <div className="login">
      <div className="login-form-wrapper">
        <BsPersonCircle className="login-icon" />
        <h1>로그인</h1>
        <form className="login-form" onSubmit={onSubmit}>
          {/* <form className="login-form"> */}
          <div className="id">
            <BsPersonFill />
            {/* <label htmlFor="userId">
              <BsPersonFill />
            </label> */}
            <input
              id="userId"
              placeholder="아이디"
              onChange={onChange}
              required
            />
          </div>
          {/* <br /> */}
          <div className="password">
            <BsLockFill />
            {/* <label htmlFor="password">
              <BsLockFill />
            </label> */}
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
        {/* <button className="login-btn" onClick={onSubmit}>
          로그인
        </button> */}
      </div>
    </div>
  );
};

export default Login;
