import React, { useState } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import Logo from './Logo';
import Navigation from './Navigation';
import { StyledHeader, HeaderContainer, MobileMenuButton, SocialIcons } from './Header.styles';

const Header = () => {
    const scrolled = useScrollPosition(50);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <StyledHeader $scrolled={scrolled}>
            <HeaderContainer>
                <Logo />

                <Navigation isOpen={mobileMenuOpen} />

                <SocialIcons>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="mailto:info@inmobiliariaochoa.com" aria-label="Email">
                        <i className="fas fa-envelope"></i>
                    </a>
                </SocialIcons>

                <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
                    {mobileMenuOpen ? '✕' : '☰'}
                </MobileMenuButton>
            </HeaderContainer>
        </StyledHeader>
    );
};

export default Header;
