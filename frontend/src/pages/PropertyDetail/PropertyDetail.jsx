import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Ruler, ArrowLeft, Phone, Home as HomeIcon, Car, Check, Map as MapIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../../services/api';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';
import ContactForm from '../../components/contact/ContactForm';

// Remove /api from the end to get base URL for images
const STRAPI_BASE_URL = (() => {
    const apiUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';
    return apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
})();

import salesHeroImage from '../../public/galeria/yacantoarriba.jpg';
import rentalsHeroImage from '../../public/galeria/Villa-del-Diquearriba.jpeg';

const PropertyDetail = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeThumb, setActiveThumb] = useState(0);

    const endpoint = type === 'venta' ? 'ventas' : 'alquileres';
    const displayType = type === 'venta' ? 'Venta' : 'Alquiler';

    // Determine background image based on type
    // User requested consistency with Rents/Sales sections
    const backgroundImage = type === 'venta' ? salesHeroImage : rentalsHeroImage;

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
        const fetchProperty = async () => {
            try {
                const response = await api.get(`/${endpoint}?filters[id][$eq]=${id}&populate=*`);
                const dataArray = response.data.data;

                if (!dataArray || dataArray.length === 0) {
                    throw new Error('Property not found');
                }

                const data = dataArray[0];
                const attributes = data.attributes || data;

                const imgField = attributes.Portada;
                let imgUrl = '';
                if (imgField?.data) {
                    const imgData = imgField.data;
                    const imgObj = Array.isArray(imgData) ? imgData[0] : imgData;
                    imgUrl = imgObj?.attributes?.url || imgObj?.url;
                } else if (imgField?.url) {
                    imgUrl = imgField.url;
                }
                const fullImgUrl = imgUrl ? `${STRAPI_BASE_URL}${imgUrl}` : '';

                const gallery = [];
                if (attributes.Galeria) {
                    // Manejar si Galeria viene con .data o directamente como array
                    let galData = attributes.Galeria.data || attributes.Galeria;
                    galData = Array.isArray(galData) ? galData : [galData];

                    galData.forEach(img => {
                        const u = img.attributes?.url || img.url;
                        if (u) gallery.push(`${STRAPI_BASE_URL}${u}`);
                    });
                }

                let description = '';
                if (attributes.Descripcion) {
                    if (Array.isArray(attributes.Descripcion)) {
                        description = extractTextFromBlocks(attributes.Descripcion);
                    } else if (typeof attributes.Descripcion === 'string') {
                        description = attributes.Descripcion;
                    }
                }

                setProperty({
                    id: data.id,
                    name: attributes.Nombre || attributes.Titulo || 'Propiedad sin nombre',
                    price: attributes.Precio,
                    description: description,
                    bedrooms: attributes.Habitaciones,
                    bathrooms: attributes.Banos,
                    m2: attributes.MetrosCuadrados,
                    location: attributes.Ubicacion,
                    image: fullImgUrl,
                    gallery: gallery,
                    features: attributes.Caracteristicas,
                    adicionales: attributes.Adicionales ? attributes.Adicionales.map(item => item.Texto).filter(Boolean) : [],
                    mapEmbed: Array.isArray(attributes.Mapa) ? extractTextFromBlocks(attributes.Mapa) : attributes.Mapa,
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching property:", err);
                setError(err);
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id, endpoint]);

    const imagenesGaleria = useMemo(() => {
        const imagenes = [];

        if (property?.image) {
            imagenes.push({
                url: property.image,
                alt: property.name,
                isPortada: true
            });
        }

        if (property?.gallery && Array.isArray(property.gallery)) {
            property.gallery.forEach((imgUrl, index) => {
                imagenes.push({
                    url: imgUrl,
                    alt: `${property.name} - Vista ${index + 2}`
                });
            });
        }

        return imagenes.length > 0 ? imagenes : [{ url: property?.image || '/placeholder.jpg', alt: property?.name || 'Propiedad' }];
    }, [property]);

    const imagenActual = useMemo(() => {
        if (imagenesGaleria && imagenesGaleria[activeThumb]) {
            return imagenesGaleria[activeThumb].url;
        }
        return property?.image;
    }, [imagenesGaleria, activeThumb, property]);

    const scrollThumbnails = (direction) => {
        const maxIndex = imagenesGaleria.length - 1;
        if (direction === 'up' && activeThumb > 0) {
            setActiveThumb(activeThumb - 1);
        } else if (direction === 'down' && activeThumb < maxIndex) {
            setActiveThumb(activeThumb + 1);
        }
    };

    if (loading) {
        return (
            <PageWrapper>
                <Header isSolid={false} />
                <HeroSection>
                    <BackgroundImage src={backgroundImage} alt="Background" />
                    <Overlay />
                    <Content>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <HeroTitle>Cargando...</HeroTitle>
                        </motion.div>
                    </Content>
                </HeroSection>
                <LoadingContainer>Cargando detalles...</LoadingContainer>
                <Footer />
            </PageWrapper>
        );
    }

    if (error || !property) {
        return (
            <PageWrapper>
                <Header isSolid={false} />
                <HeroSection>
                    <BackgroundImage src={backgroundImage} alt="Background" />
                    <Overlay />
                    <Content>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <HeroTitle>Error</HeroTitle>
                        </motion.div>
                    </Content>
                </HeroSection>
                <ErrorContainer>
                    <h2>Propiedad no encontrada</h2>
                    <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
                </ErrorContainer>
                <Footer />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Header isSolid={false} />
            <HeroSection>
                <BackgroundImage src={backgroundImage} alt={property.name} />
                <Overlay />
                <Content>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <HeroTitle>{property.name}</HeroTitle>
                        <HeroSubtitle>{property.location || displayType}</HeroSubtitle>
                    </motion.div>
                </Content>
            </HeroSection>

            <ContentContainer>
                <BackLink onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                    Volver al listado
                </BackLink>

                <ProductDetails>
                    <GalleryContainer>
                        <ThumbnailsWrapper>
                            <Thumbnails>
                                {imagenesGaleria.map((imagen, index) => (
                                    <Thumbnail
                                        key={index}
                                        src={imagen.url}
                                        alt={imagen.alt}
                                        $active={activeThumb === index}
                                        onClick={() => setActiveThumb(index)}
                                    />
                                ))}
                            </Thumbnails>

                            {imagenesGaleria.length > 1 && (
                                <ArrowsContainer>
                                    <ArrowButton onClick={() => scrollThumbnails('up')} disabled={activeThumb === 0}>
                                        <ArrowIcon>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                                <path d="M11 7L6 2L1 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </ArrowIcon>
                                    </ArrowButton>

                                    <ArrowButton $isDown onClick={() => scrollThumbnails('down')} disabled={activeThumb === imagenesGaleria.length - 1}>
                                        <ArrowIcon>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </ArrowIcon>
                                    </ArrowButton>
                                </ArrowsContainer>
                            )}
                        </ThumbnailsWrapper>

                        <MainImageContainer>
                            <PropertyImage src={imagenActual} alt={imagenesGaleria[activeThumb]?.alt || property.name} />
                        </MainImageContainer>
                    </GalleryContainer>

                    <PropertyInfo>
                        <StatusBadge $type={type}>{displayType}</StatusBadge>

                        <PropertyTitle>{property.name}</PropertyTitle>

                        <Location>
                            <MapPin size={18} />
                            {property.location}
                        </Location>

                        <PropertyPrice>
                            ${property.price ? Math.round(Number(property.price)).toLocaleString() : '0'}
                            {type === 'alquiler' && <small>/mes</small>}
                        </PropertyPrice>

                        <MainFeatures>
                            <FeatureCard>
                                <FeatureIcon><Bed size={24} /></FeatureIcon>
                                <FeatureValue>{property.bedrooms || 0}</FeatureValue>
                                <FeatureLabel>Habitaciones</FeatureLabel>
                            </FeatureCard>
                            <FeatureCard>
                                <FeatureIcon><Bath size={24} /></FeatureIcon>
                                <FeatureValue>{property.bathrooms || 0}</FeatureValue>
                                <FeatureLabel>Baños</FeatureLabel>
                            </FeatureCard>
                            <FeatureCard>
                                <FeatureIcon><Ruler size={24} /></FeatureIcon>
                                <FeatureValue>{property.m2 || 0}</FeatureValue>
                                <FeatureLabel>m²</FeatureLabel>
                            </FeatureCard>
                        </MainFeatures>

                        <ContactButtons>
                            <ContactButton $primary as="a" href="https://wa.me/+5493571520528" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp size={20} />
                                Contactar
                            </ContactButton>
                            <ContactButton as="a" href="tel:+5493571520528">
                                <Phone size={20} />
                                Llamar
                            </ContactButton>
                        </ContactButtons>

                        <AdditionalFeatures>
                            {property.adicionales && property.adicionales.length > 0 && property.adicionales.map((item, index) => (
                                <AdditionalFeatureItem key={index}>
                                    <Check size={20} />
                                    <span>{item}</span>
                                </AdditionalFeatureItem>
                            ))}
                        </AdditionalFeatures>
                    </PropertyInfo>
                </ProductDetails>

                <DescriptionSection>
                    <h2>Descripción</h2>
                    <p>{property.description || 'Descripción no disponible.'}</p>
                </DescriptionSection>

                {property.mapEmbed && (
                    <MapSection>
                        <h2>Ubicación</h2>
                        <MapContainer dangerouslySetInnerHTML={{ __html: property.mapEmbed }} />
                    </MapSection>
                )}

                <FormWrapper>
                    <ContactForm noBackground={true} />
                </FormWrapper>
            </ContentContainer>

            <Footer />
        </PageWrapper >
    );
};

export default PropertyDetail;

// ==================== STYLES ====================

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #F9F5F0;
`;

const FormWrapper = styled.div`
    margin-top: 4rem;
    width: 100%;
    
    @media (max-width: 768px) {
        margin-top: 2.5rem;
    }
`;

const ContentContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
    width: 100%;

    @media (max-width: 968px) {
        padding: 0 1.5rem 1.5rem;
    }

    @media (max-width: 480px) {
        padding: 0 1rem 1rem;
    }
`;

const BackLink = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: var(--body-font);
    color: var(--text-light-gray);
    margin-bottom: 1.5rem;
    padding-top: 10px;
    transition: color 0.3s ease;

    &:hover {
        color: var(--brand-blue);
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    font-size: 1.5rem;
    color: var(--brand-blue);
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    gap: 1rem;
    color: var(--brand-red);
`;

const BackButton = styled.button`
    padding: 0.8rem 2rem;
    background-color: var(--brand-blue);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: var(--body-font);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(43, 46, 75, 0.3);
    }
`;

const ProductDetails = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 4rem;
    align-items: start;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    @media (max-width: 480px) {
        gap: 2rem;
    }
`;

const GalleryContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    position: sticky;
    top: 100px;

    @media (max-width: 968px) {
        position: relative;
        top: 0;
    }
`;

const ThumbnailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const ArrowsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
`;

const ArrowIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
        display: block;
    }
`;

const ArrowButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1.5px solid ${props => props.$isDown ? 'var(--brand-blue)' : '#E5E7EB'};
    background: ${props => props.$isDown ? 'var(--brand-blue)' : 'white'};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    
    ${ArrowIcon} svg path {
        stroke: ${props => props.$isDown ? 'white' : 'var(--brand-blue)'};
    }
    
    &:hover:not(:disabled) {
        border-color: var(--brand-red);
        background: ${props => props.$isDown ? 'var(--brand-red)' : '#FFF5F9'};
        transform: scale(1.05);
    }
    
    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
    
    @media (max-width: 480px) {
        width: 32px;
        height: 32px;
    }
`;

const Thumbnails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 600px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 4px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: var(--brand-blue);
        border-radius: 10px;
    }
    
    @media (max-width: 480px) {
        gap: 0.5rem;
    }
`;

const Thumbnail = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
    border: 3px solid ${props => props.$active ? 'var(--brand-red)' : 'transparent'};
    transition: border-color 0.3s ease;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        border-color: ${props => props.$active ? 'var(--brand-red)' : 'var(--brand-blue)'};
    }

    @media (max-width: 768px) {
        width: 70px;
        height: 70px;
    }
    
    @media (max-width: 480px) {
        width: 60px;
        height: 60px;
        border-radius: 8px;
    }
`;

const MainImageContainer = styled.div`
    flex: 1;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
`;

const PropertyImage = styled.img`
    width: 100%;
    height: 600px;
    object-fit: cover;
    display: block;
    
    @media (max-width: 968px) {
        height: 450px;
    }

    @media (max-width: 768px) {
        height: 380px;
    }
    
    @media (max-width: 480px) {
        height: 300px;
    }
`;

const PropertyInfo = styled.div`
    padding: 0;
    display: flex;
    flex-direction: column;
`;

const StatusBadge = styled.span`
    display: inline-block;
    padding: 0.5rem 1.25rem;
    background-color: ${props => props.$type === 'venta' ? 'var(--brand-blue)' : 'var(--brand-red)'};
    color: white;
    font-weight: 600;
    font-size: 0.85rem;
    border-radius: 50px;
    width: fit-content;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-family: var(--headings-font);
    letter-spacing: 0.5px;
`;

const PropertyTitle = styled.h1`
    font-family: var(--headings-font);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    color: var(--text-dark);
    margin: 0 0 1rem 0;
    line-height: 1.2;
`;

const Location = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    font-family: var(--body-font);
    
    svg {
        flex-shrink: 0;
        color: var(--brand-red);
    }
`;

const PropertyPrice = styled.div`
    font-family: var(--headings-font);
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 700;
    color: var(--brand-blue);
    margin: 0 0 2rem 0;
    text-transform: uppercase;
    
    small {
        font-size: 1rem;
        color: #666;
        font-weight: 500;
    }
`;

const MainFeatures = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
    
    @media (max-width: 480px) {
        gap: 0.75rem;
    }
`;

const FeatureCard = styled.div`
    background: white;
    border-radius: 12px;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
`;

const FeatureIcon = styled.div`
    color: var(--brand-red);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FeatureValue = styled.div`
    font-family: var(--headings-font);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-dark);
    text-transform: uppercase;
`;

const FeatureLabel = styled.div`
    font-family: var(--body-font);
    font-size: 0.85rem;
    color: #666;
    text-align: center;
`;

const DescriptionSection = styled.div`
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    margin-top: 3rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    
    h2 {
        font-family: var(--headings-font);
        font-size: 1.75rem;
        margin: 0 0 1.5rem 0;
        color: var(--text-dark);
    }

    p {
        font-family: var(--body-font);
        line-height: 1.8;
        color: #555;
        white-space: pre-wrap;
        font-size: 1rem;
        margin: 0;
    }

    @media (max-width: 768px) {
        padding: 2rem 1.5rem;
        margin-top: 2rem;

        h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        p {
            font-size: 0.95rem;
        }
    }

    @media (max-width: 480px) {
        padding: 1.5rem 1.25rem;
        border-radius: 12px;

        h2 {
            font-size: 1.35rem;
        }
    }
`;

const MapSection = styled.div`
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    margin-top: 3rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    
    h2 {
        font-family: var(--headings-font);
        font-size: 1.75rem;
        margin: 0 0 1.5rem 0;
        color: var(--text-dark);
    }

    @media (max-width: 768px) {
        padding: 2rem 1.5rem;
        margin-top: 2rem;

        h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
    }

    @media (max-width: 480px) {
        padding: 1.5rem 1.25rem;
        border-radius: 12px;

        h2 {
            font-size: 1.35rem;
        }
    }
`;

const MapContainer = styled.div`
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    
    iframe {
        width: 100%;
        height: 450px;
        border: 0;
        display: block;
    }

    @media (max-width: 768px) {
        iframe {
            height: 350px;
        }
    }
`;

const ContactButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const ContactButton = styled.button`
    padding: 1rem 1.5rem;
    background: ${props => props.$primary ? 'var(--brand-blue)' : 'white'};
    color: ${props => props.$primary ? 'white' : 'var(--brand-blue)'};
    border: 2px solid var(--brand-blue);
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    font-family: var(--headings-font);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(43, 46, 75, 0.3);
        background: ${props => props.$primary ? '#1a1d3a' : 'var(--brand-blue)'};
        color: white;
    }
`;

const AdditionalFeatures = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 2rem 0 0;
    border-top: 1px solid #E5E7EB;
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const AdditionalFeatureItem = styled.div`
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
  padding: 0 2rem;
  margin-top: 2rem;
`;

const HeroTitle = styled.h1`
  font-family: var(--headings-font);
  font-size: 3.5rem;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-family: var(--text-font);
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
`;
