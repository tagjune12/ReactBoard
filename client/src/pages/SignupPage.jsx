import SignupFormContainer from '@containers/auth/SignupFormContainer';
import SEO from '@components/common/SEO';

const SignupPage = () => {
  return (
    <>
      <SEO title="회원가입" />
      <SignupFormContainer />
    </>
  );
};

export default SignupPage;
