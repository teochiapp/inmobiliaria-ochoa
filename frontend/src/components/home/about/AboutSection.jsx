import React from 'react';
import styled from 'styled-components';

const AboutSection = () => {
  return (
    <Container>
      <ContentWrapper>
        <ImageWrapper>
          <img src="/src/public/hero/marin-ochoa.png" alt="Oficina Marin Ochoa" />
        </ImageWrapper>
        <TextCard>
          <Title>ESTIME Y VENDA SU PROPIEDAD CON MARIN OCHOA</Title>
          <Description>
            Vender con Marin Ochoa significa elegir un servicio global, personalizado y de alta gama.
            Desde la estimación hasta la firma del mandato de venta, hasta la formalización de la escritura:
            Marin Ochoa le acompaña en cada paso de la cesión de su propiedad.
          </Description>
          <ActionButton href="https://wa.me/5493512173089" target="_blank" rel="noopener noreferrer">
            SOLICITAR UNA ESTIMACIÓN
          </ActionButton>
        </TextCard>
      </ContentWrapper>
    </Container>

  );
};

export default AboutSection;

const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-start; /* Alinea el contenido a la izquierda */
  min-height: 600px;
  position: relative;
  
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;

  @media (max-width: 1400px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  width: 75%; /* Ocupa el 75% del ancho */
  margin-right: auto; /* Se pega a la izquierda */
  height: 800px; /* Altura fija o relativa */
  z-index: 1;

  img {
    width: 80%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 10px;
  }

  @media (max-width: 1400px) {
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: center;

    img {
      width: 100%;
      margin: 0;
      border-radius: 0;
    }
  }

  @media (max-width: 968px) {
    height: 400px;
  }
`;

const TextCard = styled.div`
  background-color: white;
  padding: 4rem;
  width: 40%;
  z-index: 2;
  box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.05);
  position: absolute;
  right: 5%; /* Separado del borde derecho */
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
  border: 1px solid var(--brand-blue);

  @media (max-width: 1400px) {
    position: relative;
    width: 90%;
    max-width: 1100px;
    margin: -100px auto 5rem;
    transform: none;
    right: auto;
    left: auto;
    top: auto;
    padding: 2.5rem;
  }

  @media (max-width: 968px) {
    margin: -4rem auto 2rem;
    padding: 2rem;
  }
`;

const Title = styled.h2`
  font-family: var(--headings-font);
  font-size: 2rem;
  color: var(--brand-blue);
  line-height: 1.2;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
`;

const Description = styled.p`
  font-family: var(--text-font);
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 3rem;
`;

const ActionButton = styled.a`
  display: inline-block;
  font-family: var(--text-font);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--brand-blue);
  text-decoration: none;
  border-bottom: 2px solid var(--brand-blue);
  padding-bottom: 5px;
  letter-spacing: 2px;
  transition: all 0.3s ease;

  &:hover {
    color: var(--brand-red);
    border-color: var(--brand-red);
    padding-right: 10px;
  }
`;
