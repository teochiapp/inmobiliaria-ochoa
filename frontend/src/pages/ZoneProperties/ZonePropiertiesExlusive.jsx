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

    // Image Gallery State
    const galleryImages = [
        "/FotoExclusiva.jpeg",
        "/fotomiradordellagoExclusiva.jpeg",
        "/foto-grupal.jpeg"
    ];
    const [mainImage, setMainImage] = React.useState(galleryImages[0]);

    const handleImageSwap = (newImage) => {
        setMainImage(newImage);
    };

    // Custom PropertyCatalog that handles different property types
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
                    <LoadingContainer>
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Cargando propiedades exclusivas...</p>
                    </LoadingContainer>
                </ContentWrapper>
                <Footer />
            </PageWrapper>
        );
    }

    if (error || !zone) {
        return (
            <PageWrapper>
                <Header isSolid={false} />
                <ContentWrapper>
                    <ErrorContainer>
                        <i className="fas fa-exclamation-circle"></i>
                        <p>No se encontraron propiedades en esta zona exclusiva.</p>
                    </ErrorContainer>
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

            <ExclusiveInfoSection>
                <Container>
                    <InfoGrid>
                        <GalleryWrapper>
                            <ThumbnailsColumn>
                                {galleryImages.map((img, index) => (
                                    <Thumbnail
                                        key={index}
                                        $active={mainImage === img}
                                        onClick={() => handleImageSwap(img)}
                                    >
                                        <img src={img} alt={`Thumbnail ${index}`} />
                                    </Thumbnail>
                                ))}
                            </ThumbnailsColumn>
                            <ImageSidebar>
                                <img src={mainImage} alt="Exclusiva Inmobiliaria Ochoa" />
                                <ImageOverlay />
                            </ImageSidebar>
                        </GalleryWrapper>

                        <TextContent>
                            <Badge>Emprendimiento Exclusivo</Badge>
                            <MainText>
                                Este emprendiendo de 10 años, ofrece lotes con vistas al lago y a las sierras.
                            </MainText>
                            <SubText>
                                Se ubica en Segunda Usina, una comuna hermanada con ma localidad de Embalse en el valle de Calamuchita!
                            </SubText>
                            <StatsText>
                                En el barrio ya se construyeron 25 viviendas, y residen permanentemente más de 12 familias. Esto es posible debido que cuentan con servicio de:
                            </StatsText>
                            <ServicesList>
                                <li>
                                    <Icon><i className="fas fa-bolt"></i></Icon>
                                    <span><strong>Energía eléctrica:</strong> con su tendido eléctrico aprobado por Ersep.</span>
                                </li>
                                <li>
                                    <Icon><i className="fas fa-tint"></i></Icon>
                                    <span><strong>Agua corriente:</strong> red de agua con normativas vigentes, tanque y bomba propia.</span>
                                </li>
                                <li>
                                    <Icon><i className="fas fa-wifi"></i></Icon>
                                    <span><strong>Internet:</strong> una antena de última generación, que no solo brinde el servicio al barrio, sino también a toda la comuna...</span>
                                </li>
                            </ServicesList>
                        </TextContent>
                    </InfoGrid>
                </Container>
            </ExclusiveInfoSection>

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

const ExclusiveInfoSection = styled.section`
    padding: 4rem 0;
    background-color: #f9f9f9;

    @media (max-width: 768px) {
        padding: 2rem 0;
    }
`;

const Container = styled.div`
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 480px) {
        padding: 0 1rem;
    }
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 5rem;
    align-items: center;
    background: white;
    padding: 4rem;
    border-radius: 24px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.06);

    @media (max-width: 1100px) {
        gap: 3rem;
    }

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        padding: 2.5rem;
    }

    @media (max-width: 480px) {
        padding: 1.5rem;
        gap: 2rem;
        border-radius: 16px;
    }
`;

const GalleryWrapper = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 1.5rem;
    height: 600px;

    @media (max-width: 1200px) {
        grid-template-columns: 100px 1fr;
    }

    @media (max-width: 968px) {
        height: 500px;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
        height: auto;
        gap: 1rem;
    }
`;

const ThumbnailsColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    padding-right: 5px;

    /* Scrollbar styling */
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 10px;
    }

    @media (max-width: 600px) {
        flex-direction: row;
        order: 2;
        overflow-x: auto;
        padding: 0.5rem 0;
        margin-top: 0.5rem;
    }
`;

const Thumbnail = styled.div`
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    border: 3px solid ${props => props.$active ? 'var(--brand-red)' : 'transparent'};
    transition: all 0.3s ease;
    opacity: ${props => props.$active ? '1' : '0.6'};

    &:hover {
        opacity: 1;
        transform: translateY(-2px);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 600px) {
        width: 80px;
        flex-shrink: 0;
    }
`;

const ImageSidebar = styled.div`
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    height: 100%;

    @media (max-width: 600px) {
        height: 250px;
        border-radius: 12px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
    }

    &:hover img {
        transform: scale(1.05);
    }
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%);
`;

const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Badge = styled.span`
    display: inline-block;
    background-color: var(--brand-red);
    color: white;
    padding: 0.5rem 1.2rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    width: fit-content;
`;

const MainText = styled.h2`
    font-family: var(--headings-font);
    font-size: 2.2rem;
    color: var(--brand-blue);
    line-height: 1.2;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }

    @media (max-width: 480px) {
        font-size: 1.5rem;
    }
`;

const SubText = styled.p`
    font-size: 1.2rem;
    color: #555;
    line-height: 1.6;
    font-weight: 500;

    @media (max-width: 480px) {
        font-size: 1.05rem;
    }
`;

const StatsText = styled.p`
    font-size: 1.1rem;
    color: #666;
    line-height: 1.5;

    @media (max-width: 480px) {
        font-size: 0.95rem;
    }
`;

const ServicesList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    @media (max-width: 480px) {
        gap: 1rem;
    }

    @media (max-width: 320px) {
        gap: 0.8rem;
    }

    li {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        font-size: 1rem;
        color: #444;
        line-height: 1.4;

        span {
            flex: 1;
        }
    }
`;

const Icon = styled.div`
    min-width: 40px;
    height: 40px;
    background-color: rgba(230, 0, 0, 0.1);
    color: var(--brand-red);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.1rem;

    @media (max-width: 480px) {
        min-width: 32px;
        height: 32px;
        font-size: 0.9rem;
    }
`;

const ContentWrapper = styled.div`
    flex: 1;
    padding-top: 20px;
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8rem 2rem;
    color: var(--brand-blue);
    gap: 1.5rem;

    i {
        font-size: 3rem;
        color: var(--brand-red);
    }

    p {
        font-size: 1.2rem;
        font-weight: 500;
    }
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8rem 2rem;
    color: #666;
    gap: 1.5rem;
    text-align: center;

    i {
        font-size: 3rem;
        color: #ddd;
    }

    p {
        font-size: 1.2rem;
        max-width: 400px;
    }
`;
