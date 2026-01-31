import React from 'react';
import styled from 'styled-components';
import durazno from '../../../public/galeria/durazno.jpg';
import embalse from '../../../public/galeria/embalse.jpg';
import quillinzo from '../../../public/galeria/quillinzo.jpg';
import santaRosa from '../../../public/galeria/santa-rosa.jpg';
import villaRumipal from '../../../public/galeria/villa-rumipal.jpeg';
import villaDelDique from '../../../public/galeria/Villa-del-Dique.jpg';

const GallerySection = () => {
  const images = [
    durazno,
    embalse,
    quillinzo,
    santaRosa,
    villaRumipal,
    villaDelDique,
  ];

  return (
    <Container>
      <GalleryGrid>
        {images.map((src, index) => (
          <ImageWrapper key={index}>
            <img src={src} alt={`Galeria ${index + 1}`} />
          </ImageWrapper>
        ))}
      </GalleryGrid>
      <Overlay>
        <InstagramIcon className="fab fa-instagram"></InstagramIcon>
        <Title>SEGUINOS EN INSTAGRAM</Title>
        <Handle href="https://www.instagram.com/marinochoainmobiliaria" target="_blank" rel="noopener noreferrer">
          @inmobiliariaochoa
        </Handle>
      </Overlay>
    </Container>
  );
};

export default GallerySection;

const Container = styled.section`
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const GalleryGrid = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  
  /* Filter to darken images slightly so text is readable */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 2;
  text-align: center;
  color: white;
  pointer-events: none; /* Allow clicks through to handle if needed, or wrap handle differently */
`;

const InstagramIcon = styled.i`
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Title = styled.h2`
  font-family: var(--headings-font);
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: 4px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
`;

const Handle = styled.a`
  display: block;
  font-family: var(--text-font);
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  margin-top: 0.5rem;
  pointer-events: auto; /* Enable clicks for the link */
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
