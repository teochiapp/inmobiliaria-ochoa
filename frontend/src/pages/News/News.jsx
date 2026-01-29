import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import NewsHero from '../../components/news/NewsHero';

const News = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageWrapper>
            <Header isSolid={false} />
            <NewsHero />
            <ContentContainer>
                <SectionTitle>Mantenete al tanto</SectionTitle>
                <p>Próximamente estaremos compartiendo las últimas novedades del sector inmobiliario.</p>
            </ContentContainer>
            <Footer />
        </PageWrapper>
    );
};

export default News;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 6rem 2rem;
    text-align: center;
    flex: 1;

    p {
        font-family: var(--body-font);
        font-size: 1.2rem;
        color: var(--text-light-gray);
        max-width: 700px;
        margin: 0 auto;
    }
`;

const SectionTitle = styled.h2`
    font-family: var(--headings-font);
    color: var(--brand-red);
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
    position: relative;
    display: inline-block;

    &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background-color: var(--brand-red);
    }
`;

