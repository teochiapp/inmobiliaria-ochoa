import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Check } from 'lucide-react';
import api from '../../services/api';
import PropertyCatalog from '../../components/common/PropertyCatalog';
import PropertyFilters from '../../components/common/PropertyFilters';
import { usePropertyFilter } from '../../hooks/usePropertyFilter';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import useSales from '../../hooks/useSales';
import useRents from '../../hooks/useRents';

// Remove /api from the end to get base URL for images
const STRAPI_BASE_URL = (() => {
    const apiUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';
    return apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
})();

const ZonePropertiesExclusive = () => {
    const { id } = useParams();

    // Use hooks for properties to ensure consistent image processing
    const { sales, loading: salesLoading } = useSales();
    const { rents, loading: rentsLoading } = useRents();

    const [zone, setZone] = useState(null);
    const [loadingZone, setLoadingZone] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');

    // Helper function to extract text from blocks
    const extractTextFromBlocks = (blocks) => {
        if (!blocks || !Array.isArray(blocks)) return '';
        return blocks.map(block => {
            if (block.type === 'paragraph' && block.children) {
                return block.children.map(child => child.text).join('');
            }
            if (block.children && Array.isArray(block.children)) {
                return block.children.map(child => child.text).join('');
            }
            return '';
        }).join('\n\n');
    };

    useEffect(() => {
        const fetchZoneData = async () => {
            try {
                console.log('Fetching zone with ID/Slug:', id);

                let zoneResponse;
                let zoneData;

                // Try to fetch by slug first
                try {
                    zoneResponse = await api.get(`/zonas?filters[Slug][$eq]=${id}&populate=*`);
                    const dataArray = zoneResponse.data.data;

                    if (dataArray && dataArray.length > 0) {
                        zoneData = dataArray[0];
                        console.log('Zone found by slug');
                    }
                } catch (slugError) {
                    console.log('Slug search failed, trying documentId/id');
                }

                // If not found by slug, try by documentId/id
                if (!zoneData) {
                    try {
                        zoneResponse = await api.get(`/zonas/${id}?populate=*`);
                        zoneData = zoneResponse.data.data;
                        console.log('Zone found by documentId');
                    } catch (idError) {
                        console.error('Failed to find zone by slug or id');
                        throw new Error('Zone not found');
                    }
                }

                console.log('Zone data:', zoneData);

                // Validate zone data exists
                if (!zoneData) {
                    console.error('No zone data found in response');
                    throw new Error('Zone data not found');
                }

                const attributes = zoneData.attributes || zoneData;
                console.log('Zone attributes:', attributes);

                // Validate attributes exist
                if (!attributes) {
                    console.error('No attributes found in zone data');
                    throw new Error('Zone attributes not found');
                }

                // Map Portada (cover image)
                const portadaField = attributes.Portada;
                let portadaUrl = '';
                if (portadaField?.data) {
                    const imgData = portadaField.data;
                    const imgObj = Array.isArray(imgData) ? imgData[0] : imgData;
                    portadaUrl = imgObj?.attributes?.url || imgObj?.url;
                } else if (portadaField?.url) {
                    portadaUrl = portadaField.url;
                }
                const fullPortadaUrl = portadaUrl ? `${STRAPI_BASE_URL}${portadaUrl}` : '';

                // Map ImagenCabecera (header image for hero)
                const cabeceraField = attributes.ImagenCabecera;
                let cabeceraUrl = '';
                if (cabeceraField?.data) {
                    const imgData = cabeceraField.data;
                    const imgObj = Array.isArray(imgData) ? imgData[0] : imgData;
                    cabeceraUrl = imgObj?.attributes?.url || imgObj?.url;
                } else if (cabeceraField?.url) {
                    cabeceraUrl = cabeceraField.url;
                }
                const fullCabeceraUrl = cabeceraUrl ? `${STRAPI_BASE_URL}${cabeceraUrl}` : fullPortadaUrl;

                // Map Galeria (gallery images)
                const gallery = [];
                if (attributes.Galeria) {
                    let galData = attributes.Galeria.data || attributes.Galeria;
                    galData = Array.isArray(galData) ? galData : [galData];

                    galData.forEach(img => {
                        if (img) {
                            const u = img.attributes?.url || img.url;
                            if (u) gallery.push(`${STRAPI_BASE_URL}${u}`);
                        }
                    });
                }

                // Extract description
                let descripcion = '';
                if (attributes.Descripcion) {
                    if (Array.isArray(attributes.Descripcion)) {
                        descripcion = extractTextFromBlocks(attributes.Descripcion);
                    } else if (typeof attributes.Descripcion === 'string') {
                        descripcion = attributes.Descripcion;
                    }
                }

                // Map AdicionalesZona
                const adicionales = attributes.AdicionalesZona || [];

                setZone({
                    id: zoneData.id,
                    nombre: attributes.Nombre || 'Zona Exclusiva',
                    titulo: attributes.Titulo || attributes.Nombre,
                    subtitulo: attributes.Subtitulo || '',
                    descripcion: descripcion,
                    portada: fullPortadaUrl,
                    imagenCabecera: fullCabeceraUrl,
                    galeria: gallery,
                    adicionales: adicionales
                });

                // Set initial main image
                if (fullPortadaUrl) {
                    setMainImage(fullPortadaUrl);
                } else if (gallery.length > 0) {
                    setMainImage(gallery[0]);
                }





                setLoadingZone(false);
            } catch (err) {
                console.error("Error fetching zone data:", err);
                setError(err);
                setLoadingZone(false);
            }
        };

        if (id) {
            fetchZoneData();
        }
    }, [id]);

    // Filter properties based on current zone
    const properties = useMemo(() => {
        if (!zone) return [];

        const zoneId = zone.id;

        // Filter and add baseUrl
        const filteredSales = sales.filter(item => item.zona === zoneId).map(item => ({
            ...item,
            baseUrl: '/propiedad/venta'
        }));

        const filteredRents = rents.filter(item => item.zona === zoneId).map(item => ({
            ...item,
            baseUrl: '/propiedad/alquiler'
        }));

        return [...filteredSales, ...filteredRents];
    }, [zone, sales, rents]);

    // Sort properties by newest first
    const sortedProperties = useMemo(() => {
        return [...(properties || [])].sort((a, b) => {
            const dateA = new Date(a.createdAt || a.publishedAt || 0);
            const dateB = new Date(b.createdAt || b.publishedAt || 0);
            return dateB - dateA;
        });
    }, [properties]);

    const { filters, handleFilterChange, filteredProperties } = usePropertyFilter(sortedProperties);

    const loading = loadingZone || salesLoading || rentsLoading;

    // Gallery images combining portada and galeria
    const galleryImages = useMemo(() => {
        const images = [];

        if (zone?.portada) {
            images.push(zone.portada);
        }

        if (zone?.galeria && Array.isArray(zone.galeria)) {
            images.push(...zone.galeria);
        }

        return images.length > 0 ? images : [];
    }, [zone]);

    const handleImageSwap = (newImage) => {
        setMainImage(newImage);
    };

    if (loading) {
        return (
            <PageWrapper>
                <Header isSolid={false} />
                <ContentWrapper>
                    <LoadingContainer>
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Cargando zona exclusiva...</p>
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
                        <p>No se encontró la zona exclusiva.</p>
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
                <ZoneHero $bgImage={zone.imagenCabecera}>
                    <HeroOverlay />
                    <HeroContent>
                        <ZoneTitle>{zone.nombre}</ZoneTitle>
                        {zone.subtitulo && <ZoneSubtitle>{zone.subtitulo}</ZoneSubtitle>}
                        {properties.length > 0 && (
                            <PropertiesCount>
                                {properties.length} {properties.length === 1 ? 'Propiedad Disponible' : 'Propiedades Disponibles'}
                            </PropertiesCount>
                        )}
                    </HeroContent>
                </ZoneHero>
            )}

            <ExclusiveInfoSection>
                <Container>
                    <InfoGrid>
                        <GalleryWrapper>
                            {galleryImages.length > 0 && (
                                <>
                                    <ThumbnailsColumn>
                                        {galleryImages.map((img, index) => (
                                            <Thumbnail
                                                key={index}
                                                $active={mainImage === img}
                                                onClick={() => handleImageSwap(img)}
                                            >
                                                <img src={img} alt={`${zone.nombre} ${index + 1}`} />
                                            </Thumbnail>
                                        ))}
                                    </ThumbnailsColumn>
                                    <ImageSidebar>
                                        <img src={mainImage} alt={zone.nombre} />
                                        <ImageOverlay />
                                    </ImageSidebar>
                                </>
                            )}
                        </GalleryWrapper>

                        <TextContent>
                            <Badge>Emprendimiento Exclusivo</Badge>
                            {zone.titulo && (
                                <MainText>
                                    {zone.titulo}
                                </MainText>
                            )}
                            {zone.subtitulo && (
                                <SubText>
                                    {zone.subtitulo}
                                </SubText>
                            )}
                            {zone.descripcion && (
                                <StatsText>
                                    {zone.descripcion}
                                </StatsText>
                            )}
                            {zone.adicionales && zone.adicionales.length > 0 && (
                                <ServicesList>
                                    {zone.adicionales.map((item, index) => (
                                        <ServicesItem key={index}>
                                            <Check size={20} />
                                            <span>{item.Texto}</span>
                                        </ServicesItem>
                                    ))}
                                </ServicesList>
                            )}
                        </TextContent>
                    </InfoGrid>
                </Container>
            </ExclusiveInfoSection>

            <ContentWrapper>
                <PropertyFilters filters={filters} onFilterChange={handleFilterChange} layout="horizontal" />
                <PropertyCatalog
                    properties={filteredProperties}
                    loading={loading}
                    error={error}
                    title={zone ? `Propiedades en ${zone.nombre}` : 'Propiedades'}
                    baseUrl=""
                />
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    );
};

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


const ServicesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    @media (max-width: 480px) {
        gap: 1rem;
    }
`;

const ServicesItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: var(--body-font);
    color: var(--text-dark);
    font-size: 0.95rem;
    
    svg {
        color: var(--brand-red);
        flex-shrink: 0;
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

export default ZonePropertiesExclusive;
