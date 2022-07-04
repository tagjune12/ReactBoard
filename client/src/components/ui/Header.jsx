import '@styles/layout.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '@lib/api/auth';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

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
      <Link to="/">
        <h1 className="title">Title</h1>
      </Link>
      <div className="search-bar">
        <form className="search-form">
          <input placeholder="검색" />
          <AiOutlineSearch
            className="search-btn"
            onClick={() => {
              console.log('onClick');
            }}
          />
        </form>
      </div>
      <div className="button-wrapper">
        {user ? (
          <>
            <span>{`${user.nickname}님`}</span>
            <button className="logout-btn" onClick={onLogOutClick}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="sign-up-btn">회원가입</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
