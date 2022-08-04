import React from 'react';
// import image from '@assets/images/footer-icon2.png';
import { AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  // const size = 4;

  return (
    <footer className="footer-wrapper">
      {/* <div className="info">개발자 정보</div> */}
      <div className="footer">
        <a
          className="info"
          href="https://github.com/tagjune12"
          rel="noreferrer"
          target="_blank"
        >
          <AiFillGithub />
        </a>
        {/* <img
        className="icon"
        src={image}
        width={6 * size}
        height={5 * size}
        alt="아이콘"
      /> */}
        <div className="icon">
          &copy; 2022. Taek Jun Lee. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
