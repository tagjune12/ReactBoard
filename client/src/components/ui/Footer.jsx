import React from 'react';
import { AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <a
          className="info"
          href="https://github.com/tagjune12"
          rel="noreferrer"
          target="_blank"
        >
          <AiFillGithub />
        </a>
        <div className="icon">
          &copy; 2022. Taek Jun Lee. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
