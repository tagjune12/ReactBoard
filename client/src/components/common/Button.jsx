import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  height: 36px;
  padding: 2px 10px;
  background-color: #3e71ad;
  color: white;
  &:hover {
    background-color: #4782c8;
  }
`;

const Button = ({ className, onClick, children }) => {
  return (
    <>
      <StyledButton className={clsx(className, 'btn')} onClick={onClick}>
        {children}
      </StyledButton>
    </>
  );
};

export default Button;
