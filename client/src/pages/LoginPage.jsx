import LoginFormContainer from '@containers/auth/LoginFormContainer';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <LoginFormContainer />
    </>
  );
};

export default LoginPage;
