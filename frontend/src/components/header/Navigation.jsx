import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import useZones from '../../hooks/useZones';

const Navigation = ({ isOpen }) => {
  const { zones, loading } = useZones();
  const [zonesExpanded, setZonesExpanded] = useState(false);

  const toggleZones = () => {
    setZonesExpanded(!zonesExpanded);
  };

  // Variantes de animación para el menú
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  // Variantes para cada item del menú
  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const handleToggleDropdown = (e) => {
    if (window.innerWidth <= 1200) {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Nav
          as={motion.nav}
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <NavList as={motion.ul}>
            {/* INICIO */}
            <NavItem as={motion.li} variants={itemVariants}>
              <Link to="/">INICIO</Link>
            </NavItem>

            {/* SOBRE NOSOTROS */}
            <NavItem as={motion.li} variants={itemVariants}>
              <Link to="/sobre-nosotros">SOBRE NOSOTROS</Link>
            </NavItem>

            {/* Dropdown de Zonas - Solo visible en móvil */}
            {!loading && zones && zones.length > 0 && (
              <ZonesDropdownWrapper as={motion.div} variants={itemVariants}>
                <NavItem>
                  <DropdownToggle onClick={toggleZones}>
                    ZONAS
                    <DropdownIcon $expanded={zonesExpanded}>▼</DropdownIcon>
                  </DropdownToggle>
                </NavItem>

                <AnimatePresence>
                  {zonesExpanded && (
                    <DropdownContent
                      as={motion.div}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {zones.map((zone, index) => (
                        <DropdownItem
                          key={zone.documentId || zone.id}
                          as={motion.li}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link to={`/zona/${zone.Slug || zone.slug || zone.documentId || zone.id}`}>
                            {zone.title}
                          </Link>
                        </DropdownItem>
                      ))}
                    </DropdownContent>
                  )}
                </AnimatePresence>
              </ZonesDropdownWrapper>
            )}

            {/* PROPIEDADES EN VENTA */}
            <NavItem as={motion.li} variants={itemVariants}>
              <Link to="/propiedades-venta">PROPIEDADES EN VENTA</Link>
            </NavItem>

            {/* ALQUILERES */}
            <NavItem as={motion.li} variants={itemVariants}>
              <Link to="/alquileres">ALQUILERES</Link>
            </NavItem>

            {/* CONTACTO */}
            <NavItem as={motion.li} variants={itemVariants}>
              <Link to="/contacto">CONTACTO</Link>
            </NavItem>
          </NavList>
        </Nav>
      )}
    </AnimatePresence>
  );
};

export default Navigation;

export const Nav = styled.nav`
  /* Menú hamburguesa desplegable con efectos premium */
  position: absolute;
  top: 100%;
  right: 2rem;
  left: auto;
  width: 320px;
  max-width: calc(100vw - 4rem);
  background: linear-gradient(
    180deg,
    rgba(43, 46, 75, 0.98) 0%,
    rgba(43, 46, 75, 0.95) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1.5rem 0;
  z-index: 10000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  margin-top: 0.5rem;

  @media (max-width: 968px) {
    width: 100%;
    max-width: 100vw;
    right: 0;
    left: 0;
    border-radius: 0;
    margin-top: 0;
  }
`;

export const NavList = styled.ul`
  /* Lista vertical con espaciado */
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0 1rem;
  text-align: center;
`;

export const NavItem = styled.li`
  a {
    color: var(--text-light);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 400;
    font-family: var(--headings-font);
    text-transform: uppercase;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.15),
        transparent
      );
      transition: left 0.5s ease;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateX(5px);
      
      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateX(3px) scale(0.98);
    }
  }
`;
export const ZonesDropdownWrapper = styled.div`
  /* Solo visible en móvil (dentro del menú hamburguesa) */
  display: block;

  @media (min-width: 969px) {
    display: none;
  }
`;

export const DropdownToggle = styled.button`
  color: var(--text-light);
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 400;
  font-family: var(--headings-font);
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateX(3px) scale(0.98);
  }
`;

export const DropdownIcon = styled.span`
  font-size: 0.8rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: inline-block;
`;

export const DropdownContent = styled.div`
  overflow: hidden;
  background-color: var(--brand-blue);
  border-radius: 8px;
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const DropdownItem = styled.li`
  list-style: none;
  
  a {
    color: var(--text-light);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 300;
    font-family: var(--headings-font);
    text-transform: uppercase;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    padding: 0.9rem 1.5rem 0.9rem 2.5rem;
    position: relative;

    &::before {
      content: '→';
      position: absolute;
      left: 1.2rem;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
      padding-left: 3rem;
      
      &::before {
        opacity: 1;
        transform: translateX(0);
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;
