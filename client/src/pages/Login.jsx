import '@styles/login.scss';
import { login } from '@lib/api/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFail } from '@modules/user';

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
      <h1>로그인</h1>
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="userId">ID</label>
        <input id="userId" onChange={onChange} required />
        <label htmlFor="password">PW</label>
        <input id="password" type="password" onChange={onChange} required />
        <button className="login-btn">로그인</button>
      </form>
    </div>
  );
};

export default Login;
