import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = ({ isOpen }) => {
  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre nosotros', path: '/sobre-nosotros' },
    { label: 'Propiedades en venta', path: '/propiedades-venta' },
    { label: 'Alquileres', path: '/alquileres' },
    { label: 'Contacto', path: '/contacto' },
  ];

  return (
    <Nav $isOpen={isOpen}>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default Navigation;

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

  @media (max-width: 1200px) {
    gap: 1.5rem;
  }

  @media (max-width: 1100px) {
    gap: 1.2rem;
  }

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
    font-size: clamp(0.85rem, 1vw, 1.1rem);
    font-weight: 400;
    font-family: var(--headings-font);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    transition: opacity 0.2s ease;
    display: block;
    padding: 0.5rem 1rem;
    white-space: nowrap;

    &:hover {
      opacity: 0.8;
    }

    @media (max-width: 1200px) {
      font-size: 1rem;
      padding: 0.5rem 0.8rem;
    }

    @media (max-width: 1100px) {
      font-size: 0.95rem;
      padding: 0.5rem 0.6rem;
    }

    @media (max-width: 1000px) {
      font-size: 0.9rem;
      padding: 0.5rem 0.5rem;
    }

    @media (max-width: 968px) {
      font-size: 1.1rem;
      padding: 1rem;
      white-space: normal;
    }
  }
`;


