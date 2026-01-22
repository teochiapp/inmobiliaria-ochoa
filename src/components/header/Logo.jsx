import React from 'react';
import { Link } from 'react-router-dom';
import { LogoWrapper } from './Header.styles';

const Logo = () => {
    return (
        <LogoWrapper>
            <Link to="/">
                <img src="/src/public/logo.jpeg" alt="Inmobiliaria Ochoa Logo" />
            </Link>
        </LogoWrapper>
    );
};

export default Logo;
