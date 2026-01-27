import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '../home/PropertyCard/PropertyCard';
import PropertyFilters from './PropertyFilters';
import { usePropertyFilter } from '../../hooks/usePropertyFilter';

const PropertyCatalog = ({ properties, loading, title, error, baseUrl }) => {
    const { filters, handleFilterChange, filteredProperties } = usePropertyFilter(properties || []);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [visibleCount, setVisibleCount] = useState(9);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 9);
    };

    if (loading) {
        return (
            <CatalogContainer>
                <div style={{ textAlign: 'center', padding: '4rem' }}>Cargando propiedades...</div>
            </CatalogContainer>
        );
    }

    if (error) {
        return (
            <CatalogContainer>
                <div style={{ textAlign: 'center', padding: '4rem', color: 'red' }}>Error cargando propiedades.</div>
            </CatalogContainer>
        );
    }

    return (
        <CatalogContainer>
            <Header>
                <Title>{title}</Title>
            </Header>

            <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />

            <Grid>
                <AnimatePresence>
                    {filteredProperties.length > 0 ? (
                        filteredProperties.slice(0, visibleCount).map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <PropertyCard
                                    image={property.imagen}
                                    name={property.nombre}
                                    price={property.precio}
                                    bedrooms={property.habitaciones}
                                    bathrooms={property.baños}
                                    location={property.ubicacion}
                                    m2={property.m2}
                                    link={baseUrl ? `${baseUrl}/${property.id}` : undefined}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: '#666' }}>
                            No se encontraron propiedades que coincidan con los filtros.
                        </div>
                    )}
                </AnimatePresence>
            </Grid>

            {filteredProperties.length > visibleCount && (
                <LoadMoreContainer>
                    <LoadMoreButton onClick={handleLoadMore}>
                        Ver más propiedades
                    </LoadMoreButton>
                </LoadMoreContainer>
            )}
        </CatalogContainer>
    );
};

export default PropertyCatalog;

const CatalogContainer = styled.div`
    max-width: 1450px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 80vh;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Header = styled.div`
    margin-bottom: 3rem;
    text-align: center;
    position: relative;
    padding-bottom: 1rem;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background-color: var(--brand-red);
    }
`;

const Title = styled.h1`
    font-family: var(--headings-font);
    font-size: 3rem;
    color: var(--text-dark);
    text-transform: uppercase;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const LoadMoreContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    margin-bottom: 2rem;
`;

const LoadMoreButton = styled.button`
    padding: 1rem 3rem;
    background-color: transparent;
    border: 2px solid var(--brand-blue);
    color: var(--brand-blue);
    font-family: var(--headings-font);
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
        background-color: var(--brand-blue);
        color: white;
    }
`;
