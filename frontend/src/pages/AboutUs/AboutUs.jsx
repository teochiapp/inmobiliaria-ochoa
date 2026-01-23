import React from 'react';
import Header from '../../components/header/Header';

const AboutUs = () => {
    return (
        <>
            <Header />
            <div style={{ marginTop: '100px', padding: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Orbitron', color: 'var(--brand-red)' }}>Sobre Nosotros</h1>
                <p style={{ fontFamily: 'Lato', marginTop: '1rem' }}>Contenido próximamente...</p>
            </div>
        </>
    );
};

export default AboutUs;
