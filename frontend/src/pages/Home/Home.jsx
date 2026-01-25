import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/header/Header';
import Hero from '../../components/home/hero/Hero';
import Map from '../../components/home/map/Map';
import AboutSection from '../../components/home/about/AboutSection';
import GallerySection from '../../components/home/gallery/GallerySection';
import Sales from '../../components/home/sales/sales';
import Rents from '../../components/home/rents/Rents';
import Zones from '../../components/home/zones/zones';
import { SalesContainer } from './Home.styles';
import Footer from '../../components/footer/footer';

const AnimatedSection = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        style={{ width: '100%' }}
    >
        {children}
    </motion.div>
);

const Home = () => {
    return (
        <>
            <Header />
            <AnimatedSection>
                <Hero />
            </AnimatedSection>
            <SalesContainer>
                <AnimatedSection delay={0.2}>
                    <Sales />
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                    <Rents />
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                    <Zones />
                </AnimatedSection>
            </SalesContainer>
            <AnimatedSection>
                <GallerySection />
            </AnimatedSection>
            <AnimatedSection>
                <AboutSection />
            </AnimatedSection>
            <AnimatedSection>
                <Map />
            </AnimatedSection>
            <AnimatedSection>
                <Footer />
            </AnimatedSection>
        </>
    );
};

export default Home;

const SalesContainer = styled.div
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  background-color: var(--text-light);
;