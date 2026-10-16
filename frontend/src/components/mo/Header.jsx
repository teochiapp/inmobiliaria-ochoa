import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import usePreferentialZones from './usePreferentialZones';
import { SITE, waLink } from '../../config/site';
import logoBlanco from '../../public/brand/logo-blanco.png';

const NAV = [
    { key: 'home', label: 'Inicio', to: '/' },
    { key: 'nos', label: 'Sobre nosotros', to: '/sobre-nosotros' },
    { key: 'zona', label: 'Zonas', dropdown: true },
    { key: 'ventas', label: 'Ventas', to: '/propiedades-venta' },
    { key: 'alq', label: 'Alquileres', to: '/alquileres' },
    { key: 'contacto', label: 'Contacto', to: '/contacto' },
];

const activeKey = (pathname) => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/sobre-nosotros')) return 'nos';
    if (pathname.startsWith('/zona')) return 'zona';
    if (pathname.startsWith('/propiedades-venta') || pathname.startsWith('/propiedad/venta')) return 'ventas';
    if (pathname.startsWith('/alquileres') || pathname.startsWith('/propiedad/alquiler')) return 'alq';
    if (pathname.startsWith('/contacto')) return 'contacto';
    return '';
};

const ZoneLink = ({ item, className, children, onClick }) =>
    item.path ? (
        <Link to={item.path} className={className} onClick={onClick}>
            {children}
        </Link>
    ) : (
        <span className={className} aria-disabled="true" style={{ opacity: 0.55 }}>
            {children}
        </span>
    );

const Header = () => {
    const { pathname } = useLocation();
    const { preferential } = usePreferentialZones();
    const [open, setOpen] = useState(false);
    const current = activeKey(pathname);
    const firstZonePath = preferential.find((z) => z.path)?.path || '/';

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        document.body.classList.toggle('mo-lock', open);
        if (!open) return undefined;
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.classList.remove('mo-lock');
        };
    }, [open]);

    // Si todavía no hay zonas cargadas en Strapi, no se muestra el ítem "Zonas"
    const navItems = preferential.length ? NAV : NAV.filter((item) => !item.dropdown);

    const cls = (key) => `mo-nav-a${key === current ? ' is-active' : ''}`;

    return (
        <header className="mo-hdr">
            <div className="mo-wrap mo-hdr-in">
                <Link to="/" className="mo-logo" aria-label={`${SITE.name} — Inicio`}>
                    <img src={logoBlanco} alt={SITE.name} />
                </Link>

                <nav className="mo-nav" aria-label="Navegación principal">
                    {navItems.map((item) =>
                        item.dropdown ? (
                            <div className="mo-dd" key={item.key}>
                                <Link to={firstZonePath} className={cls(item.key)} aria-haspopup="true">
                                    {item.label} <Icon name="chevron" />
                                </Link>
                                <div className="mo-dd-menu">
                                    {preferential.map((z) => (
                                        <ZoneLink item={z} key={z.name}>
                                            <span className="mo-dd-n">{z.n}</span>
                                            {z.name}
                                        </ZoneLink>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link key={item.key} to={item.to} className={cls(item.key)} aria-current={item.key === current ? 'page' : undefined}>
                                {item.label}
                            </Link>
                        )
                    )}
                </nav>

                <div className="mo-hdr-act">
                    <a className="mo-hdr-tel" href={`tel:${SITE.phoneTel}`}>
                        <Icon name="phone" size="sm" />
                        {SITE.phoneDisplay}
                    </a>
                    <a className="mo-btn mo-btn--red mo-btn--sm" href={waLink()} target="_blank" rel="noopener noreferrer">
                        Contactar
                    </a>
                    <button className="mo-burger" type="button" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(true)}>
                        <span />
                        <span />
                    </button>
                </div>
            </div>
            <div className="mo-hdr-bar" />

            {open && (
                <div className="mo-mnav" role="dialog" aria-modal="true" aria-label="Menú">
                    <div className="mo-mnav-top">
                        <img src={logoBlanco} alt={SITE.name} />
                        <button className="mo-x" type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                            <Icon name="close" />
                        </button>
                    </div>
                    <nav className="mo-mnav-list" aria-label="Menú móvil">
                        {navItems.map((item, i) => (
                            <Link key={item.key} to={item.dropdown ? firstZonePath : item.to}>
                                <span>{String(i + 1).padStart(2, '0')}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="mo-mnav-sub">
                        {preferential.map((z) => (
                            <ZoneLink item={z} key={z.name}>
                                {z.name}
                            </ZoneLink>
                        ))}
                    </div>
                    <div className="mo-mnav-foot">
                        <a className="mo-btn mo-btn--red mo-btn--block" href={waLink()} target="_blank" rel="noopener noreferrer">
                            Escribinos por WhatsApp
                        </a>
                        <a className="mo-btn mo-btn--ghost mo-btn--block" href={`tel:${SITE.phoneTel}`}>
                            {SITE.phoneDisplay}
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
