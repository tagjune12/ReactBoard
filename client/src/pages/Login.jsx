import '@styles/login.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userlogin } from '@modules/user';
import { BsPersonCircle, BsPersonFill, BsLockFill } from 'react-icons/bs';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(({ user }) => user);

  const onChange = (event) => {
    const { value, id } = event.target;
    setLoginInfo({
      ...loginInfo,
      [id]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(userlogin(loginInfo));
    if (!loading) {
      if (error) {
        alert('로그인 실패');
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        navigate(-1);
      }
    }
  };

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

export default Login;
