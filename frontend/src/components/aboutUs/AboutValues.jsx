import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const valuesData = [
    {
        icon: "fas fa-medal",
        title: "Excelencia",
        desc: "Nos comprometemos a brindar un servicio de la más alta calidad en cada detalle."
    },
    {
        icon: "fas fa-handshake",
        title: "Integridad",
        desc: "La honestidad y la transparencia son los pilares fundamentales de todas nuestras relaciones."
    },
    {
        icon: "fas fa-lightbulb",
        title: "Innovación",
        desc: "Utilizamos la mejor tecnología y estrategias de marketing para destacar su propiedad."
    },
    {
        icon: "fas fa-users",
        title: "Compromiso",
        desc: "Su éxito es nuestro éxito. Le acompañamos en cada paso del proceso inmobiliario."
    }
];

const AboutValues = () => {
    return (
        <Section>
            <Overlay />
            <Container>
                <Header>
                    <SectionTitle>Nuestros Valores</SectionTitle>
                    <SectionSubtitle>Los principios que guían nuestro trabajo día a día.</SectionSubtitle>
                </Header>
                <Grid>
                    {valuesData.map((item, index) => (
                        <Card
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <IconWrapper>
                                <i className={item.icon}></i>
                            </IconWrapper>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDesc>{item.desc}</CardDesc>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </Section>
    );
};

export default AboutValues;

const Section = styled.section`
    padding: 6rem 1rem;
    background-color: var(--brand-blue);
    position: relative;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(43, 46, 75, 0.9), rgba(43, 46, 75, 1));
    z-index: 1;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
    font-family: var(--headings-font);
    font-size: 2.5rem;
    color: white;
    margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
    font-family: var(--text-font);
    font-size: 1.1rem;
    color: #cbd5e1;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled(motion.div)`
    background: rgba(255, 255, 255, 0.05);
    padding: 2.5rem 1.5rem;
    border-radius: 8px;
    text-align: center;
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.1);
    }
`;

const IconWrapper = styled.div`
    font-size: 2.5rem;
    color: var(--brand-red);
    margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
    font-family: var(--headings-font);
    font-size: 1.2rem;
    color: white;
    margin-bottom: 1rem;
    letter-spacing: 1px;
`;

const CardDesc = styled.p`
    font-family: var(--text-font);
    font-size: 0.95rem;
    color: #cbd5e1;
    line-height: 1.6;
`;
