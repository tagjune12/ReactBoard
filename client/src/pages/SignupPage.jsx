import SignupFormContainer from '@containers/auth/SignupFormContainer';
import { Helmet } from 'react-helmet-async';

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <SignupFormContainer />
    </>
  );
};

export default SignupPage;
