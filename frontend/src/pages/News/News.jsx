import React from 'react';
import Header from '../../components/header/Header';
import Breadcrumb from '../../components/common/Breadcrumb';
import Footer from '../../components/footer/footer';
import styled from 'styled-components';

const News = () => {
    return (
        <>
            <Header />
            <Breadcrumb title="Novedades" />
            <ContentContainer>
                <h1>Novedades</h1>
                <p>Contenido próximamente...</p>
            </ContentContainer>
            <Footer />
        </>
    );
};

export default News;

const ContentContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
    text-align: center;
    min-height: 50vh;

    h1 {
        font-family: var(--headings-font);
        color: var(--brand-red);
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    p {
        font-family: var(--body-font);
        font-size: 1.1rem;
        color: var(--text-light-gray);
    }
`;
