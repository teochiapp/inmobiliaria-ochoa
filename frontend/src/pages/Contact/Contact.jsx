import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import AboutSection from '../../components/home/about/AboutSection';
import GallerySection from '../../components/home/gallery/GallerySection';
import ContactForm from '../../components/contact/ContactForm';

const AnimatedSection = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
        style={{ width: '100%' }}
    >
        {children}
    </motion.div>
);

const Contact = () => {
    // Scroll al inicio al cargar la página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header isSolid />
            <PageWrapper>
                <AnimatedSection>
                    {/* Sección de presentación utilizando el componente existente */}
                    <AboutContainer>
                        <AboutSection />
                    </AboutContainer>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    {/* Formulario de contacto */}
                    <ContactForm />
                </AnimatedSection>

            </PageWrapper>
            <Footer />
        </>
    );
};

export default Contact;

const PageWrapper = styled.main`
    width: 100%;
    padding-top: 100px; /* Espacio para el header fijo */
    display: flex;
    flex-direction: column;
    /* gap se maneja individualmente o en los contenedores para mayor control */

    @media (max-width: 968px) {
        padding-top: 80px;
    }
`;

const AboutContainer = styled.div`
    /* Ajustes para el contenedor de AboutSection si es necesario */
    width: 100%;
    position: relative;
    /* AboutSection tiene margins internos, nos aseguramos que fluya bien */
    background: linear-gradient(
  to bottom,
  #ffffff 0%,
  #ffffff 90%,
  #faf0f1 100%
);
`;

const GalleryContainer = styled.div`
    width: 100%;
`;
