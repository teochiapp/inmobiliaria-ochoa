import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Ruler, ArrowLeft, DollarSign } from 'lucide-react';
import api from '../../services/api';
import Header from '../../components/header/Header';
import Breadcrumb from '../../components/common/Breadcrumb';
import Footer from '../../components/footer/footer';

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337';

const PropertyDetail = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Determine endpoint based on type ('venta' or 'alquiler')
    const endpoint = type === 'venta' ? 'ventas' : 'alquileres';
    const displayType = type === 'venta' ? 'Venta' : 'Alquiler';

    const extractTextFromBlocks = (blocks) => {
        if (!blocks || !Array.isArray(blocks)) return '';
        return blocks.map(block => {
            if (block.type === 'paragraph' && block.children) {
                return block.children.map(child => child.text).join('');
            }
            // Handle other block types if needed, or just return text
            if (block.children && Array.isArray(block.children)) {
                return block.children.map(child => child.text).join('');
            }
            return '';
        }).join('\n\n');
    };

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                // Fetch by ID (SQL ID) using filters because Strapi v5 GET /:id expects documentId
                const response = await api.get(`/${endpoint}?filters[id][$eq]=${id}&populate=*`);
                const dataArray = response.data.data;

                if (!dataArray || dataArray.length === 0) {
                    throw new Error('Property not found');
                }

                const data = dataArray[0];
                const attributes = data.attributes || data;

                // Map data
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
                if (attributes.Galeria?.data) {
                    const galData = Array.isArray(attributes.Galeria.data) ? attributes.Galeria.data : [attributes.Galeria.data];
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

    if (loading) {
        return (
            <PageWrapper>
                <Header />
                <Breadcrumb />
                <LoadingContainer>Cargando detalles...</LoadingContainer>
                <Footer />
            </PageWrapper>
        );
    }

    if (error || !property) {
        return (
            <PageWrapper>
                <Header />
                <Breadcrumb />
                <ErrorContainer>
                    <h2>Propiedad no encontrada</h2>
                    <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
                </ErrorContainer>
                <Footer />
            </PageWrapper>
        );
    }

    // Breadcrumb customizado con el nombre de la propiedad
    const breadcrumbItems = [
        {
            label: displayType === 'Venta' ? 'Propiedades en Venta' : 'Propiedades en Alquiler',
            path: displayType === 'Venta' ? '/propiedades-venta' : '/alquileres',
            isLast: false
        },
        {
            label: property.name,
            path: `#`,
            isLast: true
        }
    ];

    return (
        <PageWrapper>
            <Header />
            <Breadcrumb customItems={breadcrumbItems} title={property.name} />
            <ContentContainer>
                <BackLink onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                    Volver al listado
                </BackLink>

                <MainSection>
                    <ImageGallery>
                        <MainImage src={property.image} alt={property.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                        {property.gallery && property.gallery.length > 0 && (
                            <Thumbnails>
                                {property.gallery.slice(0, 4).map((img, idx) => (
                                    <Thumbnail key={idx} src={img} alt={`Vista ${idx + 1}`} />
                                ))}
                            </Thumbnails>
                        )}
                    </ImageGallery>

                    <InfoSection>
                        <StatusBadge>{displayType}</StatusBadge>
                        <Title>{property.name}</Title>
                        <Location>
                            <MapPin size={18} />
                            {property.location}
                        </Location>

                        <Price>{property.price}</Price>

                        <FeaturesGrid>
                            <FeatureItem>
                                <Bed size={24} />
                                <span>{property.bedrooms} Hab</span>
                            </FeatureItem>
                            <FeatureItem>
                                <Bath size={24} />
                                <span>{property.bathrooms} Baños</span>
                            </FeatureItem>
                            <FeatureItem>
                                <Ruler size={24} />
                                <span>{property.m2} m²</span>
                            </FeatureItem>
                        </FeaturesGrid>

                        <Description>
                            <h3>Descripción</h3>
                            <p>{property.description || 'Descripción detallada disponible contactando al agente.'}</p>
                        </Description>

                        <ContactButton onClick={() => navigate('/contacto')}>
                            Contactar Agente
                        </ContactButton>
                    </InfoSection>
                </MainSection>
            </ContentContainer>
            <Footer />
        </PageWrapper>
    );
};

export default PropertyDetail;

// Styles
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 120px 2rem 4rem 2rem;
    width: 100%;
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

const BackLink = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--text-light-gray);
    margin-bottom: 2rem;
    transition: color 0.3s;

    &:hover {
        color: var(--brand-blue);
    }
`;

const BackButton = styled.button`
    padding: 0.8rem 2rem;
    background-color: var(--brand-blue);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const MainSection = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
    }
`;

const ImageGallery = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const MainImage = styled(motion.img)`
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);

    @media (max-width: 768px) {
        height: 350px;
    }
`;

const Thumbnails = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.8;
    }
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const StatusBadge = styled.span`
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: var(--brand-red);
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    border-radius: 50px;
    width: fit-content;
    margin-bottom: 1rem;
    text-transform: uppercase;
`;

const Title = styled.h1`
    font-family: var(--headings-font);
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
    color: var(--text-dark);
    line-height: 1.2;
`;

const Location = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    margin-bottom: 2rem;
    font-size: 1.1rem;
`;

const Price = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: var(--brand-blue);
    margin-bottom: 2rem;
    font-family: var(--headings-font);
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 2rem 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-bottom: 2rem;
`;

const FeatureItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-dark);
    
    span {
        font-weight: 500;
    }
`;

const Description = styled.div`
    margin-bottom: 2rem;
    
    h3 {
        font-family: var(--headings-font);
        margin-bottom: 1rem;
        color: var(--text-dark);
    }

    p {
        line-height: 1.6;
        color: #555;
    }
`;

const ContactButton = styled.button`
    padding: 1rem 2rem;
    background-color: var(--brand-blue);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: var(--headings-font);
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
        background-color: #1a1d3a;
    }
`;
