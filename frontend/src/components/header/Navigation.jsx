import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavList, NavItem } from './Header.styles';

const Navigation = ({ isOpen }) => {
    const navItems = [
        { label: 'Inicio', path: '/' },
        { label: 'Sobre nosotros', path: '/sobre-nosotros' },
        { label: 'Propiedades en venta', path: '/propiedades-venta' },
        { label: 'Alquileres', path: '/alquileres' },
        { label: 'Novedades', path: '/novedades' },
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
