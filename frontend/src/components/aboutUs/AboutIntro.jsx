import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMedal, FaHandshake, FaUserShield } from 'react-icons/fa';

const AboutIntro = () => {
    return (
        <Section>
            <Container>
                {/* Top Header Section */}
                <HeaderRow>
                    <HeaderLeft
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge>SOBRE NOSOTROS</Badge>
                        <MainHeading>
                            Somos <Highlight>Marin Ochoa</Highlight><br /> Inmobiliaria
                        </MainHeading>
                    </HeaderLeft>
                    <HeaderRight
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Description>
                            Desde hace más de 15 años, somos parte de la historia de numerosas familias y empresas. Nos dedicamos con pasión al mercado inmobiliario, especializándonos en conectar a las personas con sus espacios ideales.
                        </Description>
                        <Description>
                            Te ayudamos a navegar el proceso de compra, venta o alquiler con total seguridad y confianza. Nuestro compromiso es brindarte un asesoramiento integral para que encuentres el lugar donde tus sueños se hacen realidad.
                        </Description>
                    </HeaderRight>
                </HeaderRow>

                {/* Features Cards */}
                <CardsGrid>
                    <Card
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <IconBox>
                            <FaMedal />
                        </IconBox>
                        <CardTitle>Trayectoria Garantizada</CardTitle>
                        <CardText>Más de una década de experiencia brindando seguridad en cada operación.</CardText>
                    </Card>

                    <Card
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <IconBox>
                            <FaHandshake />
                        </IconBox>
                        <CardTitle>Asesoramiento Integral</CardTitle>
                        <CardText>Soporte completo y personalizado en compra, venta y gestión de propiedades.</CardText>
                    </Card>

                    <Card
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <IconBox>
                            <FaUserShield />
                        </IconBox>
                        <CardTitle>Equipo Profesional</CardTitle>
                        <CardText>Comprometidos con la transparencia, la integridad y su satisfacción total.</CardText>
                    </Card>
                </CardsGrid>

                {/* Image Section */}
                <ImageSection
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <StyledImage src="/src/public/aboutUs/equipo.png" alt="Equipo Marin Ochoa - Foto Grupal" />
                </ImageSection>

            </Container>
        </Section>
    );
};

export default AboutIntro;

const Section = styled.section`
    padding: 6rem 1rem;
    background: linear-gradient(
        to bottom,
        #ffffff 0%,
        #ffffff 90%,
        #faf0f1 100%
    );
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

/* Header Styles */
const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 4rem;
    margin-bottom: 5rem;
    align-items: flex-start;

    @media (max-width: 968px) {
        flex-direction: column;
        gap: 2rem;
    }
`;

const HeaderLeft = styled(motion.div)`
    flex: 1;
`;

const HeaderRight = styled(motion.div)`
    flex: 1;
    padding-top: 1rem;
`;

const Badge = styled.span`
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #ffe5e6;
    color: var(--brand-red);
    font-size: 0.85rem;
    font-weight: 700;
    border-radius: 50px;
    margin-bottom: 1.5rem;
    font-family: var(--text-font);
    letter-spacing: 1px;
    text-transform: uppercase;
`;

const MainHeading = styled.h2`
    font-family: var(--headings-font);
    font-size: 3rem;
    color: var(--brand-blue);
    line-height: 1.2;
    
    @media (max-width: 768px) {
        font-size: 2.25rem;
    }
`;

const Highlight = styled.span`
    color: var(--brand-red);
`;

const Description = styled.p`
    font-family: var(--text-font);
    font-size: 1.05rem;
    color: #64748b;
    line-height: 1.8;
    margin-bottom: 1.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

/* Cards Styles */
const CardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 6rem;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled(motion.div)`
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.28);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 50px -10px rgba(0,0,0,0.42);
    }
`;

const IconBox = styled.div`
    width: 60px;
    height: 60px;
    background-color: var(--brand-red);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);
`;

const CardTitle = styled.h3`
    font-family: var(--headings-font);
    font-size: 1.25rem;
    color: var(--brand-blue);
    margin-bottom: 1rem;
    font-weight: 700;
`;

const CardText = styled.p`
    font-family: var(--text-font);
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.6;
`;

/* Image Section Styles */
const ImageSection = styled(motion.div)`
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    background-color: #f1f5f9;
`;

const StyledImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    min-height: 400px;
    max-height: 700px; /* Limit height for very large screens */
`;
