import React, { useState } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import Logo from './Logo';
import Navigation from './Navigation';
import styled from 'styled-components';
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

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  
  background-color: ${props => props.$scrolled ? 'var(--brand-red)' : 'transparent'};
  box-shadow: ${props => props.$scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

export const HeaderContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  img {
    height: 50px;
    width: auto;
    object-fit: contain;

    @media (max-width: 768px) {
      height: 40px;
    }
  }
`;

export const Nav = styled.nav`
  @media (max-width: 968px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--brand-red);
    padding: 1rem 0;
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 0;
    text-align: center;
  }
`;

export const NavItem = styled.li`
  a {
    color: var(--text-light);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    transition: opacity 0.2s ease;
    display: block;
    padding: 0.5rem 1rem;

    &:hover {
      opacity: 0.8;
    }

    @media (max-width: 968px) {
      padding: 1rem;
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 968px) {
    display: block;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  a {
    color: var(--text-light);
    font-size: 1.5rem;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 968px) {
    display: none;
  }
`;
