import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import AboutHero from '../../components/aboutUs/AboutHero';
import AboutIntro from '../../components/aboutUs/AboutIntro';
import AboutTeam from '../../components/aboutUs/AboutTeam';

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
                <AboutIntro />
                <AboutTeam />
                <CallToAction>
                    <ContentWrapper>
                        <CtaTitle>Contactanos para descubrir tu propiedad ideal</CtaTitle>
                        <CtaButton href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">CONTACTAR AHORA</CtaButton>
                    </ContentWrapper>
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
    padding: 8rem 1rem;
    background-image: url('/src/public/aboutUs/coche.png');
    background-size: cover;
    background-position: center;
    background-attachment: scroll;

    @media (min-width: 768px) {
        background-attachment: fixed;
    }
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    color: white;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 1;
    }
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CtaTitle = styled.h2`
    font-family: var(--headings-font);
    font-size: 2.5rem;
    color: white;
    margin-bottom: 2rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    max-width: 800px;
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
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);

    &:hover {
        background-color: #a0151c;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
    }
`;
