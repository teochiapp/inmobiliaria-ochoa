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

    // Custom PropertyCatalog that handles different property types
    const PropertiesWithDynamicUrl = ({ properties, loading, error, title }) => {
        // We need to render PropertyCards manually to handle dynamic baseUrl
        // But we can reuse most of PropertyCatalog structure
        return (
            <PropertyCatalog
                properties={properties}
                loading={loading}
                error={error}
                title={title}
                baseUrl="" // We'll handle this in the PropertyCard itself via the link prop
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
