import '@styles/layout.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => {
    // console.log(state);
    // console.log(state.login);
    return state.user.user;
  });

  return (
    <div className="layout-header">
      <h1 className="title">Title</h1>
      <div className="button-wrapper">
        {user ? (
          <>
            <span>{`${user.nickname}님 환영합니다`}</span>
            <button>로그아웃</button>
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
