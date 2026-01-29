import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '../home/PropertyCard/PropertyCard';
import PropertyFilters from './PropertyFilters';
import { usePropertyFilter } from '../../hooks/usePropertyFilter';
import SplitText from './SplitText';

const PropertyCatalog = ({ properties, loading, title, error, baseUrl }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Sort properties by newest first
    const sortedProperties = useMemo(() => {
        return [...(properties || [])].sort((a, b) => {
            const dateA = new Date(a.createdAt || a.publishedAt || 0);
            const dateB = new Date(b.createdAt || b.publishedAt || 0);
            return dateB - dateA; // Descending (newest first)
        });
    }, [properties]);

    const { filters, handleFilterChange, filteredProperties } = usePropertyFilter(sortedProperties);

    // Pagination calculations
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProperties.length]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <MainContentWrapper>
                <FiltersColumn>
                    <PropertyFilters filters={filters} onFilterChange={handleFilterChange} layout="sidebar" />
                </FiltersColumn>

                <PropertiesColumn>
                    <Grid>
                        <AnimatePresence mode="wait">
                            {currentProperties.length > 0 ? (
                                currentProperties.map((property, index) => (
                                    <motion.div
                                        key={property.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: index * 0.05 }}
                                    >
                                        <PropertyCard
                                            image={property.imagen}
                                            name={property.nombre}
                                            price={property.precio}
                                            bedrooms={property.habitaciones}
                                            bathrooms={property.baños}
                                            location={property.ubicacion}
                                            m2={property.m2}
                                            link={property.baseUrl ? `${property.baseUrl}/${property.id}` : (baseUrl ? `${baseUrl}/${property.id}` : undefined)}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <EmptyState>
                                    No se encontraron propiedades que coincidan con los filtros.
                                </EmptyState>
                            )}
                        </AnimatePresence>
                    </Grid>

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </PropertiesColumn>
            </MainContentWrapper>
        </CatalogContainer>
    );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <PaginationContainer>
            <PaginationButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </PaginationButton>

            {getPageNumbers().map((page, index) => (
                page === '...' ? (
                    <PaginationEllipsis key={`ellipsis-${index}`}>...</PaginationEllipsis>
                ) : (
                    <PaginationNumber
                        key={page}
                        active={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </PaginationNumber>
                )
            ))}

            <PaginationButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </PaginationButton>
        </PaginationContainer>
    );
};

export default PropertyCatalog;

// Styled Components
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

    &.animated-title {
        font-family: var(--headings-font);
        font-size: 3rem;
        color: var(--text-dark);
        text-transform: uppercase;
        margin: 0;

        @media (max-width: 768px) {
            font-size: 2rem;
        }
    }
`;

const MainContentWrapper = styled.div`
    display: flex;
    gap: 2rem;
    align-items: flex-start;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const FiltersColumn = styled.div`
    flex-shrink: 0;
    width: 300px;
    position: sticky;
    top: 100px;

    @media (max-width: 768px) {
        display: none;
        width: 100%;
        position: static;
    }
`;

const PropertiesColumn = styled.div`
    flex: 1;
    min-width: 0;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const EmptyState = styled.div`
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem;
    color: #666;
    font-size: 1.1rem;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
`;

const PaginationButton = styled.button`
    padding: 0.75rem 1.25rem;
    background-color: white;
    border: 2px solid ${props => props.disabled ? '#ddd' : 'var(--brand-blue)'};
    color: ${props => props.disabled ? '#ddd' : 'var(--brand-blue)'};
    font-family: var(--headings-font);
    font-size: 1rem;
    font-weight: 600;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.3s ease;
    border-radius: 8px;
    min-width: 45px;

    &:hover:not(:disabled) {
        background-color: var(--brand-blue);
        color: white;
    }
`;

const PaginationNumber = styled.button`
    padding: 0.75rem 1.25rem;
    background-color: ${props => props.active ? 'var(--brand-blue)' : 'white'};
    border: 2px solid var(--brand-blue);
    color: ${props => props.active ? 'white' : 'var(--brand-blue)'};
    font-family: var(--headings-font);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    min-width: 45px;

    &:hover {
        background-color: var(--brand-blue);
        color: white;
    }
`;

const PaginationEllipsis = styled.span`
    padding: 0.75rem 0.5rem;
    color: var(--text-dark);
    font-weight: 600;
`;
