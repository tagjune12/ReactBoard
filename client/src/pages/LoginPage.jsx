import LoginFormContainer from '@containers/auth/LoginFormContainer';
import SEO from '@components/common/SEO';

const LoginPage = () => {
  return (
    <>
      <SEO title="로그인-WA!" />
      <LoginFormContainer />
    </>
  );
};

export default LoginPage;
