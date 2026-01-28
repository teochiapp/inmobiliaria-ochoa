import React from 'react';
import styled from 'styled-components';

const AboutStats = () => {
    return (
        <StatsContainer>
            <StatItem>
                <Number>15+</Number>
                <Label>Años de Experiencia</Label>
            </StatItem>
            <StatItem>
                <Number>500+</Number>
                <Label>Propiedades Vendidas</Label>
            </StatItem>
            <StatItem>
                <Number>100%</Number>
                <Label>Clientes Satisfechos</Label>
            </StatItem>
        </StatsContainer>
    );
};

export default AboutStats;

const StatsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 4rem 1rem;
    background-color: white;
    max-width: 1200px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 3rem;
        text-align: center;
    }
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Number = styled.span`
    font-family: var(--headings-font);
    font-size: 3.5rem;
    color: var(--brand-blue);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
`;

const Label = styled.span`
    font-family: var(--text-font);
    font-size: 1rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
`;
