import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useZones from '../../hooks/useZones';

const Navigation = ({ isOpen, onClose }) => {
  const { zones } = useZones();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const preferentialZones = [
    'Mirador del Lago',
    'Balcón del Lago',
    'Loft del Lago'
  ];

  const getZonePath = (name) => {
    const zone = zones.find(z => z.title.toLowerCase() === name.toLowerCase());
    return zone ? `/zona/${zone.documentId || zone.id}` : '#';
  };

  const navItems = [
    { label: 'INICIO', path: '/' },
    { label: 'SOBRE NOSOTROS', path: '/sobre-nosotros' },
    {
      label: 'PRODUCTOS PREFERENCIALES',
      isDropdown: true,
      subItems: preferentialZones.map(name => ({
        label: name,
        path: getZonePath(name)
      }))
    },
    { label: 'PROPIEDADES EN VENTA', path: '/propiedades-venta' },
    { label: 'ALQUILERES', path: '/alquileres' },
    { label: 'CONTACTO', path: '/contacto' },
  ];

  const handleToggleDropdown = (e) => {
    if (window.innerWidth <= 1200) {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={() => { onClose(); setDropdownOpen(false); }} />
      <Nav $isOpen={isOpen}>
        <NavList>
          {navItems.map((item, index) => (
            <NavItem key={item.label} $index={index} $isOpen={isOpen} $isDropdown={item.isDropdown}>
              {item.isDropdown ? (
                <>
                  <DropdownTrigger onClick={handleToggleDropdown} $isOpen={dropdownOpen}>
                    <span>{item.label}</span> <i className={`fas fa-chevron-down ${dropdownOpen ? 'rotated' : ''}`}></i>
                  </DropdownTrigger>
                  <DropdownMenu $isOpen={dropdownOpen}>
                    {item.subItems.map((subItem) => (
                      <DropdownItem key={subItem.label}>
                        <Link to={subItem.path} onClick={() => { onClose(); setDropdownOpen(false); }}>
                          {subItem.label}
                        </Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </>
              ) : (
                <Link to={item.path} onClick={onClose}>{item.label}</Link>
              )}
            </NavItem>
          ))}
        </NavList>
      </Nav>
    </>
  );
};

export default Navigation;

export const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  i {
    font-size: 0.7rem;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.8;
    &.rotated {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const DropdownMenu = styled.div`
  @media (min-width: 1201px) {
    position: absolute;
    top: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%) translateY(15px);
    background: rgba(43, 46, 75, 0.98); /* Deep brand blue with slight transparency */
    backdrop-filter: blur(12px);
    min-width: 260px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
    padding: 0.8rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1000;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    &::before {
      content: '';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid rgba(43, 46, 75, 0.98);
    }
  }

  @media (max-width: 1200px) {
    max-height: ${props => props.$isOpen ? '300px' : '0'};
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    opacity: ${props => props.$isOpen ? '1' : '0'};
    margin-top: ${props => props.$isOpen ? '0.5rem' : '0'};
  }
`;

export const DropdownItem = styled.div`
  a {
    font-size: 0.95rem !important;
    text-shadow: none !important;
    padding: 0.8rem 1.2rem !important;
    text-transform: none !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white !important;
    background: transparent;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%) translateX(-10px);
      width: 4px;
      height: 0;
      background: var(--brand-red);
      border-radius: 0 4px 4px 0;
      transition: all 0.3s ease;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.08) !important;
      padding-left: 1.8rem !important;
      color: var(--text-light) !important;
      
      &::before {
        height: 60%;
        transform: translateY(-50%) translateX(0);
      }
    }

    @media (max-width: 1200px) {
      font-size: 1rem !important;
      padding: 0.7rem 0 !important;
      background: none !important;
      
      &:hover {
        padding-left: 0.5rem !important;
      }

      &::before {
        display: none;
      }
    }
  }
`;

export const NavItem = styled.li`
  position: relative;
  
  a, span {
    color: var(--text-light);
    text-decoration: none;
    font-size: clamp(0.85rem, 1vw, 1.1rem);
    font-weight: 400;
    font-family: var(--headings-font);
    text-transform: uppercase;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    transition: all 0.3s ease;
    display: block;
    padding: 0.5rem 1rem;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
      color: var(--brand-red-light, #ff4d4d);
    }

    @media (max-width: 1200px) {
      font-size: 1.1rem;
      padding: 0.8rem;
      white-space: normal;
      opacity: 0;
      transform: translateX(30px);
      animation: ${props => props.$isOpen ? 'slideInFromRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none'};
      animation-delay: ${props => props.$index * 0.1}s;
    }
  }

  /* Dropdown hover logic for desktop */
  @media (min-width: 1201px) {
    &:hover > ${DropdownMenu} {
       opacity: 1;
       visibility: visible;
       transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes slideInFromRight {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;


export const Nav = styled.nav`
  @media (max-width: 1200px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 50%;
    height: 100vh;
    background-color: var(--brand-red);
    padding: 5rem 2rem 2rem;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    box-shadow: ${props => props.$isOpen ? '-5px 10px 20px rgba(0, 0, 0, 0.3)' : 'none'};
    overflow-y: auto;
    border-bottom-left-radius: 20px;
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;


  @media (max-width: 1300px) {
   gap:0px;
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 1.5rem; /* Ajustado para dar espacio al dropdown */
    text-align: left;
     align-items: flex-start;
  }
`;

export const Overlay = styled.div`
  display: none;
  
  @media (max-width: 1200px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    opacity: ${props => props.$isOpen ? '1' : '0'};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 998;
    cursor: pointer;
  }
`;
