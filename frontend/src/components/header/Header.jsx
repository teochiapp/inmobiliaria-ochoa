import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useScrollPosition from '../../hooks/useScrollPosition';
import Logo from './Logo';
import Navigation from './Navigation'
import styled from 'styled-components';
const Header = ({ isSolid = false }) => {
  const scrolled = useScrollPosition(50);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Determine if background should be visible
  // Show background if scrolled, explicitly set to solid, or NOT on the home page
  const isHome = location.pathname === '/';
  const showBackground = scrolled || isSolid || !isHome;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <StyledHeader $scrolled={showBackground}>
      <HeaderContainer>
        <Logo />

        <Navigation isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />

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

        <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle menu" $isOpen={mobileMenuOpen}>
          <span></span>
          <span></span>
          <span></span>
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
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:1rem;


  @media (max-width: 1200px) {
    justify-content: space-between;
  }
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;




export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: relative;
  z-index: 1001;

  span {
    display: block;
    width: 28px;
    height: 3px;
    background-color: var(--text-light);
    border-radius: 2px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:nth-child(1) {
      top: ${props => props.$isOpen ? '50%' : '8px'};
      transform: translateX(-50%) ${props => props.$isOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(0) rotate(0)'};
    }

    &:nth-child(2) {
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      opacity: ${props => props.$isOpen ? '0' : '1'};
      width: ${props => props.$isOpen ? '0' : '28px'};
    }

    &:nth-child(3) {
      top: ${props => props.$isOpen ? '50%' : 'calc(100% - 11px)'};
      transform: translateX(-50%) ${props => props.$isOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(0) rotate(0)'};
    }
  }

  @media (max-width: 1200px) {
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

  @media (max-width: 1200px) {
    display: none;
  }
`;
