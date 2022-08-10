import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '@modules/users/user';
import LoginForm from '@components/auth/LoginForm';
import { useEffect } from 'react';

const LoginFormContainer = () => {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });

  const { error, user } = useSelector(({ user }) => user);

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
    dispatch(userLogin(loginInfo));
  };

  useEffect(() => {
    if (!user && !error) return;
    if (error) {
      alert('로그인 실패');
      return;
    } else {
      alert('로그인 성공');
      navigate('/all');
    }
  }, [error, user]);

  return <LoginForm onChange={onChange} onSubmit={onSubmit} />;
};

export default LoginFormContainer;
