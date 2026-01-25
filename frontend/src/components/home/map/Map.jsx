import React from 'react';
import styled from 'styled-components';

const Map = () => {
    return (
        <MapContainer id="map-section">
            <IframeWrapper>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5843.993783169303!2d-64.40430840384465!3d-32.20592788378944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d29e93ce50c2cf%3A0x1faf6496b36a528e!2sMarin%20Ochoa%20Bienes%20Raices!5e0!3m2!1ses!2sar!4v1769377765405!5m2!1ses!2sar"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Inmobiliaria Ochoa"
                ></iframe>
            </IframeWrapper>
        </MapContainer>
    );
};

export default Map;

const MapContainer = styled.section`
  width: 100%;Q
  background-color: var(--text-light);
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-family: var(--headings-font);
    font-size: 2.5rem;
    color: var(--brand-blue);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .underline {
    width: 80px;
    height: 4px;
    background-color: var(--brand-red);
    margin: 0 auto;
  }
`;

const IframeWrapper = styled.div`
  width: 100%;
  height: 450px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: #e5e3df; /* Map placeholder color */

  iframe {
    position: absolute;
    top: -150px; /* Oculta la tarjeta informativa superior */
    left: 0;
    width: 100%;
    height: 650px; /* Aumentamos el alto para compensar el recorte */
    border: 0;
    filter: grayscale(0.2) contrast(1.1);
    transition: filter 0.3s ease;

    &:hover {
      filter: grayscale(0);
    }
  }

  /* Capa para ocultar los términos y logo de Google en la esquina inferior */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 50px;
    background-color: #f7f3f2; /* Color de fondo del sitio para tapar el logo */
    z-index: 5;
    pointer-events: none;
  }
`;
