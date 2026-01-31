import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../public/logo.png';

const Logo = () => {
  return (
    <LogoWrapper>
      <Link to="/">
        <img src={logo} alt="Inmobiliaria Ochoa Logo" />
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