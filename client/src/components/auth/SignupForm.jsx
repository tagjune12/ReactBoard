import React from 'react';
import Button from '@components/common/Button';
import { IoNewspaperOutline } from 'react-icons/io5';

const SignupForm = ({ onSubmit, onChange, passwordCheck }) => {
  return (
    <div className="signup">
      <div className="signup-form-wrapper">
        <h1 className="title">SIGN UP</h1>
        <form className="signup-form" onSubmit={onSubmit}>
          <input
            id="userId"
            placeholder="아이디"
            onChange={onChange}
            required
          />
          <input id="nickname" placeholder="닉네임" onChange={onChange} />
          <input
            id="password"
            placeholder="비밀번호"
            onChange={onChange}
            type="password"
            required
          />
          <input
            id="password-check"
            placeholder="비밀번호 확인"
            type="password"
            ref={passwordCheck}
            required
          />
          <Button className="signup-btn">회원가입</Button>
        </form>
      </div>
    </div>
    // <div className="signup">
    //   <div className="signup-form-wrapper">
    //     <IoNewspaperOutline className="signup-icon" />
    //     <h1>회원가입</h1>
    //     <form className="signup-form" onSubmit={onSubmit}>
    //       {/* <label htmlFor="userId">아이디</label> */}
    //       <input
    //         id="userId"
    //         placeholder="아이디"
    //         onChange={onChange}
    //         required
    //       ></input>
    //       {/* <label htmlFor="nickname">닉네임</label> */}
    //       <input id="nickname" placeholder="닉네임" onChange={onChange}></input>
    //       {/* <label htmlFor="password">비밀번호</label> */}
    //       <input
    //         id="password"
    //         placeholder="비밀번호"
    //         onChange={onChange}
    //         type="password"
    //         required
    //       ></input>
    //       {/* <label htmlFor="password-check">비밀번호 확인</label> */}
    //       <input
    //         id="password-check"
    //         placeholder="비밀번호 확인"
    //         type="password"
    //         ref={passwordCheck}
    //         required
    //       ></input>
    //       <button className="signup-btn">회원가입</button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default SignupForm;
