import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import AboutSection from '../../components/home/about/AboutSection';
import GallerySection from '../../components/home/gallery/GallerySection';
import ContactForm from '../../components/contact/ContactForm';
import Breadcrumb from '../../components/common/Breadcrumb'; // Added import
import ContactHero from '../../components/contact/ContactHero';
import ScheduleSection from '../../components/contact/ScheduleSection';

const AnimatedSection = ({ children, delay = 0 }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1], // Cubic-bezier for smoother feel
                    delay
                }
            }
        }}
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Header isSolid={false} />
            <ContactHero />
            <PageWrapper>
                <AnimatedSection>
                    <AboutContainer>
                        <ScheduleSection />
                    </AboutContainer>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <AboutSection />
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                    <ContactForm />
                </AnimatedSection>
            </PageWrapper>
            <Footer />
        </motion.div>
    );
};

export default Contact;

const PageWrapper = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (max-width: 968px) {
        padding-top: 0;
    }
`;

const AboutContainer = styled.div`
    width: 100%;
    position: relative;
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

