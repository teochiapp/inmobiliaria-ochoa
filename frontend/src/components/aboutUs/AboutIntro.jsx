import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutIntro = () => {
    return (
        <Section>
            <Container>
                <Grid>
                    <TextColumn>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <MainHeading>
                                Más que una inmobiliaria, <br />
                                <Highlight>somos sus aliados.</Highlight>
                            </MainHeading>
                            <Divider />
                            <Paragraph>
                                En Inmobiliaria Ochoa, entendemos que cada propiedad cuenta una historia y cada cliente tiene un sueño. Nos dedicamos a conectar personas con espacios excepcionales, ofreciendo un servicio personalizado que combina la calidez humana con la máxima eficiencia profesional.
                            </Paragraph>
                            <Paragraph>
                                Nuestra filosofía se basa en la transparencia, la integridad y una incansable búsqueda de la excelencia. No solo vendemos propiedades; gestionamos patrimonios y construimos futuros, asegurando que cada inversión sea sólida y cada hogar sea perfecto.
                            </Paragraph>
                        </motion.div>
                    </TextColumn>
                    <ImageColumn>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <StyledImage src="/src/public/hero/marin-ochoa.png" alt="Equipo Marin Ochoa" />
                        </motion.div>
                    </ImageColumn>
                </Grid>
            </Container>
        </Section>
    );
};

export default AboutIntro;

const Section = styled.section`
    padding: 6rem 1rem;
    background-color: white;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
`;

const TextColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainHeading = styled.h2`
    font-family: var(--headings-font);
    font-size: 2.5rem;
    color: var(--brand-blue);
    line-height: 1.2;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Highlight = styled.span`
    color: var(--brand-red);
    font-style: italic;
`;

const Divider = styled.div`
    width: 60px;
    height: 3px;
    background-color: var(--brand-red);
    margin-bottom: 2rem;
`;

const Paragraph = styled.p`
    font-family: var(--text-font);
    font-size: 1.05rem;
    color: #555;
    line-height: 1.8;
    margin-bottom: 1.5rem;
`;

const ImageColumn = styled.div`
    position: relative;
    display: flex;
    justify-content: center;

    &::before {
        content: '';
        position: absolute;
        top: -20px;
        right: -20px;
        width: 100%;
        height: 100%;
        border: 2px solid var(--brand-blue);
        z-index: 0;
        
        @media (max-width: 968px) {
            display: none;
        }
    }
`;

const StyledImage = styled.img`
    width: 100%;
    max-width: 500px;
    height: auto;
    object-fit: cover;
    position: relative;
    z-index: 1;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;
