import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useScrollPosition from '../../hooks/useScrollPosition';
import useZones from '../../hooks/useZones';
import Logo from './Logo';
import Navigation from './Navigation'
import styled from 'styled-components';

const Header = ({ isSolid = false }) => {
  const scrolled = useScrollPosition(50);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { zones, loading } = useZones();

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

        {/* Navegación de zonas en desktop */}
        <DesktopZonesNav>
          {!loading && zones && zones.map((zone) => (
            <ZoneLink
              key={zone.documentId || zone.id}
              to={`/zona/${zone.documentId || zone.id}`}
            >
              {zone.title}
            </ZoneLink>
          ))}
        </DesktopZonesNav>

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
  right: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 9999;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  touch-action: manipulation; /* Previene interferencia con gestos de drag en móvil */
  
  background-color: ${props => props.$scrolled ? 'var(--brand-red)' : 'transparent'};
  box-shadow: ${props => props.$scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

export const HeaderContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;




export const MobileMenuButton = styled.button`
  /* Siempre visible en todas las resoluciones */
  display: block;
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
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

export const DesktopZonesNav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0 2rem;

  @media (max-width: 968px) {
    display: none;
  }
`;

export const ZoneLink = styled(Link)`
  color: var(--text-light);
  text-decoration: none;
  font-size: clamp(0.95rem, 1vw, 1rem);
  font-weight: 500;
  font-family: var(--headings-font);
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  transition: all 0.2s ease;
  white-space: nowrap;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1200px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.6rem;
  }

  @media (max-width: 1100px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.5rem;
    gap: 1rem;
  }
`;
