import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const RentalsHero = () => {
  return (
    <HeroSection>
      <BackgroundImage src="/src/public/galeria/Villa-del-Diquearriba.jpeg" alt="Alquileres Background" />
      <Overlay />
      <Content>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>Alquileres</Title>
          <Subtitle>Encuentre su lugar ideal para vivir o vacacionar</Subtitle>
        </motion.div>
      </Content>
    </HeroSection>
  );
};

export default RentalsHero;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-family: var(--headings-font);
  font-size: 3.5rem;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-family: var(--text-font);
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
`;
