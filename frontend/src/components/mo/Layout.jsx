import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

// Contenedor de cada página: header fijo, contenido, footer y botón de WhatsApp.
const Layout = ({ children, title, footer = true, dark = false }) => {
    useEffect(() => {
        if (title) document.title = `${title} · Marin Ochoa Bienes Raíces`;
    }, [title]);

    return (
        <div className="mo" style={dark ? { background: '#0B0C18' } : undefined}>
            <Header />
            <main>{children}</main>
            {footer && <Footer />}
            <FloatingWhatsApp />
        </div>
    );
};

export default Layout;
