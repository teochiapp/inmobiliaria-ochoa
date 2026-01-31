import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <Container>
            <ContentWrapper
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <ErrorCode>404</ErrorCode>
                <Title>Página no encontrada</Title>
                <Description>
                    Lo sentimos, parece que la página que estás buscando no existe o ha sido movida.
                </Description>
                <HomeButton to="/">
                    Volver al Inicio
                </HomeButton>
            </ContentWrapper>
        </Container>
    );
};

export default NotFound;

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--text-light);
    padding: 2rem;
    padding-top: 100px; /* Space for fixed header */
`;

const ContentWrapper = styled.div`
    text-align: center;
    max-width: 600px;
    padding: 3rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorCode = styled.h1`
    font-family: var(--headings-font);
    font-size: 8rem;
    color: var(--brand-red);
    line-height: 1;
    margin-bottom: 1rem;
    text-shadow: 4px 4px 0px rgba(199, 26, 34, 0.1);
    
    @media (max-width: 768px) {
        font-size: 5rem;
    }
`;

const Title = styled.h2`
    font-family: var(--headings-font);
    font-size: 2rem;
    color: var(--brand-blue);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const Description = styled.p`
    font-family: var(--text-font);
    font-size: 1.1rem;
    color: #64748b;
    margin-bottom: 2.5rem;
    line-height: 1.6;
`;

const HomeButton = styled(Link)`
    display: inline-block;
    background-color: var(--brand-blue);
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 5px;
    text-decoration: none;
    font-family: var(--headings-font);
    font-weight: 600;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
        background-color: var(--brand-red);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(199, 26, 34, 0.3);
    }
`;
