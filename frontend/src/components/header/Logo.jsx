import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = () => {
  return (
    <LogoWrapper>
      <Link to="/">
        <img src="/src/public/logo.png" alt="Inmobiliaria Ochoa Logo" />
      </Link>
    </LogoWrapper>
  );
};

export default Logo;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  img {
    height: 80px;
    width: auto;
    border-radius: 7%;

    @media (max-width: 768px) {
      height: 40px;
    }
  }
`;