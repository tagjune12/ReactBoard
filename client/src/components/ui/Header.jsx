import '@styles/layout.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '@lib/api/auth';
import { useState, useEffect } from 'react';

const Header = () => {
  const userState = useSelector((state) => state.user.user);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const onLogOutClick = () => {
    logout(user).then(() => setUser());
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [userState]);

  return (
    <div className="layout-header">
      <h1 className="title">Title</h1>
      <div className="button-wrapper">
        {user ? (
          <>
            <span>{`${user.nickname}님 환영합니다`}</span>
            <button className="logout-btn" onClick={onLogOutClick}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link className="login-btn" to="/login">
              로그인
            </Link>
            <Link className="sign-up-btn" to="/signup">
              회원가입
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
