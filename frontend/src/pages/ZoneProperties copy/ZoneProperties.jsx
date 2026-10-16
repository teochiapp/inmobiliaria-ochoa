import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useZoneProperties from '../../hooks/useZoneProperties';
import PropertyCatalog from '../../components/common/PropertyCatalog';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';

const ZoneProperties = () => {
    const { id } = useParams();
    const { properties, zone, loading, error } = useZoneProperties(id);


    const PropertiesWithDynamicUrl = ({ properties, loading, error, title }) => {

        return (
            <PropertyCatalog
                properties={properties}
                loading={loading}
                error={error}
                title={title}
                baseUrl=""
            />
        );
    };

    if (loading) {
        return (
            <PageWrapper>
                <Header isSolid={false} />
                <ContentWrapper>
                    <div style={{ textAlign: 'center', padding: '4rem' }}>Cargando propiedades...</div>
                </ContentWrapper>
                <Footer />
            </PageWrapper>
        );
    }

    if (error) {
        return (
            <PageWrapper>
                <Header isSolid={false} />
                <ContentWrapper>
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'red' }}>
                        Error cargando propiedades de la zona.
                    </div>
                </ContentWrapper>
                <Footer />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Header isSolid={false} />
            {zone && (
                <ZoneHero $bgImage={zone.imagen}>
                    <HeroOverlay />
                    <HeroContent>
                        <ZoneTitle>{zone.nombre}</ZoneTitle>
                        {zone.subtitulo && <ZoneSubtitle>{zone.subtitulo}</ZoneSubtitle>}
                        <PropertiesCount>
                            {properties.length} {properties.length === 1 ? 'Propiedad Disponible' : 'Propiedades Disponibles'}
                        </PropertiesCount>
                    </HeroContent>
                </ZoneHero>
            )}
            <ContentWrapper>
                <DescriptionContainer>
                    <DescriptionContent>
                        <DescriptionTitle>Vida y Naturaleza</DescriptionTitle>
                        <DescriptionParagraph>
                            Este emprendimiento de 10 años, ofrece lotes con vistas al lago y a las sierras.
                        </DescriptionParagraph>
                        <DescriptionParagraph>
                            Se ubica en Segunda Usina, una comuna hermanada con la localidad de Embalse en el valle de Calamuchita!
                        </DescriptionParagraph>
                        <DescriptionParagraph>
                            En el barrio ya se construyeron 25 viviendas, y residen permanentemente más de 12 familias. Esto es posible debido a que cuentan con servicio de:
                        </DescriptionParagraph>
                        <ServiceList>
                            <ServiceItem>Energía eléctrica con su tendido eléctrico aprobado por Ersep</ServiceItem>
                            <ServiceItem>Agua corriente: red de agua con normativas vigentes, tanque y bomba propia</ServiceItem>
                            <ServiceItem>Internet: una antena de última generación, que no solo brinda el servicio al barrio, sino también a toda la comuna...</ServiceItem>
                        </ServiceList>
                    </DescriptionContent>
                    <ImageContainer>
                        <img src="/images/segunda_usina_landscape.png" alt="Paisaje de Segunda Usina" />
                    </ImageContainer>
                </DescriptionContainer>
                <PropertiesWithDynamicUrl
                    properties={properties}
                    loading={loading}
                    error={error}
                    title={zone ? `Propiedades en ${zone.nombre}` : 'Propiedades'}
                />
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    );
};

export default ZoneProperties;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ZoneHero = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-image: url(${props => props.$bgImage});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;

    @media (max-width: 768px) {
        height: 300px;
        margin-top: 60px;
    }
`;

const HeroOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.6)
    );
`;

const HeroContent = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    padding: 2rem;
`;

const ZoneTitle = styled.h1`
    font-family: var(--headings-font);
    font-size: 3.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 2px;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const ZoneSubtitle = styled.p`
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    font-weight: 300;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

const PropertiesCount = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--brand-red);
    background: white;
    display: inline-block;
    padding: 0.5rem 1.5rem;
    border-radius: 30px;
    margin-top: 1rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const ContentWrapper = styled.div`
    flex: 1;
    padding-top: 50px;
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    padding: 2rem 10% 4rem 10%;
    max-width: 1600px;
    margin: 0 auto;
    
    @media (max-width: 1024px) {
        padding: 2rem 5% 4rem 5%;
        gap: 2rem;
    }

    @media (max-width: 968px) {
        flex-direction: column;
    }
`;

const DescriptionContent = styled.div`
    flex: 1;
    color: var(--text-dark);
`;

const DescriptionTitle = styled.h2`
    font-family: var(--headings-font);
    color: var(--brand-blue);
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const DescriptionParagraph = styled.p`
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
    line-height: 1.8;
    color: #4a4a4a;
    font-family: var(--text-font);
`;

const ServiceList = styled.ul`
    list-style: none;
    margin-top: 1.5rem;
    padding-left: 0;
`;

const ServiceItem = styled.li`
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 1.1rem;
    line-height: 1.5;
    
    &:before {
        content: '✦';
        color: var(--brand-red);
        font-size: 1.2rem;
    }
`;

const ImageContainer = styled.div`
    flex: 1;
    height: 450px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.7s ease;
    }
    
    &:hover img {
        transform: scale(1.05);
    }

    &:after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
        pointer-events: none;
    }

    @media (max-width: 768px) {
        height: 300px;
        width: 100%;
    }
`;
