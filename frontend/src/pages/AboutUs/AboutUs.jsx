import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import AboutHero from '../../components/aboutUs/AboutHero';
import AboutIntro from '../../components/aboutUs/AboutIntro';
import AboutValues from '../../components/aboutUs/AboutValues';
import AboutStats from '../../components/aboutUs/AboutStats';

const AboutUs = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header isSolid={false} /> {/* Header transparante en el hero */}
            <Main>
                <AboutHero />
                <AboutStats />
                <AboutIntro />
                <AboutValues />
                <CallToAction>
                    <CtaTitle>¿Listo para encontrar su propiedad ideal?</CtaTitle>
                    <CtaButton href="/contacto">CONTACTAR AHORA</CtaButton>
                </CallToAction>
            </Main>
            <Footer />
        </>
    );
};

export default AboutUs;

const Main = styled.main`
    width: 100%;
    overflow-x: hidden;
`;

const CallToAction = styled.section`
    padding: 6rem 1rem;
    background-color: #f8f8f8;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CtaTitle = styled.h2`
    font-family: var(--headings-font);
    font-size: 2rem;
    color: var(--brand-blue);
    margin-bottom: 2rem;
`;

const CtaButton = styled.a`
    display: inline-block;
    background-color: var(--brand-red);
    color: white;
    padding: 1rem 3rem;
    font-family: var(--text-font);
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 1px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #a0151c;
    }
`;
