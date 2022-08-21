import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { userLogout } from '@modules/users/user';

import NavBar from '@components/ui/NavBar';
import Button from '@components/common/Button';

const Header = ({ pages }) => {
  const { userState, error, loading } = useSelector(({ user, loading }) => ({
    userState: user.user,
    error: user.error,
    loading: loading['user/LOGOUT'],
  }));
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  const onLogOutClick = () => {
    dispatch(userLogout(user));
    if (error) {
      alert('오류가 발생하였습니다. 관리자에게 문의 하세요');
      return;
    } else if (!loading) {
      setUser(null);
      navigate('/');
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [userState]);

  return (
    <header className="header-wrapper">
      <div className="header">
        <Link to="/">
          <h1 className="title">WA!</h1>
        </Link>
        <NavBar pages={pages} />
        <div className="button-wrapper">
          {user ? (
            <>
              <span>{`${user.nickname}님`}</span>
              <Button className="logout-btn" onClick={onLogOutClick}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="login-btn">로그인</Button>
              </Link>
              <Link to="/signup">
                <Button className="sign-up-btn">회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
