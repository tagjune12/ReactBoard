import '@styles/layout.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="layout-header">
      <h1 className="title">Title</h1>
      <div className="button-wrapper">
        <Link className="login-btn" to="/login">
          로그인
        </Link>
        <Link className="sign-up-btn" to="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Header;
